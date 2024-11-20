/**
 * @param {number[][]} ghosts
 * @param {number[]} target
 * @return {boolean}
 */
var escapeGhosts = function(ghosts, target) {
    var b = Number.MAX_VALUE
    const a = Math.abs(target[0]) + Math.abs(target[1])
    for (let i = 0; i < ghosts.length; i++) {
        const dis = Math.abs(ghosts[i][0] - target[0]) + Math.abs(ghosts[i][1] - target[1])
        b = Math.min(b, dis)
    }
    return b > a ? true : false
};