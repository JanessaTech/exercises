/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */
var findCheapestPrice = function(n, flights, src, dst, k) {
    const res = bfs(n, flights, src, dst, k)
    //const res = bellman(n, flights, src, dst, k)
    return res
 }

 function bfs(n, flights, src, dst, k) {
    const digraph = createDigraph(n, flights)
    const dists = Array(n).fill(Infinity)
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
    return dists[dst] === Infinity ? -1 : dists[dst]
 }

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

 function bellman(n, flights, src, dst, k) {
    let M = Array(n).fill(Infinity)
    M[src] = 0
    for (let i = 0; i < k + 1; i++) {
        let N = [...M]
        for (let [from, to, price] of flights) {
            N[to] = Math.min(N[to], M[from] + price)
        }
        M = [...N]
    }
    return M[dst] !== Infinity ? M[dst] :-1
 }

const n = 5, flights =
[[1,2,10],[2,0,7],[1,3,8],[4,0,10],[3,4,2],[4,2,10],[0,3,3],[3,1,6],[2,4,5]], src = 0, dst = 4, k = 1

const res = findCheapestPrice(n, flights, src, dst, k)
console.log(res)
