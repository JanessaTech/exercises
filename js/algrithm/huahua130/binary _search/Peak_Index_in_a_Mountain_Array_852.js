/**
 * @param {number[]} arr
 * @return {number}
 */
var peakIndexInMountainArray = function(arr) {
    var lo = 0
    var hi = arr.length - 1
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (arr[mid] > arr[mid - 1] && arr[mid] > arr[mid + 1]) {
            return mid
        } else if (arr[mid] < arr[mid + 1]) {
            lo = mid + 1
        } else if (arr[mid] < arr[mid - 1]) {
            hi = mid - 1
        }
    }
    return -1
};