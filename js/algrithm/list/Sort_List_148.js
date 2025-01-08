
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
  if (list === null) return null
  if (list.next === null) return list
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

function merge(l1, l2) {
  const dummy = new ListNode()
  let pre = dummy
  let p = l1
  let q = l2
  while (p || q) {
      if (p && q) {
          if (p.val < q.val) {
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
}

var list = new ListNode(2, new ListNode(1, undefined))
const res = sortList(list)
console.log(res)



