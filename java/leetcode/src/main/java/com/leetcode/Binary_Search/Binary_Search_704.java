package com.leetcode.Binary_Search;

public class Binary_Search_704 {
    public int search(int[] nums, int target) {
        int lo = 0;
        int hi = nums.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) /2;
            if (nums[mid] == target) return mid;
            else if (target > nums[mid]) lo = mid + 1 ;
            else hi = mid - 1;
        }
        return -1;
    }

    public int[] search1(int[] nums, int target) {
        int lo = 0;
        int hi = nums.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) /2;
            if (nums[mid] == target) return new int[]{mid, mid};
            else if (target > nums[mid]) lo = mid + 1 ;
            else hi = mid - 1;
        }
        return new int[]{lo, hi};
    }

    public static void main(String[] args) {
        Binary_Search_704 test = new Binary_Search_704();
        int[] nums = new int[]{1, 2, 4, 5};
        int[] res = test.search1(nums, 3);
        System.out.println("lo=" + res[0] + ",hi=" + res[1]);
    }
}
