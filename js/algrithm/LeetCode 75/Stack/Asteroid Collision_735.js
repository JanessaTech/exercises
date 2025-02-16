/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function(asteroids) {
    const stack = []

    const reduce = function(stack) {
        while (stack.length > 1) {
            const top1 = stack.pop()
            const top2 = stack.pop()
            if (top2 > 0 && top1 < 0) {
                if (Math.abs(top2) > Math.abs(top1)) {
                    stack.push(top2)
                } else if (Math.abs(top2) < Math.abs(top1)) {
                    stack.push(top1)
                }
            } else {
                stack.push(top2)
                stack.push(top1)
                break
            }
        }
    }
    
    for (let asteroid of asteroids) {
        stack.push(asteroid)
        reduce(stack)
    }

    return stack
};

const asteroids = [5,10,-5]

const res = asteroidCollision(asteroids)