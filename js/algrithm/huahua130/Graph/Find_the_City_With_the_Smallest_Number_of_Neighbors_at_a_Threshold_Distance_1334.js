//const PriorityQueue =  require('js-priority-queue')
const PriorityQueue =  require('datastructures-js')
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} distanceThreshold
 * @return {number}
 */

var findTheCity = function(n, edges, distanceThreshold) {
    const dists = []
    for (let i = 0; i < n ; i++) {
        dists.push(Array(n).fill(Infinity))
        dists[i][i] = 0
    }
    const graph = Array(n).fill(undefined).map((_, i) => [])
    for (let [from, to, weight] of edges) {
        graph[from].push([to, weight])
        graph[to].push([from, weight])
    }

    for (let i = 0; i < n; i++) {
        dijkstra(graph, dists[i], i)
    }

    let minCity = -1
    let minCnt = n
    for (let i = 0; i < n; i++) {
        let cnt = 0
        for (let j = 0; j < n; j++) {
            if (i ===j) continue
            if(dists[i][j] <= distanceThreshold) cnt++
        }
        if (cnt <= minCnt) {
            minCnt = cnt
            minCity = i
        }
    }
    return minCity
}

function bellman(n, edges, dist, src) {
    let M = dist
    for (let i = 0; i < n; i++) {
        let N = [...M]
        for (let edge of edges) {
            const [from, to, weight] = edge
            N[to] = Math.min(N[to], M[from] + weight)
            N[from] = Math.min(N[from], M[to] + weight)
        }
        M = [...N]
    }
    for (let i = 0; i <dist.length; i++) {
        dist[i] = M[i]
    }
}

//for leetcode
function dijkstra(graph, dist, src) {
    const minPQ = new PriorityQueue((a, b) => a[1] - b[1])
    minPQ.enqueue([src, 0])
    while (!minPQ.isEmpty()) {
        const [cur, dis] = minPQ.dequeue()
        if (dis > dist[cur]) continue
        for (let [next, wei] of graph[cur]) {
            const newDist = dis + wei
            if (newDist < dist[next]) {
                dist[next] = newDist
                minPQ.enqueue([next, newDist])
            }
        }
    }
}

function dijkstra(n, graph, dist, src) {
    const minPQ = new PriorityQueue({comparator: (a, b) => a[1] - b[1]})
    minPQ.queue([src, 0])
    while (minPQ.length) {
        const [cur, dis] = minPQ.dequeue()
        if (dis > dist[cur]) continue
        for (let [next, wei] of graph[cur]) {
            const newDist = dis + wei
            if (newDist < dist[next]) {
                dist[next] = newDist
                minPQ.queue([next, newDist])
            }
        }
    }

}

function floyd(n, dists) {
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                dists[i][j] = Math.min(dists[i][j], dists[i][k] + dists[k][j])
            }
        }
    }
}

const n = 5, edges = [[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], distanceThreshold = 2
const res = findTheCity(n, edges, distanceThreshold)
console.log(res)