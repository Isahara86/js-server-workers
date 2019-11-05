const http = require('http');
const heavyMath = require('./heavy-math');


http.createServer((req, res) => {
    // for (let i = 0; i < 1e7; i++) {
    // }
    // res.end('hello from server \n');
    let start = Date.now();
    res.end(`${heavyMath(600)} time: ${Date.now() - start} ms`);
}).listen(3000, () => {
    console.log('Server started, pid: ' + process.pid);
    console.log(`Server listen on port:${3000}`);
});
