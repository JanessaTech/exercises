package com.leetcode.Binary_Search;

// Pay attention to the Constraints
public class Sqrt_69 {
    public int mySqrt(int x) {
        int lo = 0;
        int hi = x;
        while ( lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            long res = (long) mid * mid;
            if (res == x) return mid;
            if (res < x) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return hi;
    }
}
