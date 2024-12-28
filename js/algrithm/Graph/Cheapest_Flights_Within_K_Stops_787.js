/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    const digraph = createDigraph(n, flights)
    const dists = Array(n).fill(Number.MAX_VALUE)
    dists[src] = 0

    const queue = [[src, 0]]
    let level = 0

    while (queue.length && level < k + 1) {
        const size = queue.length
        for (let i = 0; i < size; i++) {
            const [cur, dist] = queue.shift()
            for (let [to, price] of digraph[cur]) {
                const newPrice = dist + price
                if (newPrice < dists[to]) {
                    dists[to] = newPrice
                    queue.push([to, newPrice])
                }
            }
        }
        level++
    }
    return dists[dst] === Number.MAX_VALUE ? -1 : dists[dst]
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

const n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1

const res = findCheapestPrice(n, flights, src, dst, k)
console.log(res)
