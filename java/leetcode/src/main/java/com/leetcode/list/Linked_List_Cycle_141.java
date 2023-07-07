package com.leetcode.list;

import java.util.HashSet;
import java.util.Set;

public class Linked_List_Cycle_141 {
    public boolean hasCycle(ListNode head) {
        boolean res = solution1(head);
        //boolean res = solution2(head);
        return res;
    }

    boolean solution1(ListNode head) {
        Set<ListNode> visited = new HashSet<>();
        boolean found = false;
        ListNode cur = head;
        while (cur != null) {
            if (visited.contains(cur)) {
                found = true;
                break;
            } else {
                visited.add(cur);
                cur = cur.next;
            }
        }
        return found;
    }

    boolean solution2(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while(fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}
