var Greeting = /** @class */ (function () {
    function Greeting() {
    }
    Greeting.prototype.greet = function () {
        console.log("hello world from greeting");
    };
    return Greeting;
}());
var obj = new Greeting();
obj.greet();
console.log("this is a test");
