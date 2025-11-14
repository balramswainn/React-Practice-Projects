
const fs = require('fs');

const userRequestHandler =(req, res) => {
  console.log(req.url, req.method);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Enter Your Details:</h1>');
    res.write('<form action="/submit-details" method="POST">'); 
    res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
    res.write('<label for="male">Male</label>')
    res.write('<input type="radio" id="male" name="gender" value="male" />')
    res.write('<label for="female">Female</label>')
    res.write('<input type="radio" id="female" name="gender" value="female" />')
    res.write('<br><input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();

  }
   else if (req.url.toLowerCase() === "/submit-details" &&  req.method == "POST") {

    //want to read the chunks
    const body= []
    req.on("data",(chunk)=>{    //on -> means want to listen, jab bhi naya data ajaye toh bata de,.... now kese bataega callback se
      console.log(chunk)        //so uper condition likha hai wo satisfy hoga TOH listener register kardiya hai toh jab bhi data aaye 
      body.push(chunk)
    });                          //uska pehle chunk console me dikha do ----> so ye <Buffer 75 73 65 72 6e > is type me print ho rha hai console me but if data proper dekna hai toh buffer lelo and jab buffer me data pura ho jaega toh usse convert kar denge meaningful data me.
    //ab body.push(chunk) body me sab chunk ja rha hai , now malum kese padega chunk ana band hogye toh hum aur ek event call karenge    req.on("end",()=>) jab sab chunk ajenge tab ye call hoga


    req.on("end",()=>{
      const fullBody = Buffer.concat(body).toString();  //body ko concat karlenge toh chunks se ->  final data mil jaega 
      console.log(fullBody);      //output->  username=balram+&gender=male

      //When you send data through a URL, it’s usually URL-encoded, and if you want to read the original value, you have to decode it.URLs can’t contain spaces or special characters (like @, #, &, etc.).So these characters are encoded into a safe format (called percent encoding).
      //When decoding is needed:When the server receives that encoded URL,you often need to decode it back to the original form to use it.

      const params = new URLSearchParams(fullBody);  //fullbody isse pass kardiya, ye key value pair me tod dega username:"balram" 

      //  const bodyObject = {};    
      // for (const [key, val] of params.entries()) {  //params.entries se array of arrays mil jaega jo key value dena start kardega
      //   bodyObject[key] = val;
      // }

        // or
      const bodyObject = Object.fromEntries(params);  //easy way  
      console.log(bodyObject);                     //output { username:"balram" ,gender :"female"}

      fs.writeFileSync('user.txt', JSON.stringify(bodyObject));  
      //yaha req.on k andhr likha  fs.writeFileSync cuz chunks pure aaneke baad bhi file create ho nhi toh pehle hi ho jaega,..bodyObject print hoga and isse string chahiye write karnek liye isiliye stringify 
    });







    // fs.writeFileSync('user.txt', 'Prashant Jain');  
    res.statusCode = 302;                
    res.setHeader('Location', '/');      
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>Like / Share / Subscribe</h1></body>');
  res.write('</html>');
  res.end();
};

module.exports = userRequestHandler;


//  WE CAN ALSO WRITE module.exports LIKE THIS
// multiple exports using object 

// module.exports={
//     handler: requestHandler,
//     extra: "Extra"
// }

//Setting multiple properties

// module.exports.handler = requestHandler;
// module.exports.extra = "Extra";


//shortcut   but object ban ke export ho rha hai toh waha bhi wese destructure  karna padega like { requestHandler } to import
  
// exports.handler = requestHandler;
// exports.extra = "Extra"




// 1. Data

//   Data = information we read/write (like files, videos, API responses, etc.)
//   Large data can’t be processed at once — that’s why Node uses **streams**.

// --  
// 2. Stream

//   Stream = continuous flow of data (like water through a pipe).
//   Instead of loading the full file in memory, data is processed **in small parts** (chunks).
//   This makes Node.js **faster and memory-efficient**.
//   Examples: reading a large file, video streaming, etc.

// ---

// 3. Chunk

//   Chunk = a **small piece of data** from the stream.
//   For example, if a file is 100MB, Node may process it as many small chunks (like 64KB each).
//   Streams send data chunk by chunk instead of waiting for the full file.

// ---

// 4. Buffer

//   Buffer = temporary storage area for binary data (0s and 1s).
//   When a chunk arrives, Node keeps it in a **buffer** before processing it.
//   Useful when data is coming faster than it can be processed.

// ---

// 🔁 Simple flow:

//   File → Stream → Chunks → Buffer → Process**

// ---

// 🧩 Example analogy:

// Imagine watching YouTube 🎬

//   You don’t download the full video first.
//   Video data comes **in chunks**, stored **in a buffer**, and **played immediately** — that’s how streams work.


