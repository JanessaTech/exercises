package com.leetcode.graph;

public class Flood_Fill_733 {
    int[][] dirs = new int[][]{{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        int m = image.length;
        int n = image[0].length;
        boolean[][] visited = new boolean[m][n];
        dfs(image, sr, sc, image[sr][sc], color, visited);
        return image;
    }

    void dfs(int[][] image, int i, int j, int num, int color, boolean[][] visited) {
        if(visited[i][j]) return;
        visited[i][j] = true;
        image[i][j] = color;
        for (int d = 0; d < 4; d++) {
            int[] dir = dirs[d];
            int row = dir[0] + i;
            int col = dir[1] + j;
            if (row >= 0 && row < image.length && col >= 0 && col < image[0].length && !visited[row][col] && image[row][col] == num) {
                dfs(image, row, col, num, color, visited);
            }
        }
    }
}
