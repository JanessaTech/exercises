package com.leetcode.BFS_DFS;

import java.util.ArrayList;
import java.util.List;

public class Letter_Case_Permutation_784 {
    List<String> res = new ArrayList();

    public List<String> letterCasePermutation(String s) {
        List<Character> path = new ArrayList<>();
        dfs(s, 0, path);
        return res;
    }

    String toString(List<Character> path) {
        StringBuilder sb = new StringBuilder();
        for(Character ch : path) {
            sb.append(ch);
        }
        return sb.toString();
    }

    void dfs(String s, int level, List<Character> path) {
        if (level == s.length()) {
            String str = toString(path);
            res.add(str);
        } else {
            char ch = s.charAt(level);
            if(Character.isLetter(ch)) {
                path.add(Character.toUpperCase(ch));
                dfs(s, level + 1, path);
                path.remove(path.size() - 1);

                path.add(Character.toLowerCase(ch));
                dfs(s, level + 1, path);
                path.remove(path.size() - 1);
            } else {
                path.add(ch);
                dfs(s, level + 1, path);
                path.remove(path.size() - 1);
            }
        }
    }
}
