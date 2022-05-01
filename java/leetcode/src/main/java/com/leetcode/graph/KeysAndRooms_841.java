package com.leetcode.graph;

import java.util.ArrayList;
import java.util.List;

public class KeysAndRooms_841 {
    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        List<Integer> visited = new ArrayList<>();
        visited.add(0);
        dfs(0, rooms, visited);
        return visited.size() == rooms.size();
    }

    private void dfs(int cur, List<List<Integer>> rooms, List<Integer> visited) {
        List<Integer> keys = rooms.get(cur);
        if(keys.isEmpty()) return;
        for(int k : keys) {
            if(!visited.contains(k)) {
                visited.add(k);
                dfs(k, rooms, visited);
            }
        }
    }
}
