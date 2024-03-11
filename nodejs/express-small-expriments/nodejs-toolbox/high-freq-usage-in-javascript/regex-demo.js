const path  = require("path");


function test1() {
    const regex = /^min:\d+\|max:\d+$/
    let str = 'min:0000|max:ss'
    const res = regex.test(str)
    console.log(res)
    const [minPart, maxPart] = str.split('|')
    const [, min] = minPart.split(':')
    const [, max] = maxPart.split(':')
    console.log('min = ', Number(min), ' max = ', Number(max))
    console.log(' min < max :', Number(min) < Number(max))

}

function test2() {
    const originalName = 'test.png'
    const matches = originalName.match(/\.+[\S]+$/)
    const fileExtension = (matches || [])[0]
    console.log(fileExtension)  // .png
    console.log(path.extname(originalName))  // .png
}

//test1()
test2()