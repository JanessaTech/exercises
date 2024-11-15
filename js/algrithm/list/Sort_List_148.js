
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var sortList = function(head) {
  const res  = sort(head)
  return res
};
function sort(list) {
  if (!list) return null
  if (list?.next === null) return list
  const [l1, l2] = split(list)
  const first = sort(l1)
  const second = sort(l2)
  const res = merge(first, second)
  return res
}

function split(head) {
  const dummy1 = new ListNode(undefined, undefined)
  const dummy2 = new ListNode(undefined, undefined)
  var pre1 = dummy1
  var pre2 = dummy2
  var cur = head
  while (cur) {
      var first = cur
      var second = cur?.next
      var next = cur?.next?.next
      insert(pre1, first)
      insert(pre2, second)
      pre1 = first
      pre2 = second
      cur = next
  }
  return [dummy1.next, dummy2.next]
}

function insert(pre, node) {
  if (node) {
      pre.next = node
      node.next = null
  }
}

function merge(l1, l2) {
  const dummy = new ListNode(undefined, undefined)
  var pre = dummy
  var cur1 = l1
  var cur2  = l2
  while (cur1 && cur2) {
      if (cur1.val < cur2.val) {
          pre.next = cur1
          pre = cur1
          cur1 = cur1.next
          pre.next = null
      } else {
          pre.next = cur2
          pre = cur2
          cur2 = cur2.next
          pre.next = null
      }
  }
  if (cur1) {
      pre.next = cur1
  }
  if (cur2) {
      pre.next = cur2
  }
  return dummy.next
}

var list = new ListNode(2, new ListNode(1, undefined))
const res = sortList(list)
console.log(res)



