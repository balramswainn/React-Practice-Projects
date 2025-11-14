// ✅ How DNS Works?  Domain Name System

// 1. User browser me URL type karta hai (for example: www.example.com)

// 2. Browser DNS se poochta hai ki ye domain ka actual IP address kya hai, kyunki computer domain nahi, IP se baat karta hai.

// 3. IP milne ke baad, browser server ke sath TCP connection establish karta hai.
// Agar website HTTPS hai, toh TLS/SSL handshake hota hai taaki communication secure ho jaye.

// 4. TCP connection banne ke baad, browser server ko HTTP request bhejta hai (e.g. "home page lao").

// 5. Server response bhejta hai → HTML, CSS, JS, images, etc.

// 6. Browser in files ko render karta hai (DOM Tree + CSSOM + JS execution), aur website screen par dikhai deti hai.





// ✅ 2. DNS (Domain Name System) ka role

// Domain name = Human friendly name (google.com)

// Server address = IP Address (e.g., 142.250.183.78) → Computer Friendly

// DNS ka kaam:
// Domain ko IP address me convert karna.

// | Step | Kaun se jagah check hota hai?          | Kaam kya hota hai?                                                        |
// | ---- | -------------------------------------- | ------------------------------------------------------------------------- |
// | 1    | Browser Cache                          | Pehle browser dekhta hai ki kya is domain ka IP pehle se saved hai?       |
// | 2    | OS Cache                               | Agar browser me nahi, toh computer ke OS cache me check hota hai.         |
// | 3    | Router Cache                           | Agar nahi mila, toh router ke DNS cache me dekha jata hai.                |
// | 4    | ISP DNS Server                         | Nahi mile toh Internet Service Provider ke DNS Server se poocha jata hai. |
// | 5    | Root DNS → TLD DNS → Authoritative DNS | Yaha se **actual IP address** mil jata hai.                               |


// Finally DNS browser ko ye batata hai:  google.com → 142.250.183.78




// ✅ 3. Browser TCP Connection banata hai
// Browser server ke IP se connect karta hai using TCP handshake (3 step process):SYN → SYN-ACK → ACK
// Isse browser aur server dono agree hote hain ki communication start ho sakta hai.

//  Transmission Control Protocol What is TCP 3 Way Handshake? - Scaler Topics A TCP connection is a reliable, ordered communication link established between two devices over a network before any data is sent It uses a three-way handshake to establish this connection, ensuring both the client and server are ready to communicate




// ✅ 4. TLS/SSL Handshake (if https://)
//   Agar website https hai → toh secure connection banaya jata hai.
// Browser aur server encryption keys exchange karte hain.
// Ab data safe and encrypted travel karega.


// ✅ 5. Browser sends HTTP Request

// Browser server ko request bhejta hai:
// GET /   (means home page mangna)
// Host: www.google.com

// ✅ 6. Server Response

// Server reply karta hai: HTML, CSS, JS, Images, etc.


// ✅ 7. Browser Rendering (Website Dikhti Hai)

// Browser: HTML padh kar structure banata hai (DOM Tree)
// CSS padh kar styling apply karta hai (CSSOM Tree)
// JS execute hota hai (interactivity add hoti hai)
// Images, Videos, Fonts load hote hain
// Fir browser in sabko combine karke website screen par show karta hai.


// ---------------------------------------------------------------------------------------------------------------------------------


// browser se login -> server pe (backend code run) -> response back to browser
// DNS → sirf pehli baar. TCP → refresh par naya. HTTP → har request par.


// Frontend = wo files (HTML, CSS, JS) jo browser me run hoti hain.
// Backend = code jo server machine par run hota hai.

// Dono ek server se aa sakte hain, but run different jagah par hote hain:

// | Part         | Kaha run hota hai?                        | Kaam kya karta hai?                                           |
// | ------------ | ----------------------------------------- | ------------------------------------------------------------- |
// | **Frontend** | Browser (User ke device me)               | UI dikhata hai, buttons/forms/visuals control karta hai       |
// | **Backend**  | Server (Remote machine / hosting / cloud) | Logic, authentication, database & processing handle karta hai |


// if user types ->https://myapp.com/login


