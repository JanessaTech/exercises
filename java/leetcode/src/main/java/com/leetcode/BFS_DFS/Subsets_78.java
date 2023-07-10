package com.leetcode.BFS_DFS;

import java.util.ArrayList;
import java.util.List;

public class Subsets_78 {
    List<List<Integer>> sets = new ArrayList<>();
    public List<List<Integer>> subsets(int[] nums) {
        List<Integer> set = new ArrayList<>();
        sets.add(new ArrayList<>());
        dfs(nums, 0, set);


        return sets;
    }

    void dfs(int[] nums, int start, List<Integer> set) {
        for(int i = start; i < nums.length; i++) {
            set.add(nums[i]);
            sets.add(new ArrayList<>(set));
            dfs(nums, i + 1, set);
            set.remove(set.size() - 1);
        }
    }

    public  static void main(String[] args) {
        int[] nums = new int[]{1, 2};
        Subsets_78 test = new Subsets_78();
        List<List<Integer>> res = test.subsets(nums);

        for (List<Integer> l : res) {
            System.out.println(l.toString());
        }
    }
}
