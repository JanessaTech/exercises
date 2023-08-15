function divide(a, b) {
    if (b === 0) {
        throw new Error('divide by zero')
    }
    return a / b
}

function cal(a, b) {
    try {
        return divide(a, b)
    } catch (e) {
        console.log(e.name)
        console.log(e.message)
        //console.log(e.stack)
        throw new Error(e)
    } finally {
        console.log('cal in finally')
    }
}

const res = cal(4, 0)
console.log(res)

