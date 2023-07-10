package com.leetcode.BST;

public class Validate_Binary_Search_Tree_98 {

    TreeNode pre = null;
    boolean isValid = true;
    public boolean isValidBST(TreeNode root) {
        boolean isValid = solution1(root);
        //boolean isValid = solution2(root);
        return  isValid;
    }

    boolean solution2(TreeNode root) {
        dfs(root);
        return isValid;
    }

    void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.left);
        if (pre != null && node.val <= pre.val) {
            isValid = false;
        }
        pre = node;
        if (!isValid) return;
        dfs(node.right);
    }

    boolean solution1(TreeNode root) {
        boolean isValid = isValid(root, null, null);
        return isValid;
    }

    boolean isValid(TreeNode node, TreeNode max, TreeNode min) {
        if (node == null) return true;
        if (max != null && node.val >= max.val) return false;
        if (min != null && node.val <= min.val) return false;
        return isValid(node.left, node, min) && isValid(node.right, max, node);
    }
}
