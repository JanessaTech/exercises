var moveZeroes = function(nums) {
    let write = 0
    for (let num of nums) {
        if (num) {
            nums[write++] = num
        }
    }
    while (write < nums.length)   nums[write++] = 0
};