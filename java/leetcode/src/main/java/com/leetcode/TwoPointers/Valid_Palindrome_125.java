package com.leetcode.TwoPointers;

public class Valid_Palindrome_125 {
    public boolean isPalindrome(String s) {
        for (int i = 0, j = s.length() - 1; i < j; ) {
            char a = s.charAt(i);
            char b = s.charAt(j);
            if (!Character.isLetterOrDigit(a)) {
                i++;
                continue;
            }
            if(Character.isLetterOrDigit(b)) {
                j--;
                continue;
            }
            if(Character.toLowerCase(a) != Character.toLowerCase(b)) {
                return false;
            } else {
                i++;
                j--;
            }
        }
        return true;
    }

    public static void main(String[] args) {
        Valid_Palindrome_125 test = new Valid_Palindrome_125();
        String str = "A man, a plan, a canal: Panama";
        boolean res = test.isPalindrome(str);
        System.out.println(res);

        char a = '.';
        System.out.println(Character.isLetter(a));
        System.out.println(Character.isAlphabetic(a));

    }
}
