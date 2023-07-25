package com.leetcode.list;

import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class PriorityQueueUsage {
    public List<Integer> sort(int[] nums) {
        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> b - a);

        for (int n : nums) {
            pq.offer(n);
        }
        List<Integer> res = new ArrayList<>();
        while(!pq.isEmpty()) {
            res.add(pq.poll());
        }
        return  res;
    }

    public static void main(String[] args) {
        PriorityQueueUsage test = new PriorityQueueUsage();
        int[] nums = new int[]{1, 1, 3, 4};
        List<Integer> res = test.sort(nums);
        System.out.println(res);
    }
}
