class Shape {
    draw():void {
        console.log("drawing shape ...")
    }
}
class Circle extends Shape {
    draw(): void {
       console.log("drawing circle ...") 
    }
}

var circle = new Circle()
circle.draw()