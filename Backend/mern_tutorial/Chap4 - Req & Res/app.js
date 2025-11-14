const http=require('http')

const server= http.createServer((req,res)=>{  
  // console.log(req);     // yaha puri req log ho rhi hai toh sab data niche terminal me show ho rha hai
  // process.exit();       //stops event loop and exit the server ....node me ye availabe hai

  console.log(req.url, req.method, req.headers); 
  // (url -> "/"  ye print hua); (method -> GET ); (headers -> sab headers agye niche)
  //  ab url me "/" k baad kuch bhi dalega woh show hoga ex : /products  terminal me bhi show karega means ki ye continously listen kar rha hai

  // -----------sending response -----------

    //// res.setHeader('Content-Type', 'json');    //to tell which type of response we are sending-> json data
    // res.setHeader('Content-Type', 'text/html');  //or html page

    // res.write('<html>');             //it will insert the data in html page
    // res.write('<head><title> First Page </title></head>');
    // res.write('<body><h1> go to home page</h1></body>');
    // res.write('</html>');
    // res.end();      //to close the response but aghe ka code chalega so aghe koi fhir res bheja toh error aaega bcz res ja chuki hai

    if(req.url === '/'){
      res.setHeader('Content-Type', 'text/html');  //to tell which type of response we are sending
      res.write('<html>');           
      res.write('<head><title> First Page </title></head>');
      res.write('<body><h1> Welcome to Home </h1></body>');
      res.write('</html>');
      return res.end();            // yaha res ja chuki hai and function bhi stop so aghe ka code nhi chalega ab new http req pe fhir se chalega isiliye fhir res pe error nhi ata bcz res gyi and aghe ka code nhi chalega
    }else if(req.url === '/products'){
      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');           
      res.write('<head><title> First Page </title></head>');
      res.write('<body><h1> Products page</h1></body>');
      res.write('</html>');
      return res.end();    
    }
    res.setHeader('Content-Type', 'text/html');  //or html page
    res.write('<html>');             //it will insert the data in html page
    res.write('<head><title> First Page </title></head>');
    res.write('<body><h1> go to home page</h1></body>');
    res.write('</html>');
    res.end();       
})

const PORT= 3000;

server.listen(PORT,()=>{
  console.log(`server is http://localhost:${PORT}`)
})


// ✅ res.end() kya karta hai?
// res.end() response ko close kar deta hai, Lekin function ko nahi rokta Agar aage koi code likha hua hai, wo fir bhi chal jayega (function ke andar)

// ✅ But error kyun aata hai?
// Because tum response already send kar chuke ho.
// Agar uske baad tum: res.write(), res.setHeader(), res.statusCode = ...

// kuch bhi karte ho → Express/Node bolta hai:
// ❌ “Headers already sent”
// ❌ “Cannot write after end”
// Aur error aata hai → tumhe lagta hai server crash hua.But server band nahi hota — sirf wo request fail hoti hai.

// Request 1: /home → handler chalti hai → res.end() → uske baad ka code (same function me) chalega (agar likha hai).

// Request 2: /men → NEW function call, not continuation of old one.
// Purani request se koi code carry forward nahi hota.

// Isliye tumhe lagta hai:
// “Naye request me res.end() ke baad code nahi chalta”




// ✅ return res.end() kya karta hai?

// ✅ Response close karta hai
// ✅ Ek hi saath function turant stop kar deta hai
// ✅ Niche koi code nahi chalega
// ✅ Isiliye error nahi aata
// ✅ Server smooth rehta hai

// Aur jab naya request aata hai:
// ✅ Function dubara shuru se chalega
// ✅ Tumhe lagta hai: “server ruk nahi raha”
// ✅ Actually server kabhi rukta hi nahi — sirf function request-per-request call hota hai.