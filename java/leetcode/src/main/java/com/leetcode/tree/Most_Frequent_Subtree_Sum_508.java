package com.leetcode.tree;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Most_Frequent_Subtree_Sum_508 {
    public int[] findFrequentTreeSum(TreeNode root) {
        int max = 0;
        Map<Integer, Integer> map = new HashMap<>();
        sum(root, map);
        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            if (entry.getValue() > max) {
                max = entry.getValue();
            }
        }

        List<Integer> list = new ArrayList<>();
        for(Map.Entry<Integer, Integer> entry : map.entrySet()) {
            if(entry.getValue() == max) {
                list.add(entry.getKey());
            }
        }

        int[] res = new int[list.size()];
        int cnt = 0;
        for (Integer n : list) {
            res[cnt++] = n;
        }

        return res;
    }

    int sum(TreeNode node,  Map<Integer, Integer> map) {
        if (node == null) return 0;
        int sum = sum(node.left, map) + sum(node.right, map) + node.val;
        if (map.containsKey(sum)) {
            map.put(sum, map.get(sum) + 1);
        } else {
            map.put(sum, 1);
        }
        return sum;
    }
}
