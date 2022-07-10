package com.leetcode.graph;

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
public class CopyListWithRandomPointer_138 {
    public Node copyRandomList(Node head) {
        Map<Node, Node> map = new HashMap<>();
        //return nonCursive(head, map);
        return dfs(head, map);
    }

    private Node nonCursive(Node head,  Map<Node, Node> map) {
        Node cur = head;
        Node tmp = head;
        while (cur != null) {
            Node copy = new Node(cur.val);
            map.put(cur,copy);
            cur = cur.next;
        }
        cur = tmp;
        while (cur != null) {
            map.get(cur).next = map.get(cur.next);
            map.get(cur).random = map.get(cur.random);
            cur = cur.next;
        }
        return map.get(tmp);
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
}
