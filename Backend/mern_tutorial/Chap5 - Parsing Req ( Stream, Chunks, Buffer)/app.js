const http = require('http');
const requestHandler = require('./user');   
//apna module hoga toh relative path dena padega and koi bhi name de sakta hoon ,and  normaly built in like http ko name se import

const server = http.createServer(requestHandler);   // yaha function refernce diya execute nhi , Node ko handler function de rahe ho Jab bhi request aayegi, Node khud call karega: 
// http.createServer(requestHandler());
// ➡️ Server start hote hi function run ho jaayega
// ➡️ Request aane par kuch nahi chalega ❌

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});