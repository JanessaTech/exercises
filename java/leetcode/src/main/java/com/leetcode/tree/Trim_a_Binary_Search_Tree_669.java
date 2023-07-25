package com.leetcode.tree;

public class Trim_a_Binary_Search_Tree_669 {
    public TreeNode trimBST(TreeNode root, int low, int high) {
        if (root == null) return null;
        TreeNode left = trimBST(root.left, low, high);
        TreeNode right = trimBST(root.right, low, high);
        if (!inRange(root.val, low, high)) {
            if (left == null && right == null) return null;
            else if (left != null && right == null) return left;
            else if(left == null && right != null) return right;
            else {
                // nothing
            }
        }
        root.left = left;
        root.right = right;
        return root;
    }

    boolean inRange(int val, int low, int high) {
        return val >= low && val <= high;
    }
}
