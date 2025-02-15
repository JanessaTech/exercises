/**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function(equations) {
    const A = 'a'.charCodeAt(0)
    const id = Array(26).fill(undefined).map((_, i) => i)
    const sz = Array(26).fill(1)

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
        if (pi === pj) return
        if (sz[pi] < sz[pj]) {
            id[pi] = pj
            sz[pj] += sz[pi]
        } else {
            id[pj] = pi
            sz[pi] += sz[pj]
        }
    }

    for (let eq of equations) {
        if (eq.charAt(1) === '=') {
            const i = eq.charCodeAt(0) - A
            const j = eq.charCodeAt(3) - A
            union(i, j)
        }
    }

    for (let eq of equations) {
        if (eq.charAt(1) === '!') {
            const i = eq.charCodeAt(0) - A
            const j = eq.charCodeAt(3) - A
            if (isConnected(i, j)) return false
        }
    }

    return true
};