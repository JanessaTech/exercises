/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function(s) {
    const queue = []
    for (let w of s) {
        if (w !== '*') {
            queue.push(w)
        } else {
            queue.pop()
        }
    }

    return queue.join('')
};