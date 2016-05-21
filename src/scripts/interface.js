function area(shape) {
    var area = shape.width * shape.height;
    return "I am a " + shape.name + " with area " + area + " cm squared";
}
console.log(area({ name: "retangle", width: 30, height: 15 }));
console.log(area({ name: "square", width: 30, height: 15, color: "blue" }));
console.log(area({ width: 30, height: 15 }));
var shape = {
    name: "retangle",
    popup: function () {
        var _this = this;
        console.log('This inside popup()' + this.name);
        setTimeout(function () {
            console.log('This is inside setTimeout():' + _this.name);
            console.log("I'm a " + _this.name);
        }, 3000);
    }
};
shape.popup();
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
/**
 * Excess Property Checks
 */
var mySquare = createSquare({ colour: "red", width: 100 });
// error: 'colour' not expected in type 'SquareConfig'
var mySquare = createSquare({ colour: "red", width: 100 });
var mySquare = createSquare({ width: 100, opacity: 0.5 });
//
var squareOptions = { colour: "red", width: 100 };
var mySquare = createSquare(squareOptions);
/**
 * Once defined, we can use this function type interface like we would other interfaces.
 * Here, we show how you can create a variable of a function type
 * and assign it a function value of the same type.
 */
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
