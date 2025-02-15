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
var swapPairs = function(head) {
    const dummy = new ListNode(-1, undefined)
    let pre = dummy
    let cur = head
    while (cur) {
        let first = cur
        let second = cur?.next
        if (second) {
            cur = second.next
            pre.next = second
            second.next = first
            first.next = null
            pre = first
        } else {
            pre.next = first
            break
        }
    }
    return dummy.next

};