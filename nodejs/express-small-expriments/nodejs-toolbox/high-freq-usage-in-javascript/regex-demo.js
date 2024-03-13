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

function test3() {
    var fileTypes =  /jpeg|jpg|png|gif/
    const originalName = 'test.png'
    console.log('path.extname(originalName) = ', path.extname(originalName))
    var extname = fileTypes.test(path.extname(originalName).toLowerCase())
    console.log('extname = ', extname)
}

//test1()
//test2()
test3()