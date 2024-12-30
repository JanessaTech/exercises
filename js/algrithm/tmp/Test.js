var findCheapestPrice1 = function(n, flights, src, dst, k) {
    return bellman_ford(n, flights, src, dst, k)
 }
var findCheapestPrice = function(n, flights, src, dst, k) {
    const digraph = createDigraph(n, flights)
    const queue = []
    const dists = Array(n).fill(Infinity)
    dists[src] = 0
    queue.push([src, 0])
    let level = 0

    while (queue.length && level < k + 1) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            let [cur, dist] = queue.shift()
            for (let [to, price] of digraph[cur]) {
                let newPrice = dist + price
                if (newPrice < dists[to]) {
                    dists[to] = newPrice
                    queue.push([to, newPrice])
                }
            }
        }
        level++
    }

    return dists[dst] !== Infinity ? dists[dst] : -1

};

function createDigraph(n, flights) {
    const digraph = Array(n).fill(undefined).map((_, i) => [])
    for (let flight of flights) {
        const from = flight[0]
        const to = flight[1]
        const price = flight[2]
        digraph[from].push([to, price])
    }
    return digraph
}

function bellman_ford(n, flights, src, dst, K) {
    let M = Array(n).fill(undefined).map((_, i) => i === src? 0: Infinity)
    for (let i = 0; i < K + 1; i++) {
        let N = [...M]
        for (let [from, to, price] of flights) {
            N[to] = Math.min(N[to], M[from] + price)
        }
        M = [...N]
    }
    return M[dst] !== Infinity ? M[dst] : -1
}

const n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1

const res = findCheapestPrice(n, flights, src, dst, k)
console.log(res)
