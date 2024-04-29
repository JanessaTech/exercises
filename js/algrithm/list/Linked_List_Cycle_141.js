/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let fast = head
    let slow = head

    while (fast && slow) {
        slow = slow.next
        fast = fast.next?.next
        if (slow === fast && slow) return true
    }
    return false
};