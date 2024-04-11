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
        {id: 1, address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 10, tokenId: 2},
        {id: 2, address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 23, tokenId: 1},
        {id: 3, address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 56, tokenId: 3},
        {id: 4, address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', owner: {address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}, price: 54, tokenId: 5},
        {id: 5, address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', owner: {address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}, price: 50, tokenId: 4},
        {id: 6, address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', owner: {address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}, price: 12, tokenId: 6},
        {id: 7, address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', owner: {address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92277'}, price: 42, tokenId: 8},
        {id: 8, address: '0x5FbDB2315678afecb367f032d93F642f64180aa3', owner: {address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92277'}, price: 14, tokenId: 7},

        {id: 9, address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 23, tokenId: 4},
        {id: 10, address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 11, tokenId: 3},
        {id: 11, address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', owner: {address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'}, price: 21, tokenId: 2},
        {id: 12, address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', owner: {address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}, price: 34, tokenId: 6},
        {id: 13, address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', owner: {address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}, price: 11, tokenId: 5},
        {id: 14, address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', owner: {address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'}, price: 33, tokenId: 1}
    ]
    const nftMap = new Map()
    for (const nft of nfts) {
        if (!nftMap.get(nft.address)) {
            nftMap.set(nft.address, new Map())
        }
        if (!nftMap.get(nft.address).get(nft.owner.address)) {
            nftMap.get(nft.address).set(nft.owner.address, [])
        }
        nftMap.get(nft.address).get(nft.owner.address).push({price: nft.price, tokenId: nft.tokenId, nftId: nft.id})
    }

    const buyData = []

    for(const [address, subMap] of nftMap) {
        const froms = []
        let idss = []
        let prices = []
        let nftIds = []
        for (const [owner, value] of subMap) {
            let price = 0
            froms.push(owner)
            value.sort((a, b) => {
                return a.tokenId - b.tokenId
            })
            const ids = value.map( (v) => v.tokenId)
            idss.push(ids)
            value.forEach((v,) => nftIds.push(v.nftId))
            price = value.reduce((a, b) => a + b.price, 0)
            prices.push(price)
        }
        buyData.push({
            address: address,
            froms: froms,
            idss: idss,
            nftIds: nftIds,
            price: prices,
            totalPrice: prices.reduce((a, b) => a + b, 0)
        })
    }

    for (const buy of buyData) {
        console.log(buy)
    }

    const total = buyData.reduce((a, b) => a + b.totalPrice, 0)
    console.log('total =', total)
}



//test1()
//test2()
//test3()
//check_object_is_empty()

test_for_sort()