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
 
var insertionSortList = function(head) {
    const dummy = new ListNode()
    let cur = head
    while (cur) {
        let next = cur.next
        cur.next = null
        insert(dummy, cur)
        cur = next
    }
    return dummy.next
};

function insert(dummy, one) {
    let pre = dummy
    let cur = dummy.next
    while (cur && cur.val < one.val) {
        pre = cur
        cur = cur.next
    }
    pre.next = one
    one.next = cur
}