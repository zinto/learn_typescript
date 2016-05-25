/*
Interfaces
Introduction

One of TypeScript’s core principles is that type-checking focuses on the shape that values have. This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/*
Our First Interface

The easiest way to see how interfaces work is to start with a simple example:
*/
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
function printLabel(labelledObj) {
    console.log(labelledObj.label);
}
var myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
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
function createSquare(config) {
    var newSquare = { color: "white", area: 100 };
    if (config.color) {
        // Error: Property 'collor' does not exist on type 'SquareConfig'
        newSquare.color = config.collor;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
function createSquare(config) {
    // ...
}
var mySquare = createSquare({ colour: "red", width: 100 });
/*
Notice the given argument to createSquare is spelled colour instead of color. In plain JavaScript, this sort of thing fails silently.

You could argue that this program is correctly typed, since the width properties are compatible, there’s no color property present, and the extra colour property is insignificant.

However, TypeScript takes the stance that there’s probably a bug in this code. Object literals get special treatment and undergo excess property checking when assigning them to other variables, or passing them as arguments. If an object literal has any properties that the “target type” doesn’t have, you’ll get an error.
*/
// error: 'colour' not expected in type 'SquareConfig'
var mySquare = createSquare({ colour: "red", width: 100 });
/*
Getting around these checks is actually really simple. The easiest method is to just use a type assertion:
*/
var mySquare = createSquare({ width: 100, opacity: 0.5 });
/*
We’ll discuss index signatures in a bit, but here we’re saying a SquareConfig can have any number of properties, and as long as they aren’t color or width, their types don’t matter.

One final way to get around these checks, which might be a bit surprising, is to assign the object to another variable: Since squareOptions won’t undergo excess property checks, the compiler won’t give you an error.
*/
var squareOptions = { colour: "red", width: 100 };
var mySquare = createSquare(squareOptions);
/*
Once defined, we can use this function type interface like we would other interfaces. Here, we show how you can create a variable of a function type and assign it a function value of the same type.
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
/*
For function types to correctly type-check, the names of the parameters do not need to match. We could have, for example, written the above example like this:
*/
var mySearch;
mySearch = function (src, sub) {
    var result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
/*
Function parameters are checked one at a time, with the type in each corresponding parameter position checked against each other. If you do not want to specify types at all, Typescript’s contextual typing can infer the argument types since the function value is assigned directly to a variable of type SearchFunc. Here, also, the return type of our function expression is implied by the values it returns (here false and true). Had the function expression returned numbers or strings, the type-checker would have warned us that return type doesn’t match the return type described in the SearchFunc interface.

*/
var mySearch;
mySearch = function (src, sub) {
    var result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
var myArray;
myArray = ["Bob", "Fred"];
var myStr = myArray[0];
/*
Above, we have a StringArray interface that has an index signature. This index signature states that when a StringArray is indexed with a number, it will return a string.

There are two types of supported index signatures: string and number. It is possible to support both types of indexers, but the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. This is because when indexing with a number, JavaScript will actually convert that to a string before indexing into an object. That means that indexing with 100 (a number) is the same thing as indexing with "100" (a string), so the two need to be consistent.

*/
var Animal = (function () {
    function Animal() {
    }
    return Animal;
}());
var Dog = (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        _super.apply(this, arguments);
    }
    return Dog;
}(Animal));
var Clock = (function () {
    function Clock(h, m) {
    }
    return Clock;
}());
var Clock = (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
var Clock = (function () {
    function Clock(h, m) {
    }
    return Clock;
}());
function createClock(ctor, hour, minute) {
    return new ctor(hour, minute);
}
var DigitalClock = (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
var AnalogClock = (function () {
    function AnalogClock(h, m) {
    }
    AnalogClock.prototype.tick = function () {
        console.log("tick tock");
    };
    return AnalogClock;
}());
var digital = createClock(DigitalClock, 12, 17);
var analog = createClock(AnalogClock, 7, 32);
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
    counter.reset = function () { };
    return counter;
}
var c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
/*
When interacting with 3rd-party JavaScript, you may need to use patterns like the above to fully describe the shape of the type.

*/
/*
Interfaces Extending Classes

When an interface type extends a class type it inherits the members of the class but not their implementations. It is as if the interface had declared all of the members of the class without providing an implementation. Interfaces inherit even the private and protected members of a base class. This means that when you create an interface that extends a class with private or protected members, that interface type can only be implemented by that class or a subclass of it.

This is useful when you have a large inheritance hierarchy, but want to specify that your code works with only subclasses that have certain properties. The subclasses don’t have to be related besides inheriting from the base class. For example:

*/
var Control = (function () {
    function Control() {
    }
    return Control;
}());
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.apply(this, arguments);
    }
    Button.prototype.select = function () { };
    return Button;
}(Control));
var TextBox = (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        _super.apply(this, arguments);
    }
    TextBox.prototype.select = function () { };
    return TextBox;
}(Control));
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        _super.apply(this, arguments);
    }
    return Image;
}(Control));
var Location = (function () {
    function Location() {
    }
    Location.prototype.select = function () { };
    return Location;
}());
/*
In the above example, SelectableControl contains all of the members of Control, including the private state property. Since state is a private member it is only possible for descendants of Control to implement SelectableControl. This is because only descendants of Control will have a state private member that originates in the same declaration, which is a requirement for private members to be compatible.

Within the Control class it is possible to access the state private member through an instance of SelectableControl. Effectively, a SelectableControl acts like a Control that is known to have a select method. The Button and TextBox classes are subtypes of SelectableControl (because they both inherit from Control and have a select method), but the Image and Location classes are not.
*/ 
