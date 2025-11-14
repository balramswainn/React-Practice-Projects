const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Enter Your Details:</h1>');
    res.write('<form action="/submit-details" method="POST">');  //submit karne k baad data jaega kaha uska link likhna hai and method bhi
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

    // jese hi submit kiya link pe chale jaega bcz humne uper define kiya tha toh waha msg bhi dal saktehai ki "succesfull" ya usse redirect bhi kar sakte hai home page pe ,,, and best practice hai ki lowercase me lelo and ye bhi check karo req ka method post ho toh hi redirect karna  
    fs.writeFileSync('user.txt', 'Prashant Jain');    // file create ho jaegi
    res.statusCode = 302;                //status code change ho jaega
    res.setHeader('Location', '/');      //redirect kardega home pe 
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>Like / Share / Subscribe</h1></body>');
  res.write('</html>');
  res.end();
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});


//if proper dekhna hai jo submit kiya  toh network -> form bhar -> name pe click->  payload 