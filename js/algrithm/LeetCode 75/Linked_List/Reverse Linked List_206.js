var reverseList = function(head) {
    const dummy = new ListNode()
    let cur = head
    while (cur) {
        let next = cur.next
        cur.next = dummy.next
        dummy.next = cur
        cur = next
    }
    return dummy.next
};