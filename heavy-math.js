const sortFn = (a, b) => a - b;

function dblLinear(n) {
    const arr = [1];
    const childless = [3, 4];
    const res = [...arr, ...childless];
    return calc(n, arr, childless, res);
}

function calc(n, arr, childless, res) {
    const additionalLaps = Math.round(n / 11) * 2;
    let counter = 1 - additionalLaps;

    while (n > counter) {
        const min = getMin(childless);
        childless.splice(min.i, 1);

        const el = min.val;
        arr.push(el);

        const child1 = 2 * el + 1;
        const child2 = 3 * el + 1;
        if (!arr.includes(child1) && !childless.includes(child1))
            childless.push(child1);
        if (!arr.includes(child2) && !childless.includes(child2))
            childless.push(child2);

        counter += 2;
    }

    res = [...arr, ...childless].sort(sortFn);

    return res[n];
}

function getMin(arr) {
    const res = {
        i: 0,
        val: arr[0],
    };

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < res.val) {
            res.i = i;
            res.val = arr[i];
        }
    }

    return res;
}


// console.log(dblLinear(20)); // 46
// let start = Date.now();
//
// console.log(dblLinear(60000), Date.now() - start + 'ms'); // 1511311
// start = Date.now();
// console.log(dblLinear(10000), Date.now() - start + 'ms'); // 157654
// start = Date.now();
// console.log(dblLinear(50000), Date.now() - start + 'ms'); // 157654
// start = Date.now();
// console.log(dblLinear(4570), Date.now() - start + 'ms'); // 157654
// start = Date.now();
// console.log(dblLinear(50001), Date.now() - start + 'ms'); // 157654
// start = Date.now();
// console.log(dblLinear(60000), Date.now() - start + 'ms'); // 157654

module.exports = dblLinear;


