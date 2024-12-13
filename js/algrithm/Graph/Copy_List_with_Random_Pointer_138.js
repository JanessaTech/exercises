/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function(head) {
    if (head === null) return null
    const map = new Map()

    let cur = head
    let pre = null

    while (cur) {
        const copy = new _Node(cur.val, null, null)
        if (pre) {
            map.get(pre).next = copy
        }
        map.set(cur, copy)
        pre = cur
        cur = cur.next
    }

    cur = head

    while (cur) {
        if (cur.random) {
            map.get(cur).random = map.get(cur.random)
        }
        cur = cur.next
    }

    return map.get(head)
};