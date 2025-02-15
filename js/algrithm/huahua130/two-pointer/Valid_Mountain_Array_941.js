/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function(arr) {
    const n = arr.length
    let i = 0, j = n - 1
    while (i < n - 1 && arr[i] < arr[i + 1]) i++
    while (j > 0 && arr[j - 1] > arr[j]) j--
    return i === j && i > 0 && j < n - 1
};