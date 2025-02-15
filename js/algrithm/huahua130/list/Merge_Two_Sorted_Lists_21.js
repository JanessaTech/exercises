/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    const dummy = new ListNode()
    let pre = dummy
    let p = list1
    let q = list2

    while (p && q) {
        if (p.val < q.val) {
            let next = p.next
            pre.next = p
            p.next = null
            pre = p
            p = next
        } else {
            let next = q.next
            pre.next = q
            q.next = null
            pre = q
            q = next
        }
    }
    if (p) {
        pre.next = p
    }
    if (q) {
        pre.next = q
    }
    return dummy.next
};