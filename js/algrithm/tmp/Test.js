const PriorityQueue =  require('js-priority-queue')

var networkDelayTime = function(times, n, k) {
    const digraph = createDigraph(times, n)
    const dists = Array(n).fill(Infinity)
    dijkstra(digraph, dists, k)
    let max = 0
    for (let i = 0; i < n; i++) {
        if (dists[i] > max) {
            max = dists[i]
        }
    }
    return max !== Infinity ? max : -1
};

function createDigraph(times, n) {
    const digraph = Array(n).fill(undefined).map((_, i) => [])
    for (let time of times) {
        const u = time[0] - 1
        const v = time[1] - 1
        const w = time[2]
        digraph[u].push([v, w])
    }
    return digraph
}

function dijkstra(digraph, dists, k) {
    const pq = new PriorityQueue({comparator: (a, b) => a[1] - b[1]})
    pq.queue([k - 1, 0])
    while (pq.length) {
        const [cur, dis] = pq.dequeue()
        if (dis > dists[cur]) continue
        for (let [next, wei] of digraph[cur]) {
            const newDist = dis + wei
            if (newDist < dists[next]) {
                dists[next] = newDist
                pq.queue([next, newDist])
            }
        }
    }
}

const times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
const res = networkDelayTime(times, n, k)
console.log(res)