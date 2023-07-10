package com.leetcode.Binary_Search;

public class Search_2D_Matrix_74 {
    public boolean searchMatrix(int[][] matrix, int target) {
        int lo = 0;
        int hi = matrix.length - 1;

        while (lo <= hi) {
            int mid = (lo + hi) /2;
            if(matrix[mid][0] == target) return true;
            else if (matrix[mid][0] < target) lo = mid + 1;
            else hi = mid - 1;
        }

        if (hi < 0) return false;
        int row = hi;

        lo = 0;
        hi = matrix[row].length - 1;
        while (lo <= hi) {
            int mid = (lo + hi) / 2;
            if (matrix[row][mid] == target) return true;
            else if (matrix[row][mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;

    }
}
