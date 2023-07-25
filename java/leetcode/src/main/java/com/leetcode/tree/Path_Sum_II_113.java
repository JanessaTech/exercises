package com.leetcode.tree;

import java.util.ArrayList;
import java.util.List;

public class Path_Sum_II_113 {
    List<List<Integer>> res = new ArrayList<>();
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<Integer> path = new ArrayList<>();
        dfs(root, targetSum, path);
        return res;

    }

    void dfs(TreeNode node, int left, List<Integer> path) {
        if (node == null) return;
        path.add(node.val);
        if (isLeaf(node) && node.val == left) {
            res.add(new ArrayList<Integer>(path));
        } else {
            dfs(node.left, left - node.val, path);
            dfs(node.right, left - node.val, path);
        }
        path.remove(path.size() - 1);

    }

    boolean isLeaf(TreeNode node) {
        return node.left == null && node.right == null;
    }
}