// Browser request bhejta hai server ko → /login page ke liye.
// Server frontend ka login page (HTML/CSS/JS) browser ko bejh deta hai → Browser me UI dikh jaati hai.
// User username & password dalta hai aur button press karta hai.
// Ab browser backend ko request bhejta hai (e.g., API request):  
// POST https://myapp.com/api/login    Data ke sath:{ username: "ram", password: "1234" }
// Backend server code chalta hai:Ye request receive karta hai, Database me jaake credentials check karta hai
// Agar credentials match → server response deta hai: { success: true, token: "xyz" }



// /login likh ke enter karte hi:

// DNS and TCP Kya ye pura process har request pe hota hai?

// Answer:
//  DNS → TCP → Request → Response ye first time hi hota hai.
// But:
// DNS result jo  IP address hai wo browser cache me store ho jata hai 
// TCP connection alive rehta hai (HTTP Keep-Alive) jab tak refresh na ho page
// So baar-baar DNS nahi hota, aur TCP connection bhi kuch time tak reuse hota hai.



// "TCP banne ke baad kya har naye request ke liye DNS dobara hota hai?"

// DNS sirf pehli baar IP batata hai.Uske baad browser ke pass:Domain → IP Map  store ho chuka hota hai.
// So jab browser ko fir se request bhejni ho: Browser —(already knows IP)—> Server DNS dubara nahi call hota (jab tak DNS cache expire nahi hota).

// ✅ Important Concept: HTTP Keep-Alive 
// Jab TCP connection ban gaya: Client --- Connected --- Server Toh multiple HTTP requests usi connection par ja sakti hain.



// DNS cache tab expire hota hai jab uska TTL time complete ho jata hai.
// Browser refresh par IP cache nahi delete hota, bas TCP connection naya ban jata hai.

// | Situation                         | DNS Cache Clear Hoga?        | Reason                            |
// | --------------------------------- | ---------------------------- | --------------------------------- |
// | **Page refresh**                  | ❌ No                         | IP already known, reuse hota hai  |
// | **Browser tab close**             | ✅ Sometimes (depends on TTL) | But mostly cache rehta hai        |
// | **Browser fully close + re-open** | ✅ Likely                     | Many browsers flush session cache |
// | **System restart**                | ✅ Yes                        | Memory flush                      |
// | **DNS TTL expire**                | ✅ Yes                        | Time limit khatam                 |
// | **User manually clear cache**     | ✅ Yes                        | Clear browsing data / flush DNS   |


// -------------------------------------------------------------------------



// 👉 Server = koi bhi system jo request ka response deta hai.Ye ek concept hai, koi ek specific machine nahi.

// ⭐ Hosting machine = server
// Kyuki woh tumhara app run karke duniya ko response deta hai.

// ⭐ Tumhara Express app = server
// Kyuki woh bhi request lekar response deta hai.


// Hosting server ka kaam sirf ek hi major cheez hai:Tumhare Node.js / Express app ko internet par chala dena.
// Express ka role kya?

// Express logic handle karta hai:
// ✔ request aaye → route match
// ✔ data fetch → processing
// ✔ response bhejna
// ✔ business logic
// ✔ database communication
// Yeh sab tumne code likh ke banaya.


// Jab tum apna Express server hosting server pe upload karte ho:
// 👉 Hosting server tumhara Node.js + Express code run karta है
// 👉 Ab duniya ke users ki request tumhare Express routes me aati है
// 👉 Response vahi Express server deta है




// 1. TCP connection & SSL handshake kaha hota hai?
// Hosting server (jaha tumhara Node/Express app deployed hai)

// 2. Jab URL dalte ho, HTTP request kis server ko jati hai?
// 👉 Hosting server (domain → DNS → hosting IP → hosting machine)
// Browser → DNS → Hosting Server
// Hosting server tumhare Express app ko request forward karta hai → Express response banata hai.

// ✅ SHORT SUMMARY (100% correct flow)
// 1️⃣ Browser → Hosting Server
// User URL type karta hai → request hosting server ke IP/DNS par land hoti hai.

// 2️⃣ Hosting Server → Express App
// Hosting server us request ko tumhare Node/Express app ke process ko forward kar deta hai.

// 3️⃣ Express App → Response Create
// Express tumhara backend code run karke:
// ✔ Database se data leta
// ✔ Logic apply karta
// ✔ res.send / res.render se response banata

// 4️⃣ Express App → Hosting Server
// Express server response hosting server ko wapas deta hai (local transfer).

// 5️⃣ Hosting Server → Browser
// Hosting server woh response client(browser) ko internet ke through send karta hai.