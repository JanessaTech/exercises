

const search = (nums, target) => {
    let lo = 0, hi = nums.length - 1
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (target <= nums[mid]) {
            hi = mid
        } else {
            lo = mid + 1
        }
    }
    return nums[lo]
}

const nums = [4, 5, 6, 9]
const res = search(nums, 8.9)
console.log(res)