/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function(n, connections) {
    const id = Array(n).fill(undefined).map((_, i) => i)
    const sz = Array(n).fill(1)

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

    let cnt = 0
    for (let con of connections) {
        const a = con[0]
        const b = con[1]
        if (!isConnected(a, b)) {
            union(a, b)
        } else {
            cnt++
        }
    }

    let components = new Set()
    for (let i of id) {
        let p = find(i)
        if (!components.has(p)) {
            components.add(p)
        }
    }

    return components.size - 1 <= cnt ? components.size - 1 : -1
};

const n = 12
const connections =
[[1,5],[1,7],[1,2],[1,4],[3,7],[4,7],[3,5],[0,6],[0,1],[0,4],[2,6],[0,3],[0,2]]
const res = makeConnected(n, connections)
console.log(res)