/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function(products, searchWord) {
    products.sort()
    let tries = {}
    for (let p of products) {
        let node = tries
        for (let i = 0; i < p.length; i++) {
            const w = p[i]
            if (!node[w]) node[w] = {'sug':[]}
            if (node[w]['sug'].length < 3) node[w]['sug'].push(p)
            node = node[w]
        }
    }

    let node = tries, res = []
    for (let i = 0; i < searchWord.length; i++) {
        const w = searchWord[i]
        if (node && node[w]) node = node[w]
        else node = null
        res.push(node? node['sug'] : [])
    }

    return res
};