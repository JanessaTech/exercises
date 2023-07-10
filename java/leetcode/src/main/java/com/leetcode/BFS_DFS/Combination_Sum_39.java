package com.leetcode.BFS_DFS;

import java.util.ArrayList;
import java.util.List;

public class Combination_Sum_39 {
    List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<Integer> path = new ArrayList<>();
        dfs(candidates, 0, 0, target, path);
        return res;
    }

    void dfs(int[] candidates, int start, int sum, int target, List<Integer> path) {
        if (sum == target) {
            res.add(new ArrayList<Integer>(path));
        } else {
            for (int i = start; i < candidates.length; i++) {
                if(sum + candidates[i] > target) continue;
                path.add(candidates[i]);
                dfs(candidates, i, sum + candidates[i], target, path);
                path.remove(path.size() - 1);
            }
        }
    }
}
