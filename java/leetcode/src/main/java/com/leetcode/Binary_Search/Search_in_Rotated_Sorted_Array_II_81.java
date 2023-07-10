package com.leetcode.Binary_Search;

public class Search_in_Rotated_Sorted_Array_II_81 {
    public boolean search(int[] nums, int target) {
        int lo = 0;
        int hi = nums.length - 1;

        while (lo <= hi) {
            int mid = (lo + hi)/2;
            if (nums[mid] == target) return true;
            if (nums[mid] > nums[lo]) {
                if (target < nums[mid] && target >= nums[lo]) {
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            } else if (nums[mid] == nums[lo]) {
                if (target > nums[mid]) {
                    lo = lo + 1;
                } else { // target < nums[mid]
                    // case 1: nums[hi] ==  nums[lo]
                    // case 2: nums[hi] < nums[lo]

                    if (nums[hi] ==  nums[lo]) {
                        hi = hi - 1;
                    } else {
                        //  nums[hi] < nums[lo]
                        if (target > nums[hi]) {
                            return false;
                        } else if (target == nums[hi]) {
                            return true;
                        } else {
                            hi = hi - 1;
                        }
                    }
                }
            } else {
                if (target > nums[mid] && target <= nums[hi]) {
                    lo = mid + 1;
                } else {
                    hi = mid - 1;
                }
            }
        }

        return false;

    }
}
