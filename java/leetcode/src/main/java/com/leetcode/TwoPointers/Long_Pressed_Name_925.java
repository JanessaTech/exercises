package com.leetcode.TwoPointers;

public class Long_Pressed_Name_925 {
    public boolean isLongPressedName(String name, String typed) {
        char pre = ' ';
        int i = 0;
        int j = 0;
        for (; j < typed.length() && i < name.length();) {
            char a = name.charAt(i);
            char b = typed.charAt(j);
            if (i == 0) {
                if (a != b) return false;
                else {
                    i++;
                    j++;
                    pre = a;
                }
            } else {
                if (a == b) {
                    i++;
                    j++;
                    pre = a;
                } else {
                    if(b == pre) {
                        j++;
                    }else {
                        return false;
                    }
                }
            }
        }

        for (; j < typed.length();) {
            char b = typed.charAt(j);
            if (b == pre) j++;
            else return false;
        }

        return i == name.length() && j == typed.length();

    }

    public static void main(String[] agrs) {
        Long_Pressed_Name_925 test = new Long_Pressed_Name_925();
        String name = "vtkgn";
        String typed = "vttkgnn";

        boolean res = test.isLongPressedName(name, typed);
        System.out.println(res);
    }
}
