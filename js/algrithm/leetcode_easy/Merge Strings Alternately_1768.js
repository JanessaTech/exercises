/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
var mergeAlternately = function(word1, word2) {
    let i = 0, j = 0, k  = 0
    const ans = [], arr1 = word1.split(''), arr2 = word2.split('')
    while (i < word1.length && j < word2.length) {
        ans[k++] = word1[i++]
        ans[k++]  = word2[j++]
    }
    while (i < word1.length) ans[k++] = word1[i++]
    while (j < word2.length) ans[k++] = word2[j++]

    return ans.join('')
};