/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '')
    for (let i = 0,j = s.length - 1; i < j; i++, j--) {
        if (s.charAt(i) !== s.charAt(j)) return false
    }
    return true
};