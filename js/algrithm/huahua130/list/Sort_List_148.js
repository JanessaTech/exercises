
  function ListNode(val, next) {
     this.val = (val===undefined ? 0 : val)
      this.next = (next===undefined ? null : next)
  }

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  const res = sort(head)
  return res
}
function sort(list) {
  if (!list) return null
  if (!list.next) return list
  const [l1, l2] = split(list)
  const first = sort(l1)
  const second = sort(l2)
  const merged = merge(first, second)
  return merged
}

function split(list) {
  const dummy0 = new ListNode()
  const dummy1 = new ListNode()
  let pre0 = dummy0
  let pre1 = dummy1
  
  let cur = list
  while (cur) {
      const first = cur
      const second = first.next
      if (second) {
          const next = second.next
          first.next = null
          pre0.next = first
          pre0 = first
          second.next = null
          pre1.next = second
          pre1 = second
          cur = next
      } else {
          pre0.next = first
          break
      }
  }

  return [dummy0.next, dummy1.next]
}

function merge(l1, l2) {
  const dummy = new ListNode()
  let pre = dummy
  let p = l1, q = l2
  while (p && q) {
      if (p.val <= q.val) {
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

var list = new ListNode(2, new ListNode(1, undefined))
const res = sortList(list)
console.log(res)



