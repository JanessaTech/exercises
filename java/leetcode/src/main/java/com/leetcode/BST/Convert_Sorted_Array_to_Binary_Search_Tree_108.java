package com.leetcode.BST;

public class Convert_Sorted_Array_to_Binary_Search_Tree_108 {
    public TreeNode sortedArrayToBST(int[] nums) {
        TreeNode root = createBST(nums, 0, nums.length - 1);
        return root;
    }

    TreeNode createBST(int[] nums, int lo, int hi) {
        if (lo > hi) return null;
        int mid = (lo + hi) / 2;
        TreeNode node = new TreeNode(nums[mid]);
        node.left = createBST(nums, lo, mid - 1);
        node.right = createBST(nums, mid + 1, hi);
        return node;
    }
}
