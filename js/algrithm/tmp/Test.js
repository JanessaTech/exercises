/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge = function(accounts) {
    const id = Array(accounts.length).fill(0).map((_, i) => i)
    const sz = Array(accounts.length).fill(1)

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
    const emailToId = () => {
        const map = new Map()
        for (let i = 0; i < accounts.length; i++) {
            for (let j = 1; j < accounts[i].length; j++) {
                let email = accounts[i][j]
                if (!map.has(email)) {
                    map.set(email, i)
                } else {
                    let k = map.get(email)
                    union(k, i)
                }
            }
        }
        return map
    }

    const idToEmail = () => {
        const emailToIdMap = emailToId()
        const map = new Map()
        emailToIdMap.forEach((id, email) => {
            let rt = find(id)
            if (!map.has(rt)) map.set(rt, [])
            map.get(rt).push(email)
        })
        return map
    }

    const ans = []
    const idToEmailMap = idToEmail()
    idToEmailMap.forEach((emails, id) => {
        emails.sort()
        let name = accounts[id][0]
        ans.push([name, ...emails])
    })

    return ans


};

const accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]

const res = accountsMerge(accounts)
console.log(res)