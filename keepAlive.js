const http = require('http');

const options = {
  hostname: 'https://newdealswebsite.onrender.com',
  port: 80,
  path: '/',
  method: 'GET'
};

console.log(`Sending keep-alive ping to ${options.hostname}`);

const req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  res.resume(); // Consume response data to free up memory
});

req.on('error', e => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
