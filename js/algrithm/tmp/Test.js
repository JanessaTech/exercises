/**
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function(intervals) {
    intervals.sort((a, b) => {
        if (a[0] === b[[0]]) {
            return b[1] - a[1]
        } else {
            return a[0] - b[0]
        }
    })

    const isOverlapping = function(a, b) {
        return a[1] > b[0]
    }

    let cnt = 0
    for (let i = 0; i < intervals.length - 1; i++) {
        if (isOverlapping(intervals[i], intervals[i + 1])) cnt++
    }

    return cnt
};

const intervals =[[1,2],[2,3]]
const res = eraseOverlapIntervals(intervals)
console.log(res)
