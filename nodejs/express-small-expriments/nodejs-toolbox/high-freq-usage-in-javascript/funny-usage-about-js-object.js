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
function test_for_sort() {
    const nfts = [
        {owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 10, tokenId: 3},
        {owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 23, tokenId: 4},
        {owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 56, tokenId: 6},
        {owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 54, tokenId: 5},
        {owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 50, tokenId: 2},
        {owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C9'}, price: 12, tokenId: 3},
        {owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C9'}, price: 10, tokenId: 1},
        {owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C9'}, price: 20, tokenId: 2}
    ]
    const nftMap = new Map()
    for (const nft of nfts) {
        if (!nftMap.get(nft.owner.address)) {
            nftMap.set(nft.owner.address, [])
        }
        nftMap.get(nft.owner.address).push({price: nft.price, tokenId: nft.tokenId})
    }
    const froms = []
    let idss = []
    let totalPrice = 0
    for(const [from, value] of nftMap) {
        froms.push(from)
        value.sort((a, b) => {
            return a.tokenId - b.tokenId
        })
        const ids = value.map( (v) => v.tokenId)
        idss.push(ids)
        totalPrice += value.reduce((a, b) => a + b.price, 0)
    }

    const buyData = {
        froms : froms,
        idss: idss,
        totalPrice: totalPrice
    }
    console.log(buyData)
}



//test1()
//test2()
//test3()
//check_object_is_empty()

test_for_sort()