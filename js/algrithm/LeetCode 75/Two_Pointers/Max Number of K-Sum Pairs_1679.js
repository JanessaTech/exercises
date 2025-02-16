var maxOperations = function(nums, k) {
    nums.sort((a, b) => a - b)
    let cnt = 0
    for (let i = 0, j = nums.length - 1; i < j;) {
        const sum = nums[i] + nums[j]
        if (sum === k) {
            cnt++
            i++
            j--
        } else if (sum < k){
            i++
        } else {
            j--
        }
    }
    return cnt