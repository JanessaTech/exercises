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
    const reversedL1 = reverse(l1)
    const reversedL2 = reverse(l2)

    const added = add(reversedL1, reversedL2, 0)
    const revsersedAdded = reverse(added)
    return revsersedAdded
};

function add(l1, l2, carry) {
    if (l1 === null && l2 === null) {
        if (carry) return new ListNode(1)
        else return null
    }
    let sum = carry
    sum += l1 ? l1.val : 0
    sum += l2 ? l2.val : 0

    const node = new ListNode(sum % 10)
    if (l1 && l2) {
        node.next = add(l1.next, l2.next, Math.floor(sum / 10))
    } else if (l1) {
        node.next = add(l1.next, null, Math.floor(sum / 10))
    } else {
        node.next = add(null, l2.next, Math.floor(sum / 10))
    }
    return node
}

function reverse(list) {
    const dummy = new ListNode(-1)
    let cur = list
    while (cur) {
        let next = cur.next
        cur.next = dummy.next
        dummy.next = cur
        cur = next
    }
    return dummy.next
}