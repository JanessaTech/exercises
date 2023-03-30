import * as shape from "./IShape"
import * as circle from "./Circle"
import * as triangle from "./Triangle"

function drawAllShapes(shapeToDraw: shape.IShape) {
    shapeToDraw.draw(); 
 } 
 
 drawAllShapes(new circle.Circle()); 
 drawAllShapes(new triangle.Triangle()); 