package com.leetcode.BST;

public class Recover_Binary_Search_Tree_99 {
    TreeNode first = null;
    TreeNode second = null;
    TreeNode pre = null;
    public void recoverTree(TreeNode root) {
        dfs(root);
        swap(first, second);


    }
    void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.left);
        if (first == null && pre != null && pre.val >= node.val) {
            first = pre;
        }
        if (first != null && pre.val >= node.val) {
            second = node;
        }
        pre = node;
        dfs(node.right);
    }

    void swap(TreeNode first, TreeNode second) {
        int tmp = first.val;
        first.val = second.val;
        second.val = tmp;
    }
}
