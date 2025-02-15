/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
    const id  = Array(accounts.length).fill(0).map((_, i) => i)
    const sz = Array(accounts.length).fill(1)

    const find = (x) => {
        if (x === id[x]) return x
        id[x] = id[id[x]]
        return find(id[x])
    }

    const isConnected = (i, j) => {
        return find(x) === find(j)
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
        for (let i = 0; i < accounts.length; i++) {
            const root = find(i)
            const ids = map.has(root) ? map.get(root) : []
            ids.push(i)
            map.set(root, ids)
        }
        return map
    }

    const hasCommon = (acc1, acc2) => {
        for (let i = 1; i < acc1.length; i++) {
            for (let j = 1; j < acc2.length; j++) {
                if (acc1[i] === acc2[j]) return true
            }
        }
        return false
    }

    for (let i = 0; i < accounts.length; i++) {
        for (let j = i + 1; j < accounts.length; j++) {
            if (accounts[i][0] === accounts[j][0]) {
                if (hasCommon(accounts[i], accounts[j])) {
                    union(i, j)
                }
            }
        }
    }

    const ans = []
    disjointSets().forEach((ids, key) => {
        const emails = ids.map(id => accounts[id].slice(1))
        const res = [...new Set(emails.flat())].sort()
        ans.push([accounts[key][0], ...res])
    })

    return ans

};

var accountsMerge = function(accounts) {
    const id  = Array(accounts.length).fill(0).map((_, i) => i)
    const sz = Array(accounts.length).fill(1)

    const find = (x) => {
        if (x === id[x]) return x
        id[x] = id[id[x]]
        return find(id[x])
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

    const emailToId = () => {
        const map = new Map()
        for (let i = 0; i < accounts.length; i++) {
            let account = accounts[i]
            for (let j = 1; j < account.length; j++) {
                if (map.has(account[j])) {
                    union(i, map.get(account[j]))
                } else {
                    map.set(account[j], i)
                }
            }
        }
        return map
    }

    const idToEmail = () => {
        const emailToIdMap = emailToId()
        const map = new Map()
        emailToIdMap.forEach((id, email) => {
            const root = find(id)
            if (!map.has(root)) map.set(root, [])
            map.get(root).push(email)
        })
        return map
    }

    const ans = []
    const idToEmailMap = idToEmail()
    idToEmailMap.forEach((emails, id) => {
        emails.sort()
        ans.push([accounts[id][0], ...emails])
    })

    return ans

};

const accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]

const res = accountsMerge(accounts)
console.log(res)
