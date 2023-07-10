package com.leetcode.BFS_DFS;

import java.util.ArrayList;
import java.util.List;

public class Combinations_77 {
    List<List<Integer>> res = new ArrayList<>();

    public List<List<Integer>> combine(int n, int k) {
        List<Integer> path = new ArrayList<>();
        dfs(n, 0, 1, k, path);
        return res;
    }
    void dfs(int n, int level, int start, int k, List<Integer> path) {
        if (level == k) {
            res.add(new ArrayList<>(path));
        } else {
            for(int i = start; i <= n; i++) {
                path.add(i);
                dfs(n, level + 1, i + 1, k, path);
                path.remove(path.size() - 1);
            }
        }
    }
}
