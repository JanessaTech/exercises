package com.leetcode.divide_and_conquer;

public class Find_Minimum_in_Rotated_Sorted_Array_153 {
    public int findMin(int[] nums) {
        int lo = 0;
        int hi = nums.length - 1;
        if (nums[lo] <= nums[hi]) return nums[lo];
        while (lo < hi) {
            if(nums[lo] <= nums[hi]) return nums[lo];
            int mid = (lo + hi) /2;
            if (nums[mid] >= nums[lo]) {
                lo = mid + 1;
            }else {
                hi = mid;
            }
        }
        return nums[lo];
    }

    public static void main(String[] args) {
        Find_Minimum_in_Rotated_Sorted_Array_153 test = new Find_Minimum_in_Rotated_Sorted_Array_153();
        int[] nums = new int[]{11,13,15,17};
        int res = test.findMin(nums);
        System.out.println(res);
    }
}
