
const fs = require('fs');
/**
 *  ‌1‌.‌ ‌Timers‌ (setTimeout, setInterval)
    ‌2‌.‌ ‌Pending I/O callbacks‌ (e.g., fs.readFile completion)
 ‌‌ ‌ ‌ ‌3‌.‌ ‌Idle/Prepare‌ (internal use)
 ‌‌ ‌ ‌ ‌4‌.‌ ‌Poll‌ (retrieve new I/O events)
 ‌‌ ‌ ‌ ‌5‌. Check‌ (setImmediate callbacks)
 ‌‌ ‌ ‌ ‌6‌.‌ ‌Close callbacks‌ (e.g., socket.on('close'))
 */

function test1() {
    fs.readFile(__filename, () => {
        console.log('I/O callback'); // Phase 2 (Pending I/O)
        
        setImmediate(() => {
          console.log('setImmediate inside I/O'); // Phase 5 (Check)
        });
      });
      
      setImmediate(() => {
        console.log('Top-level setImmediate'); // Phase 5 (Check)
      });

      /**
       * Top-level setImmediate
        I/O callback
        setImmediate inside I/O
        why:
         - In 1st tick, no IO callback. In Phase 5 (poll), add callback to IO callback queue, then execute CB in Phase 5 (Check)
         - In 2st tick, execute CB in Phase 2, add a CB to check queue, then execute CB in Phase 5 (Check)
       */
}

//test1()

function test2() {
    setTimeout(() => console.log('Timeout'), 0);
    setImmediate(() => console.log('Immediate'));
    fs.readFile(__filename, () => {
        console.log('I/O');
        setTimeout(() => console.log('Timeout in I/O'), 0);
        setImmediate(() => console.log('Immediate in I/O'));
    });
}

//test2()

function test3() {
    setTimeout(() => console.log('Timeout 1'), 0);
    setImmediate(() => console.log('Immediate 1'));

    fs.readFile(__filename, () => {
        console.log('I/O');
        setTimeout(() => console.log('Timeout 2'), 0);
        setImmediate(() => console.log('Immediate 2'));
        process.nextTick(() => console.log('nextTick in I/O'));
    });

    Promise.resolve().then(() => console.log('Promise'));
    process.nextTick(() => console.log('nextTick'));
}
//test3()

function test4() {
  const stream = fs.createReadStream('hello.js')
  stream.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
  })
  stream.on('end', () => {
    console.log('Finished reading file.');
  })
}
test4()
