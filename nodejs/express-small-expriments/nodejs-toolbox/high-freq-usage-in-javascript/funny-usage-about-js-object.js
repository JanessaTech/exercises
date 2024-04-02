function test1() {
    const name = 'jane'
    const age = 10
    const stu = {name, age}
    console.log('name = ', stu.name)
    console.log('age = ', stu.age)
}

function test2() {
    const obj = {name: 'Jane', age: 12}
    for (const [key, value] of Object.entries(obj)) {
        console.log('key =', key, ' value =', value)
    }
}

function test3() {
    const nfts = [{
        category: "cars",
        price: 50,
        status: 'on'
    }]
    const copies = nfts.map((nft) => {
        const copy = {}
        for (const [key, value] of Object.entries(nft)) {
            if (key === 'price' || key === 'status') {
                copy[key] = {}
                copy[key].isChanged = false
                copy[key].backUpValue = undefined
                copy[key].value = value
            } else {
                copy[key] = value
            }
        }
        return copy
    })

    console.log(copies)
}

function  check_object_is_empty() {
    function isEmpty(obj) {
        return !obj || Object.keys(obj).length === 0;
    }

    const emptyObj = {}
    const nonEmptyObj = {name: 'jane'}

    console.log('is emptyObj empty? ', isEmpty(emptyObj))
    console.log('is nonEmptyObj empty? ', isEmpty(nonEmptyObj))
    console.log('is emptyObj empty? ', isEmpty(undefined))
}




//test1()
//test2()
//test3()
check_object_is_empty()