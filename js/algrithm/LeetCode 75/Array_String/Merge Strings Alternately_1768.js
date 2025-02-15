var mergeAlternately = function(word1, word2) {
    let i = 0, j = 0
    const arr1 = word1.split('')
    const arr2 = word2.split('')
    let k = 0
    let isEven = true
    const ans = []

    while (i < arr1.length && j < arr2.length) {
        if (isEven) {
            ans[k++] = arr1[i++]
            isEven = false
        } else {
            ans[k++] = arr2[j++]
            isEven = true
        }
    }
    while (i < arr1.length) {
        ans[k++] = arr1[i++]
    }
    while (j < arr2.length) {
        ans[k++] = arr2[j++]
    }
    return ans.join('')
};