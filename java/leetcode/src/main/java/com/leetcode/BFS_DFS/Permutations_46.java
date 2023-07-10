package com.leetcode.BFS_DFS;

import java.util.ArrayList;
import java.util.List;

public class Permutations_46 {
    List<List<Integer>> res = new ArrayList<>();

    public List<List<Integer>> permute(int[] nums) {
        List<Integer> path = new ArrayList<>();
        boolean[] visited = new boolean[nums.length];
        dfs(nums, 0, visited, path);
        return res;
    }

    void dfs(int[] nums, int level, boolean[] visited, List<Integer> path) {
        if (level == nums.length) {
            res.add(new ArrayList<Integer>(path));
        } else {
            for (int i = 0; i < nums.length; i++) {
                if (!visited[i]) {
                    path.add(nums[i]);
                    visited[i] = true;
                    dfs(nums, level + 1, visited, path);
                    visited[i] = false;
                    path.remove(path.size() - 1);
                }
            }
        }

    }
}
