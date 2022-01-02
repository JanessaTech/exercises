package com.leetcode;

import java.util.*;
import java.util.stream.Collectors;

public class Test {
    int m = 0;
    int n = 0;
    boolean[][] visited = null;
    int[][] mat = null;
    int[][] dis = null;
    int[][] dirs = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    public int[][] updateMatrix(int[][] mat) {
        init(mat);

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                resetVisited();
                visited[i][j] = true;
                bfs(i, j);
            }
        }
        return dis;

    }

    private void bfs(int row, int col) {
        int distance = 0;
        Queue<int[]> queue = new LinkedList<int[]>();
        queue.offer(new int[]{row, col});
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int[] cur = queue.poll();
                if (mat[cur[0]][cur[1]] == 0) {
                    dis[row][col] = Math.min(distance, dis[row][col]);
                    return;
                }

                for (int j = 0; j < dirs.length; j++) {
                    int[] dir = dirs[j];
                    int nr = cur[0] + dir[0];
                    int nc = cur[1] + dir[1];
                    if(isValid(nr, nc)) {
                        visited[nr][nc] = true;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
            distance++;
        }
    }

    private boolean isValid(int row, int col) {
        if (row < 0 || row >= m) return false;
        if (col < 0 || col >= n) return false;
        if (visited[row][col]) return false;
        return true;
    }

    private void init(int[][] mat) {
        this.m = mat.length;
        this.n = mat[0].length;
        this.visited = new boolean[m][n];
        this.mat = mat;
        this.dis = new int[m][n];
        for (int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++){
                dis[i][j] = Integer.MAX_VALUE;
            }
        }
    }

    private void resetVisited() {
        for (int i = 0; i < m; i++) {
            for (int j = 0; j <n; j++) {
                visited[i][j] = false;
            }
        }
    }

    public static void main(String[] args) {

        List<List<Integer>> res = new ArrayList<>();
        res.add(Arrays.asList(1, 2,3));
        Integer[] arr = new Integer[] {1, 2, 3};
        List<Integer> list11 = Arrays.asList(arr);
        List<Integer> list12 = Arrays.stream(arr).collect(Collectors.toList());
        int[] arr2 = {1, 2, 3};
        List<Integer>  list2 = Arrays.stream(arr2).boxed().collect(Collectors.toList());
        System.out.println(list2);

        Set<Integer> set = new HashSet<>();
        StringBuffer sb = new StringBuffer();
        
        System.out.println(Integer.MAX_VALUE);
        Long.MIN_VALUE



    }
}
