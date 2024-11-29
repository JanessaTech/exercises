/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */
/*
var kthSmallestPrimeFraction = function(arr, k) {
    let fractions = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            fractions.push([arr[i] / arr[j], arr[i], arr[j]])
        }
    }
    fractions.sort((a, b) => a[0] - b[0])
    return [fractions[k - 1][1], fractions[k - 1][2]]
}; */

var kthSmallestPrimeFraction = function(arr, k) {
    const n = arr.length
    const less = function(mid) {
        var cnt = 0
        var maxFrac = 0
        var ab = [0, 1]
        for (let i = 0; i < n - 1; i++) {
            var j = i + 1
            while (j < n && arr[i] / arr[j] >= mid) j++
            cnt += n - j
            if (maxFrac < arr[i] / arr[j]) {
                maxFrac = arr[i] /arr[j]
                ab[0] = arr[i]
                ab[1] = arr[j]
            }
        }
        return [cnt, ab[0], ab[1]]
    }

    var lo = 0
    var hi = 1
    while (lo < hi) {
        const mid = (lo + hi) /2
        const [cnt, a, b] = less(mid)
        if (cnt === k) {
            return [a, b]
        } else if (cnt < k) {
            lo = mid
        } else {
            hi = mid
        }
    }
    return []

};

const arr = [1,2029,3209,3517,3823,4933,8209,8893,12763,12799,14197,14387,18973,19207,23747,24547,24953,25247,25763,27043], k = 1
const res = kthSmallestPrimeFraction(arr, k)
console.log(res)