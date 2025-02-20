var closeStrings = function(word1, word2) {
    const freq1 = Array(26).fill(0)
    const freq2 = Array(26).fill(0)

    const A = 'a'.charCodeAt(0)
    for (let w of word1) {
        freq1[w.charCodeAt(0) - A]++
    }
    for (let w of word2) {
        freq2[w.charCodeAt(0) - A]++
    }

    for (let i = 0; i < 26; i++) {
        if ((freq1[i] > 0 && freq2[i] === 0) || (freq1[i] === 0 && freq2[i] > 0)) return false
    }

    freq1.sort((a, b) => a - b)
    freq2.sort((a, b) => a - b)

    for (let i = 0; i < 26; i++) {
        if (freq1[i] !== freq2[i]) return false
    }
    
    return true
};


const word1 = "a", word2 = "aa"

const res = closeStrings(word1, word2)
console.log(res)