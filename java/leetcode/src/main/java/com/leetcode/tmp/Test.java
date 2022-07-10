package com.leetcode.tmp;

import java.util.HashMap;
import java.util.Map;

class Node {
    int val;
    Node next;
    Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}

public class Test {

    public Node copyRandomList(Node head) {
        Map<Node, Node> visited = new HashMap<>();
        return dfs(head, visited);
    }

    private Node dfs(Node node,  Map<Node, Node> visited) {
        if (node == null) return null;
        if (visited.containsKey(node)) return visited.get(node);
        Node copy = new Node(node.val);
        visited.put(node, copy);
        copy.next = dfs(node.next, visited);
        copy.random = dfs(node.random, visited);
        return copy;
    }

    private static Node getList() {
        Node head = new Node(1);
        Node node1 = new Node(2);
        head.next = node1;
        head.random = node1;
        node1.next = null;
        node1.random = node1;
        return head;
    }
    public static void main(String[] args) {
        int[][] dirs = {{1, 0},{-1, 0},{0, 1},{0, -1}};
        for (int[] dir : dirs) {
            System.out.println(dir[0] + "," + dir[1]);
        }
    }
}
