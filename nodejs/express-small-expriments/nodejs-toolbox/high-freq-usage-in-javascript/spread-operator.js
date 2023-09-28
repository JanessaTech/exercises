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
test()