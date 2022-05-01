package com.leetcode.tmp;

import java.util.*;

public class TimeMap {
    private Map<String, List<Item>> map = null;

    public TimeMap() {
        map = new HashMap<String, List<Item>>();
    }

    public void set(String key, String value, int timestamp) {
        if (!map.containsKey(key)) {
            map.put(key, new ArrayList<>());
        }
        List<Item> list = map.get(key);
        list.add(new Item(value, timestamp));


    }

    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) return "";
        List<Item> list = map.get(key);

        int lo = 0;
        int hi = list.size() -1;
        if (list.get(hi).timestamp <= timestamp) return list.get(hi).value;

        while (lo <= hi) {
            int mid = (lo + hi)/2;
            Item item = list.get(mid);
            if (item.timestamp == timestamp) return item.value;
            else if (item.timestamp < timestamp) lo = mid + 1;
            else hi = mid - 1;
        }

        if (hi < 0) return "";
        return list.get(hi).value;

    }

    public static void main(String[] args) {
        int[] nums = new int[3];
        nums[0]++;
        nums[2]++;
        for( int n : nums) {
            System.out.println(n);
        }


    }
}

class Item {
    Item(String value, int timestamp) {
        this.value = value;
        this.timestamp = timestamp;
    }
    String value;
    int timestamp;
}
