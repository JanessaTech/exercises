package com.leetcode.graph;

public class NumberOfProvinces_547 {
    int n = 0;
    public int findCircleNum(int[][] isConnected) {
        n = isConnected.length;
        boolean[] visited = new boolean[n];
        int cnt = 0;
        for (int i = 0; i < n; i++) {
            if (!visited[i]) {
                dfs(isConnected, i, visited);
                cnt++;
            }
        }
        return cnt;
    }

    void dfs(int[][] isConnected, int i, boolean[] visited) {
        visited[i] = true;
        for (int j = 0; j < n; j++) {
            if (j != i && !visited[j] && isConnected[i][j] == 1) {
                dfs(isConnected, j, visited);
            }
        }
    }
}
