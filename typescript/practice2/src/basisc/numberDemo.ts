function test1() {
    const max = Number.MAX_VALUE
    const max_safe = Number.MAX_SAFE_INTEGER
    let eth= 1000000000000000000
    let overflow = 22222222222222222222222222222222222222222222222222222333333
    console.log(max.toLocaleString('fullwide', {useGrouping:false}))
    console.log(overflow)
}

function test2() {
    function isCharNumber(c: string) {
        return c >= '0' && c <= '9';
      }
   console.log(isCharNumber(' '))
}

function test3() {
   console.log(Number(''))
}

//test1()
//test2()
test3()