var oddEvenList = function(head) {
    if(head === null) return null
    const oddDummy = new ListNode()
    const evenDummy = new ListNode()
    let preOdd = oddDummy, preEven = evenDummy
    let cur = head
    let odd = true
    while (cur) {
        let next = cur.next
        cur.next = null
        if (odd) {
            preOdd.next = cur
            preOdd = cur
            odd = false
        } else {
            preEven.next = cur
            preEven = cur
            odd = true
        }
        cur = next
    }
    preOdd.next = evenDummy.next

    return oddDummy.next
};