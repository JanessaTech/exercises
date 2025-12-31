

async function asyncTask(signal: AbortSignal) {
    const intervalID  = setInterval(() => {
        console.log('asyncTask:', new Date().toISOString())
        if (signal.aborted) {
            clearInterval(intervalID)
        }
    }, 1000)
}

async function main() {
    const controller = new AbortController()
    const signal = controller.signal
    await asyncTask(signal)
    setTimeout(() => {
        console.log('send abort')
        controller.abort()
    }, 5000);
}

main().catch((e) => console.error(e))

// npx ts-node .\src\AbortControllerDemo.ts