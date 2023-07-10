package com.leetcode.Binary_Search;

public class Koko_Eating_Bananas_875 {
    public int minEatingSpeed(int[] piles, int h) {
        int lo = 1;
        int hi = 1000000000;

        while ( lo < hi) {
            int mid = (lo + hi)/2;
            if (!isPossible(piles, h, mid)) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return hi;

    }

    private boolean isPossible(int[] piles, int h, int v) {
        int ans = 0;
        for (int i = 0; i < piles.length; i++) {
            ans += piles[i] % v == 0 ? piles[i] / v : piles[i] / v + 1;
        }
        if (ans > h) return false;
        return true;
    }
}
