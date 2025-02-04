
  function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
  }

  function merge(l1, l2) {
    const dummy = new ListNode()
    let pre = dummy
    let p = l1, q = l2
    while (p && q) {
        if (p.val < q.val) {
            let next = p.next
            p.next = null
            pre.next = p
            pre = p
            p = next
        } else {
            let next = q.next
            q.next = null
            pre.next = q
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
}

const l1 = new ListNode(1, new ListNode(3))
const l2 = new ListNode(2, new ListNode(4))
const res  = merge(l1, l2)
console.log(res)