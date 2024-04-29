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
var reverseList = function(head) {
    const dummy = new ListNode(-1, undefined)
    let cur = head
    while (cur) {
        let next = cur.next
        cur.next = dummy.next
        dummy.next = cur
        if (next) {
            cur = next
        } else {
            break
        }
    }
    return dummy.next
};