/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    const id = Array(edges.length).fill(undefined).map((_, id) => id)
    const sz = Array(edges.length).fill(1)

    const find = (x) => {
        if (x === id[x]) return x
        id[x] = id[id[x]]
        return find(id[x])
    }

    const isConnected = (i, j) => {
        return find(i) === find(j)
    }

    const union = (i, j) => {
        const pi = find(i)
        const pj = find(j)
        if (sz[pi] < sz[pj]) {
            id[pi] = pj
            sz[pj] += sz[pi]
        } else {
            id[pj] = pi
            sz[pi] += sz[pj]
        }
    }

    for (let edge of edges) {
        const a = edge[0] - 1
        const b = edge[1] - 1
        if (!isConnected(a, b)) {
            union(a, b)
        } else {
            return [a + 1, b + 1]
        }

    }
};
const edges = [[1,2],[1,3],[2,3]]
const res = findRedundantConnection(edges)
console.log(res)