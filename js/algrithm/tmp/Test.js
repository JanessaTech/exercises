function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
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

const list = new ListNode(1, new ListNode(2, new ListNode(3)))
const re = reverse(list)
console.log(re)
