package com.leetcode.BFS_DFS;

import java.util.ArrayList;
import java.util.List;

public class Generate_Parentheses_22 {
    List<String> res = new ArrayList<>();

    public List<String> generateParenthesis(int n) {
        List<Character> path = new ArrayList<>();
        dfs(0, n, n, n, 0, path);
        return res;
    }

    String toString(List<Character> path) {
        StringBuilder sb = new StringBuilder();
        for (Character ch : path) {
            sb.append(ch);
        }
        return sb.toString();
    }

    void dfs(int level, int n, int usedLeft, int usedRight, int blance, List<Character> path) {
        if (level == 2 * n) {
            String str = toString(path);
            res.add(str);
        } else {
            if (blance == 0) {
                path.add('(');
                blance++;
                usedLeft--;
                dfs(level + 1, n, usedLeft, usedRight, blance, path);
                usedLeft--;
                blance--;
                path.remove(path.size() - 1);
            } else {
                if (usedLeft > 0) {
                    path.add('(');
                    blance++;
                    usedLeft--;
                    dfs(level + 1, n, usedLeft, usedRight, blance, path);
                    usedLeft++;
                    blance--;
                    path.remove(path.size() - 1);
                }

                if (usedRight > 0) {
                    path.add(')');
                    blance--;
                    usedRight--;
                    dfs(level + 1, n, usedLeft, usedRight, blance, path);
                    usedRight++;
                    blance++;
                    path.remove(path.size() - 1);
                }
            }
        }
    }
}
