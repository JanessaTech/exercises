package com.leetcode.BFS_DFS;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Subsets_II_90 {
    List<List<Integer>> sets = new ArrayList<>();

    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        sets.add(new ArrayList());
        List<Integer> set = new ArrayList<>();
        dfs(nums, 0, set);
        return sets;
    }
    void dfs(int[] nums, int start, List<Integer> set) {
        for (int i = start; i < nums.length; i++) {
            if (i != start && nums[i-1] == nums[i]) continue;
            set.add(nums[i]);
            sets.add(new ArrayList<>(set));
            dfs(nums, i + 1, set);
            set.remove(set.size() - 1);
        }

    }

    public  static void main(String[] args) {
        int[] nums = new int[]{1, 2, 2};
        Subsets_II_90 test = new Subsets_II_90();
        List<List<Integer>> res = test.subsetsWithDup(nums);

        for (List<Integer> l : res) {
            System.out.println(l.toString());
        }
    }
}
