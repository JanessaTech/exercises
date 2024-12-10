var ExamRoom = function(n) {
    this.occupied = []
    this.size = n
};

ExamRoom.prototype.seat = function() {
    if (this.occupied.length === 0) {
        this.occupied.push(0)
        return 0
    }
    let max = 0, index = 0
    for (let i = 0; i < this.occupied.length; i++) {
        if (i === 0) {// first seat
            const dis = this.occupied[i] - 0
            if (max < dis) {
                max = dis
                index = 0
            }
        }
        if (i === this.occupied.length - 1) { // last seat
            const dis = this.size - 1 - this.occupied[this.occupied.length - 1]
            if (max < dis) {
                max = dis
                index = this.occupied[i] + dis
            }
        } 
        if (i < this.occupied.length - 1) { 
            const dis = Math.floor((this.occupied[i + 1] - this.occupied[i]) / 2)
            if (max < dis) {
                max = dis
                index = this.occupied[i] + dis
            }
        } 
    }
    const insertIndex = this.occupied.findIndex(seat => seat > index)
    if (insertIndex === -1) {
        this.occupied.push(index)
    } else {
        this.occupied.splice(insertIndex, 0, index)
    }
    return index
    
};

ExamRoom.prototype.leave = function(p) {
    this.occupied = this.occupied.filter(seat => seat !== p)
};

const room = new ExamRoom(10)
room.seat()
room.seat()
room.seat()
room.seat()
//room.leave()
room.seat()

console.log('done')
