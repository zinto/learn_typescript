var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var myArray;
myArray = ["Bob", "Fred"];
var myString = myArray[0];
/**
 * Above, we have a StringArray interface that has an index signature.
 * This index signature states that when a StringArray is indexed with a number, it will return a string.
 *
 * There are two types of supported index signatures: string and number.
 * It is possible to support both types of indexers,
 * but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer.
 * This is because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object.
 * That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.
 */
/**
 * Animal
 */
var Animal = (function () {
    function Animal() {
    }
    return Animal;
}());
/**
 * Dog extends Animal
 */
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        _super.apply(this, arguments);
    }
    return Dog;
}(Animal));
/**
 * Clock implements ClockInterface
 */
var Clock = (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
/**
 * Clock implements ClockConstructor
 */
var Clock = (function () {
    function Clock(h, number) {
    }
    return Clock;
}());
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
/**
 * DigitalClock implements ClockInterface
 */
var DigitalClock = (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log(" beep beep ");
    };
    return DigitalClock;
}());
/**
 * AnalogClock implements ClockInterface
 */
var AnalogClock = (function () {
    function AnalogClock(parametersh, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log(" tick tock");
    };
    return AnalogClock;
}());
var square = {};
square.color = "blue";
square.sideLength = 10;
var square = {};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
function getCounter() {
    var counter = function (start) { };
    counter.interval = 123;
    counter.reset = function () {
    };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
/**
 * Interfaces Extending Classes
 *
 * When an interface type extends a class type it inherits the members of the class
 * but not their implementations.
 * It is as if the interface had declared all of the members of the class without providing an implementation.
 * Interfaces inherit even the private and protected members of a base class.
 * This means that when you create an interface that extends a class
 * with private or protected members, that interface type can only be implemented
 * by that class or a subclass of it.

This is useful when you have a large inheritance hierarchy,
but want to specify that your code works with only subclasses that have certain properties.
The subclasses don’t have to be related besides inheriting from the base class. For example:
 */
/**
 * Control
 */
var Control = (function () {
    function Control() {
    }
    return Control;
}());
/**
 * Button extends Control
 */
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.apply(this, arguments);
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
/**
 * TextBox extends Control
 */
var TextBox = (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        _super.apply(this, arguments);
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Control));
/**
 * Image extends Control
 */
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        _super.apply(this, arguments);
    }
    return Image;
}(Control));
/**
 * Location
 */
var Location = (function () {
    function Location() {
    }
    Location.prototype.select = function () { };
    return Location;
}());
/**
 * In the above example, SelectableControl contains all of the members of Control,
 * including the private state property.
 * Since state is a private member it is only possible for descendants of Control
 * to implement SelectableControl.
 * This is because only descendants of Control will have a state private member
 * that originates in the same declaration, which is a requirement for private members to be compatible.

Within the Control class it is possible to access the state private member through
an instance of SelectableControl. Effectively, a SelectableControl acts like a Control
that is known to have a select method. The Button and TextBox classes are subtypes of
SelectableControl (because they both inherit from Control and have a select method),
but the Image and Location classes are not.
 */ 
