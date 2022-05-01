package com.leetcode.graph;

import java.util.*;

public class CourseSchedule_207 {
    private boolean canfinish = true;

    public boolean canFinish(int numCourses, int[][] prerequisites) {

        dfs_solution(numCourses, prerequisites);
        //canfinish = bfs_solution(numCourses, prerequisites);

        return canfinish;
    }

    private boolean bfs_solution(int numCourses, int[][] prerequisites) {
        int[] indegree = new int[numCourses];
        Map<Integer, List<Integer>> map = new HashMap<>();
        for (int[] pre : prerequisites) {
            if (!map.containsKey(pre[1]))
                map.put(pre[1], new ArrayList<Integer>());
            map.get(pre[1]).add(pre[0]);
            indegree[pre[0]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        int removed = 0;

        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
                removed++;
            }
        }

        while (!queue.isEmpty()) {
            Integer cur = queue.poll();
            if (map.containsKey(cur)) {
                for(int c : map.get(cur)) {
                    indegree[c]--;
                    if (indegree[c] == 0) {
                        queue.offer(c);
                        removed++;
                    }
                }
            }

        }

        return numCourses == removed;
    }


    private void dfs_solution(int numCourses, int[][] prerequisites) {
        boolean[] visited = new boolean[numCourses];
        Map<Integer, List<Integer>> map = new HashMap<>();
        for (int[] pre: prerequisites) {
            if (!map.containsKey(pre[1])) {
                map.put(pre[1], new ArrayList<Integer>());
            }
            map.get(pre[1]).add(pre[0]);
        }

        for (int i = 0; i < numCourses; i++) {
            if (!visited[i])
                dfs(i, map, visited, new ArrayList<Integer>());
            if (!canfinish) return;
        }

    }

    private void dfs(Integer course, Map<Integer,List<Integer>> map, boolean[] visited, List<Integer> path) {
        visited[course] = true;
        path.add(course);
        if (map.containsKey(course)) {
            for (Integer c : map.get(course)) {
                if (!canfinish) return;
                if (!visited[c]) {
                    dfs(c, map, visited, path);
                } else {
                    if (path.contains(c)) {
                        canfinish = false;
                        return;
                    }
                }
            }
        }
        path.remove(course);
    }

    public static void main(String[] args) {
        int[][] preqs = {{0, 1}};
        CourseSchedule_207 courseSchedule_207 = new CourseSchedule_207();
        boolean res  = courseSchedule_207.canFinish(2, preqs);
        System.out.println(res);

    }
}
