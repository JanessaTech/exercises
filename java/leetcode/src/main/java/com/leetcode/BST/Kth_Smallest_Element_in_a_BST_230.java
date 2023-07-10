package com.leetcode.BST;

public class Kth_Smallest_Element_in_a_BST_230 {
    boolean found = false;
    int target = 0;
    int _k = 0;
    int cnt = 0;
    public int kthSmallest(TreeNode root, int k) {
        _k = k;
        dfs(root);
        return target;
    }

    void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.left);
        cnt++;
        if (cnt == _k) {
            found = true;
            target = node.val;
        }
        if (found) return;
        dfs(node.right);
    }
}
