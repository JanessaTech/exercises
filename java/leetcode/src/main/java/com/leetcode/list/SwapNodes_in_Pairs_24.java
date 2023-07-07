package com.leetcode.list;

public class SwapNodes_in_Pairs_24 {
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode();
        ListNode pre = dummy;

        ListNode cur = head;
        while (cur != null) {
            ListNode first = cur;
            ListNode second = cur.next;
            if (second != null) {
                cur = second.next;
                pre.next = second;
                second.next = first;
                first.next = null;
                pre = first;
            } else {
                pre.next = first;
                break;
            }
        }

        return dummy.next;
    }
}
