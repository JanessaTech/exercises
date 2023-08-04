const fs = require('fs');
const child_process = require('child_process');

// running in syn
function exe_case() {
    for(let i = 0; i < 3; i++) {
        var workingProcessor = child_process.exec('node ./scaling/support.js ' + i, 
        function(error, stdout, stderr) {
            if (error) {
                console.log(error.stack)
                console.log('error code:' + error.code)
                console.log('signal received:' + error.signal)
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
        })
        workingProcessor.on('exit', function(code) {
            console.log('workingProcessor exits with code ' + code)
        })
    }
}

//running in asyn
function spawn_case() {
    for(let i = 0; i < 3; i++) {
        var workingProcessor = child_process.spawn('node', ['./scaling/support.js', i])
        workingProcessor.stdout.on('data', function(data) {
            console.log('stdout: ' + data)
        })
        workingProcessor.stderr.on('data', function(data) {
            console.log('stderr: ' + data)
        })
        workingProcessor.on('close', function (code) {
            console.log('child process exited with code ' + code);
         });
    }
}

//exe_case()
spawn_case()

