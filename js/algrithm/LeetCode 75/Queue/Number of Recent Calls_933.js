var RecentCounter = function() {
    this.queue = []
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
    this.queue.push(t)
    const left = t - 3000
    let first = this.queue[0]
    while (first < left) {
        this.queue.shift()
        first = this.queue[0]
    }
    return this.queue.length
};