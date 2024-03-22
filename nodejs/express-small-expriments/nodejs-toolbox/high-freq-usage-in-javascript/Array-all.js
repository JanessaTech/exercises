function parser(prices) {
    const [minPart, maxPart] = prices.split('|')
    console.log('minPart =', minPart, ' maxPart =', maxPart)
}

function test1() {
    parser('min:3|max:10')
    parser('max:10')
}


test1()