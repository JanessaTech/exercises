package com.leetcode.tree;

public class Symmetric_Tree_101 {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isSymmetric(root.left, root.right);
    }

    boolean isSymmetric(TreeNode p, TreeNode q) {
        if (q == null && p == null) return true;
        if ((p == null && q != null) || (p != null && q == null)) return false;
        if (p.val != q.val) return false;
        return isSymmetric(p.left, q.right) && isSymmetric(p.right, q.left);
    }
}
