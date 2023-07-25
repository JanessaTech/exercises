package com.leetcode.tree;

import java.sql.SQLSyntaxErrorException;
import java.util.*;

public class Vertical_Order_Traversal_of_Binary_Tree_987 {
    class Node {
        int val;
        int row;
        int col;
        Node(int val, int row, int col) {
            this.val = val;
            this.row = row;
            this.col = col;
        }
    }

    public List<List<Integer>> verticalTraversal(TreeNode root) {
        Map<Integer,List<Node>> map = new TreeMap<>();
        List<List<Integer>> res = new ArrayList<>();
        dfs(root, map, 0, 0);
        for(Integer key : map.keySet()) {
            Collections.sort(map.get(key), (a, b) -> {
                if (a.row != b.row) {
                    return a.row - b.row;
                }else {
                    return a.val - b.val;
                }
            });
            List<Integer> list = new ArrayList<>();
            for (Node n : map.get(key)) {
                list.add(n.val);
            }
            res.add(list);
        }
        return res;
    }

    void dfs(TreeNode node, Map<Integer,List<Node>> map, int row, int col) {
        if (node == null) return;
        if (!map.containsKey(col)) {
            map.put(col, new ArrayList<Node>());
        }
        map.get(col).add(new Node(node.val, row, col));
        dfs(node.left, map, row + 1, col - 1);
        dfs(node.right, map, row + 1, col + 1);
    }

    public static void main(String[] args) {
        Vertical_Order_Traversal_of_Binary_Tree_987 test = new Vertical_Order_Traversal_of_Binary_Tree_987();
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(6);
        root.right.left = new TreeNode(5);
        root.right.right = new TreeNode(7);

        List<List<Integer>> res = test.verticalTraversal(root);
        for(List<Integer> l : res) {
            System.out.println(l);
        }

    }
}
