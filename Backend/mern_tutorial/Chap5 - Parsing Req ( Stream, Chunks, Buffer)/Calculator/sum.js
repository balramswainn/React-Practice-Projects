const sumRequestHandler = (req, res) => {
  console.log("In Sum Request Handler", req.url);
  const body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', () => {
    const bodyStr = Buffer.concat(body).toString();

    const params = new URLSearchParams(bodyStr);

    const bodyObj = Object.fromEntries(params);

    const result = Number(bodyObj.first) + Number(bodyObj.second); //form banate time name = "first " diya tha
    console.log(result);

    res.setHeader('Content-Type', 'text/html');//req.on k andhr likha bcz jab response aaye tab call ho warna 'result' undefined hota bcz ye  pehle hi call hojata 
    res.write(`                                     
      <html>
        <head><title>Practise Set</title></head>
        <body>
          <h1>Your Sum is ${result}</h1>
        </body>  
      <html>  
    `); 
    return res.end();
  });  
}

exports.sumRequestHandler = sumRequestHandler;