var maxArea = function(height) {
    let max = 0
    for (let i = 0, j = height.length - 1; i < j;) {
        const area = (j - i) * Math.min(height[i], height[j])
        if (area > max) max = area
        if (height[i] < height[j]) {
            i++
        } else {
            j--
        }
    }
    return max
};