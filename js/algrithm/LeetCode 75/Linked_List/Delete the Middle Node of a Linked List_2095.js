/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteMiddle = function(head) {
    if (head === null || head.next === null) return null
    let slow = head, fast = head.next.next
    while (fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return head
};