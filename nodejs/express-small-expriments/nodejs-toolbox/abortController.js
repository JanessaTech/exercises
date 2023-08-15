const controller = new AbortController()
const { signal } = controller
const abortEventListener = (event) => {
    console.log(signal.aborted)
    console.log(signal.reason)
}


signal.addEventListener(
    'abort',
    abortEventListener,
    {once: true})
controller.abort('hello Janessa')  //
// output:
// true
// hello Janessa
controller.abort('hello Janessa') // nothing happened because abortEventListener is revoked only once
