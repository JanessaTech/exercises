package com.leetcode.tree;

public class Binary_Tree_Pruning_814 {
    public TreeNode pruneTree(TreeNode root) {
        if (root == null) return null;
        root.left = pruneTree(root.left);
        root.right = pruneTree(root.right);
        if (root.left == null && root.right == null & root.val == 0) return null;
        return root;
    }
}
