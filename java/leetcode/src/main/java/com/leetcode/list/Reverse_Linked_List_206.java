package com.leetcode.list;

public class Reverse_Linked_List_206 {
    public ListNode reverseList(ListNode head) {
        //ListNode res = solution1(head);
        ListNode res = solution2(head);
        return res;
    }

    ListNode solution2(ListNode head) {
        ListNode cur = head;
        ListNode pre = null;
        while (cur != null) {
            ListNode first = cur;
            ListNode second = first.next;
            if (second != null) {
                cur = second.next;
                first.next = pre;
                second.next = first;
                pre = second;
            } else {
                first.next = pre;
                pre = first;
                break;
            }
        }
        return pre;
    }

    ListNode solution1(ListNode head) {
        ListNode dummy = new ListNode();
        reverse(head, dummy);
        return dummy.next;
    }

    ListNode reverse(ListNode cur, ListNode pre) {
        if (cur == null)  return pre;
        ListNode newPre = reverse(cur.next, pre);
        cur.next = null;
        newPre.next = cur;
        return cur;
    }
}
