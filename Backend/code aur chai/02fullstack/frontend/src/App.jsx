import { useState,useEffect } from 'react'

import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(()=>{
    axios.get('/api/jokes')  //so pehle pura link tha http://localhost:3000/api/jokes ab esa hai bcz production pe kuch bhi domain name ho sakta hai eg. random.com but we know uske aghe ka /api/jokes so we have  to make standardization for this so we have proxy concept so go to vite.config.js and put the code 
    .then((response)=> setJokes(response.data))  //Jab tum axios.get() use karte ho, uska response ek object hota jisme {data:{},status: 200,..bahot kuch hota hai} Matlab API se jo raw data aata hai wo res.data ke andar hota hai.
    .catch((error)=>{
      console.log(error)
    })
  })

  return (
    <>
      <h1>React app</h1>
      <p>jokes : {jokes.length}</p>
      {
        jokes.map((joke)=>(
          <div key={joke.id}>
              <h2>{joke.title}</h2>
              <p>{joke.content}</p>
          </div>
        ))
      }
    </>
  )
}

export default App



// axios se data get karne k baad ye error aya --->

//Access to XMLHttpRequest at 'http://localhost:3000/jokes' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. 

// This means your frontend (5173) tried to call your backend (3000),but the backend didn’t allow that origin.

//CORS = Cross-Origin Resource Sharing -----It’s a browser security rule that controls whether a web page can make requests to a different domain (origin) than the one it came from.  Example: Frontend: http://localhost:5173 ,Backend: http://localhost:3000 These are different origins (different ports), so the browser will block requests by default unless the backend explicitly allows it.CORS me browser block karta hai agar frontend aur backend ka origin alag ho.Toh backend me hume allowed (whitelisted) origins specify karne padte hain.

//to fix it  goto to backend 
// 1. Install the CORS middleware: npm install cors ->
// import cors from 'cors'
// const app = express()
// app.use(cors())  // allow all origins (for development) Now the browser knows the backend allows requests from other origins.

//2.Optional: Allow only specific origin
// app.use(cors({
//   origin: 'http://localhost:5173', // only allow this frontend
//   methods: ['GET', 'POST'],
// }))

// important so two ways hai to choose but there are things to consider in production and localhost 
// 1. in production jaruri nhi port 3000 par chale kispe bhi chal sakti hai  same with frontend me ...., abhi 5173 pe chal but production pe kuch bhi ho sakta hai and vercel and netlify me bhi ..production me chize alag port pe serve ho rhi hai .....appwrite me esa handle nhi kar sakte waha chize alag hai cuzz appwrite ka package install kiya tha koi public api req nhi kar rhe the so waha hum uske cloud k andhr gaye the waha localhost add kiya tha and whitelisting kar rhe the ki application localhost pe chal jaye so vercel pe kare toh vercel ki whitelisting karne padegi ,nhi kiya toh app nhi chalega









