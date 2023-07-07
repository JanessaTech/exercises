package com.leetcode.tree;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class BinaryTreePostorderTraversal_145 {
    public List<Integer> postorderTraversal(TreeNode root) {
        //List<Integer> res = solution1(root);
        List<Integer> res = solution2(root);
        return res;
    }

    List<Integer> solution1(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        dfs(root, res);
        return res;
    }
    void dfs(TreeNode node, List<Integer> res) {
        if (node != null) {
            dfs(node.left, res);
            dfs(node.right, res);
            res.add(node.val);
        }
    }

    List<Integer> solution2(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<TreeNode> s1 = new Stack<>();
        Stack<TreeNode> s2 = new Stack<>();
        if (root != null) {
            s1.push(root);
        }
        TreeNode node;
        while(!s1.isEmpty()) {
            node = s1.pop();
            s2.push(node);
            if (node.left != null) {
                s1.push(node.left);
            }
            if (node.right != null) {
                s1.push(node.right);
            }
        }
        while (!s2.isEmpty()) {
            node = s2.pop();
            res.add(node.val);
        }
        return res;
    }
}
