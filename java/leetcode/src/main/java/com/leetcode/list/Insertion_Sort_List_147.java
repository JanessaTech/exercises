package com.leetcode.list;

public class Insertion_Sort_List_147 {
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode();
        dummy.next = head;
        ListNode pre = head;
        ListNode cur = head.next;
        pre.next = null;

        while (cur != null) {
            ListNode nextCur = cur.next;
            insert(dummy, cur);
            cur = nextCur;
        }
        return dummy.next;
    }

    void insert(ListNode dummy, ListNode node) {
        ListNode cur = dummy.next;
        ListNode pre = dummy;
        boolean found = false;
        while (cur != null) {
            if (node.val <= cur.val) {
                found = true;
                node.next = cur;
                pre.next = node;
                break;
            } else {
                pre = cur;
                cur = cur.next;
            }
        }

        if (!found) {
            pre.next = node;
            node.next = null;
        }
    }
}
