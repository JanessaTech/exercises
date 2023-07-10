package com.leetcode.BST;

import java.util.ArrayList;
import java.util.List;

public class Find_Mode_in_Binary_Search_Tree_501 {
    int maxCnt = 0;
    int cnt = 0;
    TreeNode pre = null;
    List<Integer> modes = new ArrayList<>();

    public int[] findMode(TreeNode root) {
        dfs(root);
        update();
        return getRes();
    }

    int[] getRes() {
        int[] res = new int[modes.size()];
        int i = 0;
        for (int m : modes) {
            res[i++] = m;
        }
        return res;
    }

    void dfs(TreeNode node) {
        if (node == null) return;
        dfs(node.left);
        if (pre == null) {
            cnt = 1;
        } else {
            if (pre.val == node.val) {
                cnt++;
            } else {
                update();
            }
        }
        pre = node;
        dfs(node.right);

    }

    void update() {
        if (cnt == maxCnt) {
            modes.add(pre.val);
            cnt = 1;
        } else if (cnt > maxCnt) {
            modes.clear();
            modes.add(pre.val);
            maxCnt = cnt;
            cnt = 1;
        } else {
            cnt = 1;
        }
    }
}
