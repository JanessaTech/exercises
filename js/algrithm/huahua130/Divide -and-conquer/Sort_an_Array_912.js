/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    const aux = Array(nums.length)
    sort(nums, aux, 0, nums.length - 1)
    return nums
};

function sort(nums, aux, lo, hi) {
    if (hi <= lo) return
    const mid = Math.floor((lo + hi) / 2)
    sort(nums, aux, lo, mid)
    sort(nums, aux, mid + 1, hi)
    merge(nums, aux, lo, mid, hi)
}

function merge(nums, aux, lo, mid, hi) {
    for (let k = lo; k <= hi; k++) {
        aux[k] = nums[k] //copy
    }
    let i = lo, j = mid + 1
    for (let k = lo; k <= hi; k++) {
        if (i > mid) {
            nums[k] = aux[j++]
        } else if (j > hi) {
            nums[k] = aux[i++]
        } else if (aux[i] < aux[j]) {
            nums[k] = aux[i++]
        } else {
            nums[k] = aux[j++]
        }
    }
}