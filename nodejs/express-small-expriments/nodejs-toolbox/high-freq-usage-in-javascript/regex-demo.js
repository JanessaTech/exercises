

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

test1()