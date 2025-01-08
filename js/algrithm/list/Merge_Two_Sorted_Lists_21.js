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
    let p = list1
    let q = list2
    let pre = dummy
    while (p || q) {
        if (p && q) {
            if (p.val <= q.val) {
                let next = p.next
                pre.next = p
                pre = p
                pre.next = null
                p = next
            } else {
                let next = q.next
                pre.next = q
                pre = q
                pre.next = null
                q = next
            }
        } else if (p) {
            pre.next = p
            break
        } else {
            pre.next = q
            break
        }
    }
    return dummy.next
};