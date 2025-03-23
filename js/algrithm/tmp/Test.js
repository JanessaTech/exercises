var asteroidCollision = function(asteroids) {
    const stack = []
    for (let asteroid of asteroids) {
        if (stack.length) {
            let next = asteroid
            while (stack.length) {
                let top = stack[stack.length - 1]
                if (top > 0 && next < 0) {
                    if (Math.abs(top) < Math.abs(next)) {
                        stack.pop()
                    } else if (Math.abs(top) > Math.abs(next)) {
                        next = undefined
                        break
                    } else {
                        stack.pop()
                        next = undefined
                        break;
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

const asteroids =[-2,-2,1,-2]

const res  = asteroidCollision(asteroids)
console.log(res)