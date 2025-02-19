var findDifference = function(nums1, nums2) {
    nums1 = new Set(nums1)
    nums2 = new Set(nums2)
    for (let n1 of nums1) {
        if (nums2.has(n1)) {
            nums1.delete(n1)
            nums2.delete(n1)
        }
    }
    return [[...nums1], [...nums2]]
};