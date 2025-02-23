const MinPriorityQueue =  require('datastructures-js')
//const PriorityQueue =  require('js-priority-queue')

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const pq = new MinPriorityQueue()
    for (let num of nums) {
        if (pq.length === k) {
            pq.dequeue()
            pq.queue(num)
        } else {
            pq.queue(num)
        }
        console.log(pq)
    }
    return pq.dequeue()
};

const nums = [3,2,1,5,6,4]
const res = findKthLargest(nums, 2)
console.log(res)
