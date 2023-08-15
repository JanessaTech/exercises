
const readline = require("readline");
function case1_withAbortion() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("What is your name? ", function (answer) {
        console.log(`Oh, so your name is ${answer}`);
        console.log("Closing the interface");
        rl.close();
    });
}
function case2_withAbortion() {
    const ac = new AbortController()  // check abortController.js to see how to use AbortController
    const signal = ac.signal
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    rl.question("What is your name? ", { signal }, (answer) => {
        console.log(`Oh, so your name is ${answer}`);
        console.log("Closing the console");
        process.exit();
    })

    signal.addEventListener(
        "abort",
        () => {
            console.log("The name question timed out!");
        },
        { once: true }
    )
    setTimeout(() => {
        ac.abort();
        process.exit();
    }, 10000); // 10 seconds

}

function case3_prompt_sync() {
    const prompt = require("prompt-sync")() // you need run : npm install --save prompt-sync
    const input = prompt("What is your name? ");

    console.log(`Oh, so your name is ${input}`);
}

//case1_withAbortion()
// case2_withAbortion()
case3_prompt_sync()