package com.leetcode.tree;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class BinaryTreeInorderTraversal {
    public List<Integer> inorderTraversal(TreeNode root) {

        //List<Integer> res = solution1(root);
        List<Integer> res = solution2(root);
        return res;
    }

    List<Integer> solution1(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root != null) {
            dfs(root, res);
        }
        return res;
    }

    void dfs(TreeNode node, List<Integer> res) {
        if (node != null) {
            dfs(node.left, res);
            res.add(node.val);
            dfs(node.right, res);
        }
    }

    List<Integer> solution2(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode cur = root;

        while (cur != null) {
            stack.push(cur);
            cur = cur.left;
        }

        while (!stack.isEmpty()) {
            cur = stack.pop();
            res.add(cur.val);
            if (cur.right != null) {
                cur = cur.right;
                while (cur != null) {
                    stack.push(cur);
                    cur = cur.left;
                }
            }
        }
        return res;
    }


}
