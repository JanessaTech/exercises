package com.example.composite;

import java.util.List;

public interface Node {
    String getName();
    List<Node> getChildren();
    void addChild(Node node);
    void removeChild(int i);
}
