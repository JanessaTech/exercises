package com.leetcode.TwoPointers;

import java.util.Arrays;

public class Assign_Cookies_455 {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(s);
        Arrays.sort(g);
        int j = 0;
        for (int i = 0; i < s.length && j < g.length; i++) {
            if (s[i] >= g[j]) j++;
        }
        return j;
    }
}
