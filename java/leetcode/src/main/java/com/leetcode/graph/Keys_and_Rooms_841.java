package com.leetcode.graph;

import java.util.List;

public class Keys_and_Rooms_841 {
    public boolean canVisitAllRooms(List<List<Integer>> rooms) {
        int n = rooms.size();
        boolean[] visited = new boolean[n];
        dfs(rooms, 0, visited);
        for (boolean v : visited) {
            if(!v) return false;
        }
        return true;
    }

    void dfs(List<List<Integer>> rooms, int i, boolean[] visited) {
        if (visited[i]) return;
        visited[i] = true;
        List<Integer> keys = rooms.get(i);

        for(Integer key : keys) {
            dfs(rooms, key, visited);
        }

    }
}
