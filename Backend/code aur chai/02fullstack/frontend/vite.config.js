import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'http://localhost:3000',   //jab bhi /api pe koi req aaye toh ye localhost append hojaye 3000 bcz server wahi chal rha hai and use lagega ye origin ye 3000 se hi hua hai
    }
  },
  plugins: [react()],
})



// Jab tumhara frontend (Vite) run hota hai on 👉 http://localhost:5173 aur backend (Express, Node.js) run hota hai on 👉 http://localhost:3000 ,Toh dono different origins hain. Agar frontend se backend pe request bhejoge:toh browser CORS error dega ❌
// (because 5173 → 3000 = cross-origin request)

// Solution — Proxy  ,Vite ka proxy feature kehata hai:“Agar request /api se start ho, toh usko internally backend (3000) pe forward kar do.”................create react app me bhi tha package,json me dalna hota tha pehle abhi jarurat nhi 

// Browser samjhta hai ye request 5173 pe gayi, Vite dev server intercept karta hai aur us request ko forward kar deta hai http://localhost:3000/api/users pe ,Backend se response milta hai aur Vite usko return kar deta hai frontend ko, Browser ko lagta hai sab same origin hai →  No CORS error,
// Advantage No need to change your frontend code for dev and prod, No CORS problem in development, Easy to switch backend URLs later


// proxy only works during development , production k time cors use karna padega .Because the Vite dev server runs only when you do npm run dev.In production, your frontend becomes static files (HTML, CSS, JS) —served by Nginx, Express, or a hosting provider — and there’s no Vite dev server to forward /api requests.

// In production: Your frontend will run at something like
// https://myapp.com ,  Your backend might run at  https://api.myapp.com (or sometimes on a different subdomain or server)
// These are different origins, so browser will again block the request, Unless your backend explicitly allows that origin through CORS.


// So why not use cors from the start?
// It’ll work fine. But every time someone else (on your team) runs the frontend on a different port or environment (like 5174 or localhost:8080), you’ll have to keep changing the allowed origin in backend. That’s annoying in team projects.and using proxy  “just works” without changing backend code.

// frontend me hum code likhtehai fetch kartehai Browser request bhejta hai  (Frontend code sirf Browser ko bolta hai “request bhejo”)

// (1) Browser → request to → http://localhost:5173/api/users
//                  |
//                  v
// (2) Vite dev server (Proxy) request ko pakad leta hai(Vite ka Proxy request ko intercept karta hai)
//                  |
//                  v
// (3) Proxy → request forward karta hai backend ko:
//       http://localhost:3000/api/users
//                  |
//                  v
// (4) Backend response → proxy ko deta hai  
//                  |
//                  v
// (5) Proxy → same response browser ko wapas deta hai

//Backend ka response 3000 par aata hai, lekin wo direct Browser tak nahi jata Proxy us response ko 5173 origin ke naam se browser ko deta hai ✅

//Browser ko lagta hai saara communication sirf 5173 ke sath ho raha hai