/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    const add = function(l1, l2, carry) {
        if (!l1 && !l2 && !carry) return null
        let sum = carry
        sum += l1 ? l1.val : 0
        sum += l2? l2.val : 0

        let nextNode = undefined
        if (l1 && l2) {
            nextNode = add(l1.next, l2.next, Math.floor(sum / 10))
        } else if (l1) {
            nextNode = add(l1.next, null, Math.floor(sum / 10))
        } else if (l2) {
            nextNode = add(null, l2.next, Math.floor(sum / 10))
        } else {
            nextNode = undefined
        }
        return new ListNode(sum % 10, nextNode)
    }

    return add(l1, l2, 0)
};