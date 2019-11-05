// var buffer = new SharedArrayBuffer(16);
// var uint8 = new Uint8Array(buffer);
// uint8[0] = 7;
//
// // 7 + 2 = 9
// console.log(Atomics.add(uint8, 0, 2));
// // expected output: 7
//
// console.log(Atomics.load(uint8, 0));
// // expected output: 9

var sab = new SharedArrayBuffer(1024);
var int32 = new Int32Array(sab);

setTimeout(() => {
    Atomics.store(int32, 0, 123);
    Atomics.notify(int32, 0, 1);
});

Atomics.wait(int32, 0, 0);
console.log(int32[0]); // 123

console.log(123);
console.log(int32[0]); // 0;
