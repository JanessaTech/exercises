
var TimeMap = function() {
    this.map = new Map([]) 
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function(key, value, timestamp) {
    if (!this.map.has(key)) {
        this.map.set(key, [])
    }
    this.map.get(key).push([value, timestamp])
    
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function(key, timestamp) {
    const arr = this.map.get(key)
    if (!arr) return ''
    var lo = 0
    var hi = arr.length - 1
    while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2)
        if (arr[mid][1] === timestamp) {
            return arr[mid][0]
        } else if (arr[mid][1] < timestamp) {
            lo = mid + 1
        } else {
            hi = mid - 1
        }
    }
    if (hi < 0) {
        return ''
    } else {
        return arr[hi][0]
    }
};

/** 
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */