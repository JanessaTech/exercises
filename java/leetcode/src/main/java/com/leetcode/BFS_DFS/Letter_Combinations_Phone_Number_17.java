package com.leetcode.BFS_DFS;

import java.util.*;

public class Letter_Combinations_Phone_Number_17 {
    private Map<Character, List<Character>> map = new HashMap<>();
    private List<String> res = new ArrayList<>();
    private void initMap() {
        map.put('2', Arrays.asList('a', 'b','c'));
        map.put('3', Arrays.asList('d', 'e','f'));
        map.put('4', Arrays.asList('g', 'h','i'));
        map.put('5', Arrays.asList('j', 'k','l'));
        map.put('6', Arrays.asList('m', 'n','o'));
        map.put('7', Arrays.asList('p', 'q','r', 's'));
        map.put('8', Arrays.asList('t', 'u','v'));
        map.put('9', Arrays.asList('w', 'x','y', 'z'));
    }
    public List<String> letterCombinations(String digits) {
        initMap();
        List<Character> path = new ArrayList<>();
        dfs(digits, 0, path);
        return res;

    }

    void dfs(String digits, int level, List<Character> path) {
        if (level == digits.length()) {
            if (path.size() > 0) {
                String str = toString(path);
                res.add(str);
            }

        } else {
            char key = digits.charAt(level);
            List<Character> list = map.get(key);
            for (Character ch : list) {
                path.add(ch);
                dfs(digits, level + 1, path);
                path.remove(path.size() - 1);
            }
        }
    }

    private String toString(List<Character> path) {
        StringBuilder sb = new StringBuilder();
        for (Character ch : path) {
            sb.append(ch);
        }
        return sb.toString();
    }
}
