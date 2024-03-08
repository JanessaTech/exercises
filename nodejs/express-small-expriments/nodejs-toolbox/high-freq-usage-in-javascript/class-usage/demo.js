const Chain = require('./Chain')

const chain = new Chain(123)
console.log('chanId = ', chain.chainId)
chain.chainId = 2345
console.log('chanId = ', chain.chainId)
console.log(`${chain}`)
console.log(typeof chain)