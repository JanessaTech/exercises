package com.leetcode.TwoPointers;

public class Reverse_Only_Letters {
    public String reverseOnlyLetters(String s) {
        char[] res = new char[s.length()];

        int i = 0;
        int j = s.length() - 1;
        while (i <= j) {
            char a= s.charAt(i);
            char b = s.charAt(j);
            if (!Character.isLetter(a)) {
                res[i] = a;
                i++;
                continue;
            }
            if(!Character.isLetter(b)) {
                res[j] = b;
                j--;
                continue;
            }
            res[i] = b;
            res[j] = a;
            i++;
            j--;
        }
        return new String(res);
    }

    public static void main(String[] args) {
        String s= "a-bC-dEf-ghIj";
        Reverse_Only_Letters test = new Reverse_Only_Letters();
        String res = test.reverseOnlyLetters(s);
        System.out.println(res);
    }
}
