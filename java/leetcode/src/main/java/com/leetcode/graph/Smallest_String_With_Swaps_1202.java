package com.leetcode.graph;

import java.util.*;

public class Smallest_String_With_Swaps_1202 {
    class UF {
        int[] id = null;
        int[] sz = null;
        UF(int n) {
            id = new int[n];
            sz = new int[n];
            for (int i= 0; i < n; i++) {
                id[i] = i;
                sz[i] = 1;
            }
        }

        public int root(int i) {
            if(id[i] == i) return i;
            else return root(id[i]);
        }

        public boolean isConnected(int i, int j) {
            return root(i) == root(j);
        }

        public void union(int i, int j) {
            int pi = root(i);
            int pj = root(j);
            if (sz[pi] < sz[pj]) {
                id[pi] = pj;
                sz[pj] = sz[pi] + sz[pj];
            }else {
                id[pj] = pi;
                sz[pi] = sz[pj] + sz[pi];
            }
        }

    }
    public String smallestStringWithSwaps(String s, List<List<Integer>> pairs) {
        char[] chars = s.toCharArray();
        UF uf = new UF(s.length());
        for(List<Integer> p : pairs) {
            int a = p.get(0);
            int b = p.get(1);
            if(!uf.isConnected(a, b)){
                uf.union(a, b);
            }
        }

        Map<Integer, List<Character>> map = new HashMap<>();

        for (int i = 0; i < chars.length; i++) {
            int root = uf.root(i);
            if(!map.containsKey(root)) map.put(root, new ArrayList<>());
            map.get(root).add(chars[i]);
        }
        for(Map.Entry<Integer, List<Character>> entry : map.entrySet()) {
            Collections.sort(entry.getValue());
        }

        StringBuffer sb = new StringBuffer();
        for(int i = 0; i < chars.length; i++) {
            int root = uf.root(i);
            List<Character> list = map.get(root);
            sb.append(list.remove(0));
        }
        return sb.toString();
    }

    public  static void main(String[] args) {
        String s = "dcab";
        List<List<Integer>> pairs = new ArrayList<>();
        pairs.add(Arrays.asList(0, 3));
        pairs.add(Arrays.asList(1, 2));

        Smallest_String_With_Swaps_1202 test = new Smallest_String_With_Swaps_1202();
        String res = test.smallestStringWithSwaps(s, pairs);
        System.out.println(res);
    }
}
