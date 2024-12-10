/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function(firstList, secondList) {
    let i = 0, j = 0
    const ans = []
    for (let i = 0, j = 0; i < firstList.length && j < secondList.length;) {
        if (firstList[i][1] < secondList[j][0]) {
            i++
            continue
        }
        if (firstList[i][0] > secondList[j][1]) {
            j++
            continue
        }
        ans.push([Math.max(firstList[i][0], secondList[j][0]), Math.min(firstList[i][1], secondList[j][1])])
        if (firstList[i][1] < secondList[j][1]) {
            i++
        } else if (firstList[i][1] > secondList[j][1]) {
            j++
        } else {
            i++
            j++
        }
    }

    return ans
};

const firstList = [[1,3],[5,9]], secondList = []
const res = intervalIntersection(firstList, secondList)
console.log(res)