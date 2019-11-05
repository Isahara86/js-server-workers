'use strict';

const autocannon = require('autocannon');

// autocannon({
//     url: 'http://localhost:3000',
//     connections: 200, //default
//     pipelining: 1, // default
//     duration: 10 // default
// }, console.log);

// async/await
async function run() {
    const results = [];

    for (let i = 0; i < 5; i++) {

        const result = await autocannon({
            url: 'http://localhost:3000',
            connections: 200, //default
            pipelining: 1, // default
            duration: 10 // default
        });
        // console.log('Requests:', result['2xx']);
        // console.log(result);
        // console.log('Errors:', result.errors);
        results.push({errors: result.errors, requests: result['2xx']});

        await delayPromise(200);

    }

    console.log(results);

    const totalRequests = results.reduce((acc, cur) => acc + cur.requests, 0);
    const totalErrors = results.reduce((acc, cur) => acc + cur.errors, 0);

    console.log('Total requests in 10 sec', totalRequests);
    console.log('Total errors in 10 sec', totalErrors);

    console.log('Average requests in 10 sec', totalRequests / results.length);
    console.log('Average errors in 10 sec', totalErrors / results.length);
}

run();


// autocannon -c 200 -d 10 http://localhost:3000

function delayPromise(milliSec) {
    return new Promise(resolve => setTimeout(resolve, milliSec));
}
