package com.leetcode.divide_and_conquer;

public class Majority_Element_169 {
    public static int majorityElement(int[] nums) {
        int cnt = 0, maxEle = 0;
        for (int n : nums) {
            if (cnt == 0) {
                cnt = 1;
                maxEle = n;
            } else {
                if (n == maxEle) {
                    cnt++;
                } else {
                    cnt--;
                }
            }
        }
        return maxEle;

    }

    public static void main(String[] args) {
        int[] nums = {2, 1, 2, 1, 2, 2, 5};
        int res = majorityElement(nums);
        System.out.println(res);
    }
}
