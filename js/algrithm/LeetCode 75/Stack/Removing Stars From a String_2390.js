/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function(s) {
    const star = []
    const nonStar = []
    const chs = s.split('')
    for (let ch of chs) {
        if (ch === '*') {
            nonStar.pop()
        } else {
            nonStar.push(ch)
        }
    }
    return nonStar.join('')    
};