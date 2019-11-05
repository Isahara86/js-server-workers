const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const cpus = os.cpus().length;
    console.log(`cpu count: ${cpus}`);
    console.log(`Master started. Pid ${process.pid}`);
    for (let i = 0; i < cpus - 5; i++) {
        cluster.fork();
    }
}

if (cluster.isWorker) {
    require('./server.js');
}
