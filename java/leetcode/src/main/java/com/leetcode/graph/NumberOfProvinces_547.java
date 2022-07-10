package com.leetcode.graph;

public class NumberOfProvinces_547 {
    public int findCircleNum(int[][] isConnected) {
        boolean[] visited = new boolean[isConnected.length];

        int group = 0;

        for (int i = 0; i < isConnected.length; i++) {
            if (!visited[i]) {
                dfs(i, isConnected, visited);
                group++;

            }
        }
        return group;
    }

    private void dfs(int city, int[][] isConnected, boolean[] visited) {
        visited[city] = true;
        for (int j = 0; j < isConnected.length; j++) {
            if (!visited[j] && isConnected[city][j] == 1 && city != j)
                dfs(j, isConnected, visited);
        }
    }
}
