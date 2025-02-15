var increasingTriplet = function(nums) {
    let small = Infinity, big = Infinity
    for (let num of nums) {
        if (num <= small) {
            small = num
        } else if (num <= big) {
            big = num
        } else {
            return true
        }
    }
    return false
};