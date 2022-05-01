package com.leetcode.graph;

public class NumberOfIslands_200 {
    private int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    private int m = 0;
    private int n = 0;
    private boolean[][] visited = null;

    public int numIslands(char[][] grid) {
        m = grid.length;
        n = grid[0].length;
        visited= new boolean[m][n];

        int cnt = 0;

        for(int i = 0; i < m; i++) {
            for(int j = 0;j < n; j++) {
                if(grid[i][j] == '1' && !visited[i][j]) {
                    dfs(i, j, grid, visited);
                    cnt++;
                }
            }
        }

        return cnt;

    }

    private void dfs(int i, int j, char[][] grid, boolean[][] visited) {
        if (i < 0 || i >= m || j <0 || j >= n || grid[i][j] == '0' || visited[i][j]) return;
        visited[i][j] = true;
        for(int[] d : dirs)
            dfs(i + d[0], j + d[1], grid, visited);
    }
}
