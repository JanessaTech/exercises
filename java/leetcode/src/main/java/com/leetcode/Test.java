package com.leetcode;

import java.util.*;
import java.util.stream.Collectors;

public class Test {

    public boolean isPalindrome(String s) {
        int lo = 0;
        int hi = s.length() - 1;

        while (lo < hi) {
            char l = s.charAt(lo);
            char r = s.charAt(hi);
            if (!isAlphanumeric(l)) {
                lo++;
                continue;
            }
            if (!isAlphanumeric(r)) {
                hi--;
                continue;
            }
            if(isNumeric(l) && isNumeric(r) && l - r == 0) {
                lo++;
                hi--;
            } else if (isAlpha(l) && isAlpha(r) && Math.abs(l - r) == 0) {
                lo++;
                hi--;
            } else {
                return false;
            }
        }
        return true;

    }

    private boolean isAlphanumeric(char ch) {
        if (isAlpha(ch) || isNumeric(ch)) return true;
        return false;
    }

    private boolean isAlpha(char ch) {
        if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) return true;
        return false;
    }

    private boolean isNumeric(char ch) {
        if (ch >= '0' && ch <= '9') return true;
        return false;
    }


    public static void main(String[] args) {
        Test test = new Test();
        String s = "0P";
        boolean res = test.isPalindrome(s);
        System.out.println(res);

    }
}
