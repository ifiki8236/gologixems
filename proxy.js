// const http = require('http');
// const httpProxy = require('http-proxy');

// const proxy = httpProxy.createProxyServer({});

// const server = http.createServer((req, res) => {
//     // Set CORS headers to allow requests from the frontend origin
//     res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

//     // Handle CORS preflight requests
//     if (req.method === 'OPTIONS') {
//         res.writeHead(200);
//         res.end();
//         return;
//     }

//     // Proxy your request to the Python server
//     proxy.web(req, res, { target: 'http://ifiki8236.pythonanywhere.com' });
// });

// server.listen(3000, () => {
//     console.log('Proxy server is listening on port 3000');
// });
