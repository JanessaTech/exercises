function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}


function split(list) {
    const dummy0 = new ListNode()
    const dummy1 = new ListNode()
    let pre0 = dummy0
    let pre1 = dummy1
    let cur = list

    let toggle = 0
    while (cur) {
        let next = cur.next
        cur.next = null
        if (toggle === 0) {
            pre0.next = cur
            pre0 = cur
            toggle = 1
        } else {
            pre1.next = cur
            pre1 = cur
            toggle = 0
        }
        cur = next
    }
    return [dummy0.next, dummy1.next]
}

const list = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))))
const [l1, l2] = split(list)
console.log(l1)
console.log(l2)