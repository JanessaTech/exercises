package com.leetcode.BFS_DFS;

import java.util.ArrayList;
import java.util.List;

public class Unique_combinations {
    static List<List<Integer>> res = new ArrayList<>();

    public static List<List<Integer>> compute(int[] nums) {
        List<Integer> path = new ArrayList<>();
        dfs(nums, 0, 0, path);
        return res;
    }

    static void dfs(int[] nums, int start, int level, List<Integer> path) {
        if (level == 2) {
            res.add(new ArrayList<>(path));
        } else {
            for (int i = start; i < nums.length; i++) {
                path.add(nums[i]);
                dfs(nums, i + 1, level + 1, path);
                path.remove(path.size() - 1);
            }
        }
    }

    public static void main(String[] args) {
        int[] nums = new int[]{1, 2, 3, 4};
        List<List<Integer>> res = compute(nums);
        for (List<Integer> l : res) {
            System.out.println(l.toString());
        }

    }
}
