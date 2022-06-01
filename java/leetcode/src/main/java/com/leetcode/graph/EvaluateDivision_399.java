package com.leetcode.graph;

import java.util.*;

public class EvaluateDivision_399 {
    class Edge {
        String from;
        String to;
        double weight;
        Edge(String from, String to, double weight) {
            this.from = from;
            this.to = to;
            this.weight = weight;
        }
    }

    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, Integer> colors = new HashMap<>();
        Map<String, Double> val = new HashMap<>();
        Set<String> visited = new HashSet<>();
        Map<String, List<Edge>> digraph = createDigraph(equations, values);

        int color = 0;
        for (String v : digraph.keySet()) {
            if (!visited.contains(v)) {
                dfs(digraph, v , color, 1.0, visited, val, colors);
                color++;
            }
        }

        double[] ans = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            List<String> query = queries.get(i);
            String a = query.get(0);
            String b = query.get(1);

            if (!colors.containsKey(a) || !colors.containsKey(b) || colors.get(a) != colors.get(b)) {
                ans[i] = -1;
            } else {
                double a_v = val.get(a);
                double b_v = val.get(b);
                ans[i] = b_v / a_v;
            }

        }

        return ans;

    }

    private void dfs(Map<String, List<Edge>> digraph, String s, Integer color, double value, Set<String> visited, Map<String, Double> val, Map<String, Integer> colors) {
        visited.add(s);
        colors.put(s, color);
        val.put(s, value);
        for (Edge edge : digraph.get(s)) {
            String to = edge.to;
            if (!visited.contains(to)) {
                dfs(digraph, to, color, value * edge.weight, visited, val, colors);
            }
        }
    }

    private Map<String,List<Edge>> createDigraph(List<List<String>> equations, double[] values) {
        Map<String, List<Edge>> digraph = new HashMap<>();

        for (int i = 0; i < equations.size(); i++) {
            String a = equations.get(i).get(0);
            String b = equations.get(i).get(1);
            double w = values[i];
            Edge edge1 = new Edge(a, b, w);
            Edge edge2 = new Edge(b, a, 1/w);


            if (!digraph.containsKey(a)){
                digraph.put(a, new ArrayList<Edge>());
            }
            if (!digraph.containsKey(b)) {
                digraph.put(b, new ArrayList<Edge>());
            }
            digraph.get(a).add(edge1);
            digraph.get(b).add(edge2);
        }
        return digraph;
    }
}
