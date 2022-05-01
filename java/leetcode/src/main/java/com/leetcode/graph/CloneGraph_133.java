package com.leetcode.graph;

import java.util.*;

public class CloneGraph_133 {
    class Node {
        public int val;
        public List<Node> neighbors;
        public Node() {
            val = 0;
            neighbors = new ArrayList<Node>();
        }
        public Node(int _val) {
            val = _val;
            neighbors = new ArrayList<Node>();
        }
        public Node(int _val, ArrayList<Node> _neighbors) {
            val = _val;
            neighbors = _neighbors;
        }
    }

    public Node cloneGraph(Node node) {
        Map<Integer,Node> visited = new HashMap<Integer,Node>();
        //Node copy = dfs(node, visited);
        Node copy = bfs(node, visited);
        return copy;
    }

    private Node dfs(Node node, Map<Integer,Node> visited) {
        if (node == null) return null;
        visited.put(node.val, new Node(node.val));
        for(Node n: node.neighbors) {
            Node n_copy = null;
            if(!visited.containsKey(n.val)) {
                n_copy = dfs(n, visited);
            } else {
                n_copy = visited.get(n.val);
            }

            visited.get(node.val).neighbors.add(n_copy);
        }
        return visited.get(node.val);
    }

    private Node bfs(Node node, Map<Integer,Node> visited) {
        if (node == null) return null;
        Queue<Node> queue = new LinkedList<Node>();
        visited.put(node.val, new Node(node.val));
        queue.offer(node);
        while(!queue.isEmpty()) {
            Node cur = queue.poll();
            for(Node n : cur.neighbors) {
                if (!visited.containsKey(n.val)) {
                    visited.put(n.val, new Node(n.val));
                    queue.offer(n);
                }
                Node n_copy = visited.get(n.val);
                visited.get(cur.val).neighbors.add(n_copy);
            }
        }
        return visited.get(node.val);
    }
}
