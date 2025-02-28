/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function(head) {
    let slow = head, fast = head.next.next
    while (fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
    }

    let second = revese(slow.next)
    let first = head
    let max = 0
    while (first && second) {
        max = Math.max(first.val + second.val, max)
        first = first.next
        second = second.next
    }
    return max
};

function revese(list) {
    const dummy = new ListNode()
    let cur = list
    while (cur) {
        let next = cur.next
        cur.next = null
        cur.next  = dummy.next
        dummy.next = cur
        cur = next
    }
    return dummy.next
}