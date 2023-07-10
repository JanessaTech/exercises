package com.leetcode.Binary_Search;

public class Find_First_and_Last_Position_34 {
    public int[] searchRange(int[] nums, int target) {
        int pos = search(nums, target);
        if (pos == -1) return new int[]{-1, -1};
        else {
            return findRange(pos, nums);
        }
    }

    int[] findRange(int pos, int[] nums) {
        int start = pos, end = pos;
        for (int i = pos; i >= 0; i--) {
            if (nums[i] == nums[pos]) {
                start = i;
            } else {
                break;
            }
        }

        for (int i = pos; i < nums.length; i++) {
            if (nums[i] == nums[pos]) {
                end = i;
            } else {
                break;
            }
        }
        return new int[]{start, end};
    }

    int search(int[] nums, int target) {
        int lo = 0;
        int hi = nums.length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) /2;
            if (nums[mid] == target) return mid;
            else if (target < nums[mid]) hi = mid - 1;
            else lo = mid + 1;
        }
        return -1;
    }
}
