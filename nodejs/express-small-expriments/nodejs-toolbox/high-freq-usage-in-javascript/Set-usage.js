function loop_set() {
    const nums = new Set()
    nums.add(1)
    nums.add(2)
    nums.add(3)
    for (const n of nums) {
        console.log(n)
    }
}

loop_set()