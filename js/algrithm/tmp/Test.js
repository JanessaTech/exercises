for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
        if (j === 2) {
            break
        }
        console.log('i = ', i, ' j = ', j)
    }
}