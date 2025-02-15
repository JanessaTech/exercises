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
        return find(i) === find(j)
    }

    const union = (i, j) => {
        let pi = find(i)
        let pj = find(j)
        if (sz[pi] < sz[pj]) {
            id[pi] = pj
            sz[pj] += sz[pi]
        } else {
            id[pj] = pi
            sz[pi] += sz[pj]
        }
    }

    const disjointSets = () => {
        const map = new Map()
        for (let i = 0; i < n; i++) {
            const rt = find(i)
            if (!map.has(rt)) map.set(rt, [])
            map.get(rt).push(i)
        }
        return map
    }

    for (let pair of pairs) {
        let i = pair[0]
        let j = pair[1]
        if (!isConnected(i, j)) {
            union(i, j)
        }
    }

    const ans = []
    disjointSets().forEach((ids, root) => {
        const chars = ids.map((id) => s.charAt(id))
        chars.sort()
        let i = 0
        ids.forEach((id) => {
            ans[id] = chars[i++]
        })
    })

    return ans.join('')
};