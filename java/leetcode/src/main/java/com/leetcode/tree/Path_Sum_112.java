package com.leetcode.tree;

public class Path_Sum_112 {
    boolean found = false;
    public boolean hasPathSum(TreeNode root, int targetSum) {
        dfs(root, targetSum);
        return found;
    }

    void dfs(TreeNode node, int left) {
        if (node == null) return;
        if (isLeaf(node)) {
            if (node.val == left) found = true;
        } else {
            dfs(node.left, left - node.val);
            if (!found) {
                dfs(node.right, left - node.val);
            }
        }
    }

    boolean isLeaf(TreeNode node) {
        return node.left == null && node.right == null;
    }
}
