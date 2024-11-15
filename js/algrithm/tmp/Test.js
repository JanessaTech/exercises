function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
}

var addTwoNumbers = function(l1, l2) {
    const add = function(l1, l2, carry) {
        if (!l1 && !l2 && !carry) return undefined
        if (!l1 && !l2 && carry) return new ListNode(carry, undefined)
        var sum = carry
        sum += l1 ? l1.val : 0
        sum += l2 ? l2.val : 0
        
        var next = undefined
        if (l1 && l2) {
            next = add(l1.next, l2.next, Math.floor(sum / 10))
        } else if (l1) {
            next = add(l1.next, undefined, Math.floor(sum / 10))
        } else if (l2){
            next = add(undefined, l2.next, Math.floor(sum / 10))
        } else {
            next = add(undefined, undefined, Math.floor(sum / 10))
        }
        var node = new ListNode(sum % 10, next)
        return node
    }
    return add(l1, l2, 0)
};

var l1 = new ListNode(2, new ListNode(4, new ListNode(3, undefined)))
var l2 = new ListNode(5, new ListNode(6, new ListNode(4, undefined)))

var res = addTwoNumbers(l1, l2)
console.log(res)