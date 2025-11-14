const http = require('http');
const requestHandler = require('./user');   
//apna module hoga toh relative path dena padega and koi bhi name de sakta hoon ,and  normaly built in like http ko name se import

const server = http.createServer(requestHandler);  

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});