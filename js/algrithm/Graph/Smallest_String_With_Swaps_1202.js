/**
 * @param {string} s
 * @param {number[][]} pairs
 * @return {string}
 */
var smallestStringWithSwaps = function(s, pairs) {
    const res = []
    const uf = new UF(s.length)
    pairs.forEach(([v1, v2]) => uf.union(v1, v2))
    uf.disJointSets().forEach((ids, key) => {
        const chars = ids.map(id => s[id])
        chars.sort()
        let i = 0
        ids.forEach(id => {
            res[id] = chars[i++]
        })
    })
    return res.join('')
};

class UF {
    constructor(n) {
        this.id = Array(n).fill(null).map((_,ind) => ind)
        this.sz = Array(n).fill(1)
        this.n = n
    }

    root(i) {
        if (i === this.id[i]) return i
        this.id[i] = this.root(this.id[i])
        return this.id[i]
    }

    isConnected(i, j) {
        return this.root(i) === this.root(j)
    }

    union(i, j) {
        let pi = this.root(i)
        let pj = this.root(j)
        if (pi === pj) return
        if (this.sz[pi] < this.sz[pj]) {
            this.id[pi] = pj
            this.sz[pj] = this.sz[pj] + this.sz[pi]
        } else {
            this.id[pj] = pi
            this.sz[pi] = this.sz[pi] + this.sz[pj]
        }
    }

    disJointSets() {
        const map = new Map()
        for (let i = 0; i < this.n; i++) {
            const rt = this.root(i)
            const ids = map.has(rt) ? map.get(rt) : []
            ids.push(i)
            map.set(rt, ids)
        }
        return map
    }
}