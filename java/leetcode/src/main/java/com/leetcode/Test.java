package com.leetcode;

import java.util.*;
import java.util.stream.Collectors;

public class Test {

    public int shipWithinDays(int[] weights, int days) {
        int lo = 1;
        int hi = 500 * weights.length;

        while ( lo < hi) {
            int mid = (lo + hi)/2;
            if (isPossible(weights, days, mid)) hi = mid;
            else lo = mid + 1;
        }

        return lo;
    }

    private boolean isPossible(int[] weights, int days, int w) {
        int d = 0;
        int left = w;
        for (int i = 0; i < weights.length; ) {
            int weight = weights[i];
            if (weight > w) return false;
            if (weight > left) {
                d++;
                left = w;
            } else {
                left -= weight;
                i++;
            }
        }

        d++;
        if (d > days) return false;
        return true;

    }

    public static void main(String[] args) {
        List<Integer> list = new ArrayList<Integer>() {{add(1); add(2);}};
        List<Integer> list2 = Arrays.asList(1, 2, 3);
    }
}
