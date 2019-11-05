const {Worker, isMainThread, parentPort} = require('worker_threads');
const heavyMath = require('./heavy-math');
const http = require('http');
const os = require('os');
const uuidv4 = require('uuid/v4');

if (isMainThread) {
    const cpus = os.cpus().length;
    const workers = [];
    for (let i = 0; i < cpus - 1; i++) {
        const worker = new Worker(__filename);
        worker.setMaxListeners(1000);
        workers.push(worker);
    }

    let counter = 0;

    http.createServer((req, res) => {

        const worker = workers[counter++];
        const message = {id: uuidv4(), data: '1234'};

        function resHandler(msg) {
            if (msg.id === message.id) {
                worker.off('message', resHandler);
                res.end(JSON.stringify(msg));
            }
        }

        worker.on('message', resHandler);

        worker.postMessage(message);

        if (counter > workers.length - 1) {
            counter = 0;
        }

    }).listen(3000, () => {
        console.log(`cpu count: ${cpus}`);
        console.log(`workers count: ${workers.length}`);
        console.log('Server started, pid: ' + process.pid);
        console.log(`Server listen on port:${3000}`);
    });

} else {
    parentPort.on('message', (message) => {

        let start = Date.now();

        message.result = `${heavyMath(600)} time: ${Date.now() - start} ms`;

        parentPort.postMessage(message);
    });
}
