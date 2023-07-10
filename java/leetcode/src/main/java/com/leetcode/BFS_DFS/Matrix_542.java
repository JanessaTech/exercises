package com.leetcode.BFS_DFS;

import java.util.LinkedList;
import java.util.Queue;

public class Matrix_542 {
    public int[][] updateMatrix(int[][] mat) {
        int m = mat.length;
        int n = mat[0].length;
        int[][] res = new int[m][n];
        boolean[][] visited = new boolean[m][n];
        int[][] dirs = new int[][] {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        Queue<int[]> queue = new LinkedList<>();

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    visited[i][j] = true;
                    res[i][j] = 0;
                    queue.offer(new int[] {i, j});
                }
            }
        }

        int dis = 0;

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int s = 0; s < size; s++) {
                int[] cur = queue.poll();
                if (mat[cur[0]][cur[1]] == 1) {
                    res[cur[0]][cur[1]] = dis;
                }
                for (int d = 0; d < 4; d++) {
                    int nr = cur[0] + dirs[d][0];
                    int nc = cur[1] + dirs[d][1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                        visited[nr][nc] = true;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
            dis++;
        }

        return res;
    }
}
