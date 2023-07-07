package com.leetcode.list;

public class Add_Two_Numbers_2 {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        return add(l1, l2, 0);
    }

    ListNode add(ListNode l1, ListNode l2, int carry) {
        if (l1 == null && l2 ==  null) {
            if (carry == 1) return new ListNode(1);
            return null;
        }

        int sum = carry;
        sum = l1 == null ? sum : sum + l1.val;
        sum = l2 == null ? sum : sum + l2.val;

        int num = sum % 10;
        carry = sum / 10;

        ListNode node = new ListNode(num);
        if (l1 == null) {
            node.next = add(null, l2.next, carry);
        } else if(l2 == null) {
            node.next = add(l1.next, null, carry);
        } else {
            node.next = add(l1.next, l2.next, carry);
        }
        return node;
    }
}
