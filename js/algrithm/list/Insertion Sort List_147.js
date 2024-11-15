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
 
function insert(dummy, node) {
    var pre = dummy
    var cur = pre.next
    while (cur) {
        if (cur.val < node.val) {
            pre = cur
            cur = cur.next
        } else {
            pre.next = node
            node.next = cur
            break;
        }
    }
    if (cur === null) {
        pre.next = node
    }
}

var insertionSortList = function(head) {
    var dummy = new ListNode(undefined, undefined)
    var cur = head
    while (cur) {
        var next = cur.next
        cur.next = null
        insert(dummy, cur)
        cur = next
    }
    return dummy.next
};