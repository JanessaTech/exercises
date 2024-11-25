
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
    const list = this.map.get(key)
    if (!list) return ""
    var start = 0;
    var end = list.length - 1
    while (start <= end) {
        const mid = Math.floor((start + end) / 2)
        if (list[mid][1] === timestamp)  {
            return list[mid][0]
        } else if (list[mid][1] > timestamp) {
            end = mid - 1
        } else {
            start = mid + 1
        }
    }
    if (end < 0) {
        return ""
    } else if (end >= list.length) {
        return ""
    } else {
        return list[end][0]
    }
    
};

/** 
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */