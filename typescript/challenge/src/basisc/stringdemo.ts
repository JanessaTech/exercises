function test1() {
    let str = '000123'
    let newStr = str.replace(/^0+/, '')
    console.log('newStr = ', newStr)
}

function regex() {
    const regex = /^\d.$/
    let str = '3.1'
    const res = regex.test(str)
    console.log(res)
}

//test1()
regex()
