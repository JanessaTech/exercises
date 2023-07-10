package com.leetcode.BFS_DFS;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Combination_Sum_II_40 {
    List<List<Integer>> res = new ArrayList<>();

    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<Integer> path = new ArrayList<>();
        Arrays.sort(candidates);
        dfs(candidates, 0, target, 0, path);
        return res;
    }

    void dfs(int[] candidates, int start, int target, int sum, List<Integer> path) {
        if (sum == target) {
            res.add(new ArrayList<>(path));
        } else {
            for (int i = start; i < candidates.length; i++) {
                if ( i != start && candidates[i-1] == candidates[i]) continue;
                if (candidates[i] + sum > target) continue;
                path.add(candidates[i]);
                dfs(candidates, i + 1, target, sum + candidates[i], path);
                path.remove(path.size() - 1);
            }
        }
    }

    public static void main(String[] args) {
        Combination_Sum_II_40 test = new Combination_Sum_II_40();

        int[] candidates = new int[]{10,1,2,7,6,1,5};
        List<List<Integer>> res = test.combinationSum2(candidates, 8);

        for (List<Integer> l : res) {
            System.out.println(l.toString());
        }

    }
}
