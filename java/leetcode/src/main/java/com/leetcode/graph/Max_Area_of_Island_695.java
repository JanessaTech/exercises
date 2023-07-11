package com.leetcode.graph;

public class Max_Area_of_Island_695 {
    int m = 0;
    int n = 0;
    int area = 0;
    int[][] dirs = new int[][]{{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    public int maxAreaOfIsland(int[][] grid) {
        m = grid.length;
        n = grid[0].length;
        boolean[][] visited = new boolean[m][n];
        int max = 0;
        for (int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(!visited[i][j] && grid[i][j] == 1) {
                    dfs(grid, i, j, visited);
                    if (area > max) {
                        max = area;
                    }
                    area = 0;
                }
            }
        }
        return max;

    }

    void dfs(int[][] grid, int i, int j, boolean[][] visited) {
        visited[i][j] = true;
        area++;
        for(int d = 0; d <4; d++) {
            int[] dir = dirs[d];
            int row = i + dir[0];
            int col = j + dir[1];
            if (row >= 0 && row < m && col >= 0 && col < n && !visited[row][col] && grid[row][col] == 1) {
                dfs(grid, row, col, visited);
            }
        }

    }
}
