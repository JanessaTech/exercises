package com.leetcode.list;

public class Insertion_Sort_List_147 {
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode();
        ListNode cur = head;
        while (cur != null) {
            ListNode nextCur = cur.next;
            insert(dummy, cur);
            cur = nextCur;
        }
        return dummy.next;
    }

    void insert(ListNode dummy, ListNode node) {
        ListNode pre = dummy;
        ListNode cur = dummy.next;
        while(cur != null) {
            if(node.val > cur.val) {
                pre = cur;
                cur = cur.next;
            }else {
                pre.next = node;
                node.next = cur;
                break;
            }
        }
        if (cur == null) {
            pre.next = node;
            node.next = null;
        }
    }
}
