/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function(asteroids) {
    const stack = []
    
    for (let asteroid of asteroids) {
        if (stack.length) {
            let next = asteroid
            while (stack.length) {
                const top = stack[stack.length - 1]
                if (next < 0 && top > 0) {
                    if (Math.abs(top) < Math.abs(next)) {
                        stack.pop() 
                    } else if (Math.abs(top) > Math.abs(next)) {
                        next = undefined
                        break
                    } else {
                        next = undefined
                        stack.pop()
                        break
                    }
                } else {
                    break
                }
            }
            if (next) stack.push(next)
        } else {
            stack.push(asteroid)
        }
    }

    return stack
};

const asteroids = [5,10,-5]

const res = asteroidCollision(asteroids)