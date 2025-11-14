const http = require('http');
const { requestHandler } = require('./handler');  // pehle default export hota tha yaha humnme object banake export kiya tha toh yaha ese destructure karna padega import karna k liye

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
})