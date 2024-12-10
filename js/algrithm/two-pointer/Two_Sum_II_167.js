var twoSum = function(numbers, target) {
    const ans = []
    for (let i = 0, j = numbers.length - 1; i < j;) {
        if (numbers[i] + numbers[j] === target) {
            ans.push(i + 1)
            ans.push( j + 1)
            break
        } else if (numbers[i] + numbers[j] < target) {
            i++
        } else {
            j--
        }
    }

    return ans
};

const numbers = [2,7,11,15], target = 9
const res = twoSum(numbers, target)
console.log(res)