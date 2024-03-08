class Chain {
    #chainId
    #myMap = new Map()
    #chainName
    #rpcUrl
    constructor(chainId) {
        this.#chainId = chainId
        this.#myMap.set(1, 'aaa')
        this.#myMap.set(2, 'bbb')
    }

    get chainId() {
        return this.#chainId
    }

    set chainId(newChainId) {
        this.#chainId = newChainId
    }

    toString() {
        return `chainId = ${this.#chainId}, myMap size = ${this.#myMap.size}`
    }
}

module.exports = Chain