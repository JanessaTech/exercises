package com.leetcode.graph;

public class IsGraphBipartite_785 {
    private boolean isBipartite = true;

    private int nextColor(int color) {
        if (color == 2) return 1;
        return 2;
    }

    public boolean isBipartite(int[][] graph) {
        return dfs_solution(graph);
    }

    private boolean dfs_solution(int[][] graph) {
        int n = graph.length;
        int[] visited = new int[n];

        for(int i = 0; i < n; i++) {
            if (visited[i] == 0) {
                dfs(graph, i, 1, visited);
            }
            if (!isBipartite) return isBipartite;
        }

        return isBipartite;
    }

    private void dfs(int[][] graph, int s, int color, int[] visited) {
        visited[s]  = color;
        int nextColor = nextColor(color);
        for (int v : graph[s]) {

            if (!isBipartite) return;

            if (visited[v] == 0) {
                dfs(graph, v, nextColor, visited);
            } else {
                if (color == visited[v]) {
                    isBipartite = false;
                }
            }
        }
    }
}
