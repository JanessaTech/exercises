var isSubsequence = function(s, t) {
    let i = 0
    const arrS = s.split('')
    const arrT = t.split('')
    const slen = s.length, tlen = t.length
    for (let j = 0; j < tlen; j++) {
        const ch = arrT[j]
        if (i < slen && ch === arrS[i]) {
            i++
        }
    }
    return i === slen
};