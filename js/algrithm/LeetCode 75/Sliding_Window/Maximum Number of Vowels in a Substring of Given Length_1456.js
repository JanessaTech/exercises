/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    const isVowel = function(ch) {
        return ch === 'a' ||  ch === 'e' ||  ch === 'i' ||  ch === 'o' ||  ch === 'u'
    }
    const arr = s.split('').map((ch, i) => isVowel(ch) ? 1 : 0)

    let sum = 0
    for (let i = 0; i < k; i++) {
        sum += arr[i]
    }
    let max = sum
    for (let j = 1; j < arr.length - k + 1; j++) {
        sum = sum - arr[j - 1] + arr[j + k - 1]
        if (sum > max) max = sum
    }
    return max
}