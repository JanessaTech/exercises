package com.leetcode.BFS_DFS;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Permutations_II_47 {
    List<List<Integer>> permutations = new ArrayList<>();
    public List<List<Integer>> permuteUnique(int[] nums) {
        Arrays.sort(nums);
        boolean[] visited = new boolean[nums.length];
        List<Integer> p = new ArrayList<>();
        dfs(nums, 0, visited, p);
        return permutations;
    }
    void dfs(int[] nums, int level, boolean[] visited,List<Integer> p) {
        if (level == nums.length) {
            permutations.add(new ArrayList<>(p));
        }else {
            int pre = -1;
            for(int i = 0; i < nums.length; i++) {
                //if (pre != -1 && nums[i] == nums[i - 1]) continue;
                pre = i;
                if(!visited[i]) {
                    p.add(nums[i]);
                    visited[i] = true;
                    dfs(nums, level + 1, visited, p);
                    visited[i] = false;
                    p.remove(p.size() - 1);

                }
            }
        }

    }

    public static void main(String[] args) {
        Permutations_II_47 test = new Permutations_II_47();
        int[] nums = new int[]{1,1,2};
        List<List<Integer>> res = test.permuteUnique(nums);
        for(List<Integer> l : res) {
            System.out.println(l);
        }
    }
}
