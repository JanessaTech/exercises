/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    var start = 0
    var end = height.length - 1
    var max = 0
    while (start < end) {
        max = Math.max(max, (end - start) * Math.min(height[start], height[end]))
        if (height[start] > height[end]) {
            end--
        } else {
            start++
        }
    }
    return max
};