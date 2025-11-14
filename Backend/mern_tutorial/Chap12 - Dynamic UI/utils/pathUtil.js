// Core Module
const path = require('path');

module.exports = path.dirname(require.main.filename);


// Ye code current project ka root folder path return karta hai.
// require.main.filename → ye server start wali file ka full path deta hai (usually app.js).

// path.dirname() → sirf folder ka path rakhta hai, filename hata deta hai.
// require.main.filename -> "C:/Users/Ram/Desktop/project/app.js"
// path.dirname("C:/Users/Ram/Desktop/project/app.js")
// -> C:/Users/Ram/Desktop/project
// Yani filename ko hata deta hai → sirf folder ka path de deta hai.

// So final result:
// rootDir = project ka main folder path.



// but why 

// Hum jab res.sendFile() use karke HTML, CSS, JS files bhejte hain,to unka folder ka exact path chahiye hota hai.
// require.main.filename -> "C:/Users/Ram/Desktop/project/app.js" → pure file ka path deta hai, jisme file ka naam bhi hota hai.
// Hum isko as a base folder use nahi kar sakte, kyunki app.js ek file hai, folder nahi.

// Solution
// path.dirname() use karte hain →
// file ka naam hata deta hai, aur hume project ka root folder mil jata hai:Ab hum iske andar views, public, routes, images, etc. ka path aasani se bana sakte hai.
// path.join(rootDir, 'views', 'home.html')  -> C:/MyProject/views/home.html
// Agar hum filename nahi hatate → path galat hota aur Express file find nahi kar pata ❌


// hum -> (require.main.filename)  se file ka path le rhe hai jo rootDir hai simple yaha toh path alag hoga and server pe alag so hard coded nhi rakh sakte dynamic hon chahiye jo path hai mil jaega 

// laptop me project ka folder yaha ho sakta hai: res.sendFile("C:/Users/YourName/Desktop/MyProject/views/home.html");
// But Jab Project Server par Upload Hota Hai…

// Server (like Railway, Render, AWS, VPS, Hosting etc.) tumhara Desktop wala path nahi hota.
// Server ka internal directory kuch aisa hoga:

// /usr/local/src/apps/MyProject  -> Path completely change ho gaya. so hard-coded path nhi chalega 

//main reason yehi hai ki ex. /about kiya toh file show hoga but humare backend me toh alag folder me hai /views/about.html so routing kar rhe hai hum /about kiya toh hume ye file milna chahiye 
//es.sendFile(path.join(rootDir, 'views', 'about.html'));   -> backend ka path dynamic/views/about.html 
//yaha koi bhi /views/about ko access nhi kar paega