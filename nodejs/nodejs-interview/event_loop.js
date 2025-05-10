
const fs = require('fs');

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
}

