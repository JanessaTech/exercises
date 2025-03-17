/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function(s, pairs) {
    const n = s.length
    const id = Array(n).fill(undefined).map((_, i) => i)
    const sz = Array(n).fill(1)
    const find = (x) => {
        if (id[x] === x) return x
        id[x] = id[id[x]]
        return find(id[x])
    }
    const isConnected = (i, j) => {
        return find(i) == find(j)
    }
    const union = (i, j) => {
        const pi = find(i)
        const pj = find(j)
        if (pi === pj) return
        if (sz[pi] < sz[pj]) {
            id[pi] = pj
            sz[pj] += sz[pi]
        } else {
            id[pj] = pi
            sz[pi] += sz[pj]
        }
    }

    for (let [a, b] of pairs) {
        union(a, b)
    }

    const disjointSet = () => {
        const map = new Map()
        for (let i = 0; i < n; i++) {
            const rt = find(i)
            if (!map.has(rt)) map.set(rt, [])
            map.get(rt).push(i)
        }
        return map
    }

    const ans = []
    disjointSet().forEach((ids, rt) => {
        const chars = ids.map((id) => s.charAt(id))
        chars.sort()
        let i = 0
        ids.forEach(id => {
            ans[id] = chars[i++]
        })
    })
    return ans.join('')
};