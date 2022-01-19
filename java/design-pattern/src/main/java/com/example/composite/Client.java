package com.example.composite;

public class Client {
    private static void preOrder(Node node) {
        if (node instanceof NonLeaf) {
            System.out.println(node.getName());
            for (Node n : node.getChildren()) {
                preOrder(n);
            }
        } else {
            System.out.println(node.getName());
        }
    }
    public static void main(String[] args) {
        Node root = new NonLeaf("root");
        Node left = new Leaf("left children");
        Node right = new Leaf("right children");
        root.addChild(left);
        root.addChild(right);

        preOrder(root);
    }
}
