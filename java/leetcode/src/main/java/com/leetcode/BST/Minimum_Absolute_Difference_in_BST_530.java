package com.leetcode.BST;

public class Minimum_Absolute_Difference_in_BST_530 {
    int min = Integer.MAX_VALUE;
    TreeNode pre = null;
    public int getMinimumDifference(TreeNode root) {
        dfs(root);
        return min;
    }

    void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.left);
        if (pre != null) {
            int diff = Math.abs(node.val - pre.val);
            if (diff < min) min = diff;
        }
        pre = node;
        dfs(node.right);
    }
}
