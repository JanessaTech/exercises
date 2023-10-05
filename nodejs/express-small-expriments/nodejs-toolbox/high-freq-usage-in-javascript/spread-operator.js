function test() {

    let props = {
        name: 'Janessa',
        age: 12,
        addr:'xian',
        aa: 'xxx',
        bb: true
    }
    const {name, ...others} = props
    console.log(name)
    console.log(others)
    console.log({...others})
}

function test2() {
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };
    console.log({label})
    console.log({...label})
}

function test3() {
    const list = [1,2,3]
    console.log(list)
    console.log([list])
    console.log([...list])
}
test()
test2()
test3()