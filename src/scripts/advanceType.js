/**
Advanced Types
Union Types

Occasionally, you’ll run into a library that expects a parameter to be either a number or a string. For instance, take the following function:
 
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + value + "'.");
}
padLeft("Hello world", 4); // returns "    Hello world"
/**
 The problem with padLeft is that its padding parameter is typed as any. That means that we can call it with an argument that’s neither a number nor a string, but TypeScript will be okay with it.

let indentedString = padLeft("Hello world", true); // passes at compile time, fails at runtime.
In traditional object-oriented code, we might abstract over the two types by creating a hierarchy of types. While this is much more explicit, it’s also a little bit overkill. One of the nice things about the original version of padLeft was that we were able to just pass in primitives. That meant that usage was simple and not overly verbose. This new approach also wouldn’t help if we were just trying to use a function that already exists elsewhere.

Instead of any, we can use a union type for the padding parameter:
 */
/**
 * Takes a string and adds "padding" to the left.
 * If 'padding' is a string, then 'padding' is appended to the left side.
 * If 'padding' is a number, then that number of spaces is added to the left side.
 */
function padLeft(value, padding) {
    // ...
}
var indentedString = padLeft("Hello world", true); // errors during compilation
function getSmallPet() {
    // ...
}
var pet = getSmallPet();
pet.layEggs(); // okay
pet.swim(); // errors
/**
 Union types can be a bit tricky here, but it just takes a bit of intuition to get used to. If a value has the type A | B, we only know for certain that it has members that both A and B have. In this example, Bird has a member named fly. We can’t be sure whether a variable typed as Bird | Fish has a fly method. If the variable is really a Fish at runtime, then calling pet.fly() will fail.


 */
/**
 Type Guards and Differentiating Types

Union types are useful for modeling situations when values can overlap in the types they can take on. What happens when we need to know specifically whether we have a Fish? A common idiom in JavaScript to differentiate between two possible values is to check for the presence of a member. As we mentioned, you can only access members that are guaranteed to be in all the constituents of a union type.


 */
var pet = getSmallPet();
// Each of these property accesses will cause an error
if (pet.swim) {
    pet.swim();
}
else if (pet.fly) {
    pet.fly();
}
//To get the same code working, we’ll need to use a type assertion:
var pet = getSmallPet();
if (pet.swim) {
    pet.swim();
}
else {
    pet.fly();
}
/**
 User-Defined Type Guards

Notice that we had to use type assertions several times. It would be much better if once we performed the check, we could know the type of pet within each branch.

It just so happens that TypeScript has something called a type guard. A type guard is some expression that performs a runtime check that guarantees the type in some scope. To define a type guard, we simply need to define a function whose return type is a type predicate:

 */
function isFish(pet) {
    return pet.swim !== undefined;
}
/**
 pet is Fish is our type predicate in this example. A predicate takes the form parameterName is Type, where parameterName must be the name of a parameter from the current function signature.

Any time isFish is called with some variable, TypeScript will narrow that variable to that specific type if the original type is compatible.
*/
// Both calls to 'swim' and 'fly' are now okay.
if (isFish(pet)) {
    pet.swim();
}
else {
    pet.fly();
}
/**
 Notice that TypeScript not only knows that pet is a Fish in the if branch;
  it also knows that in the else branch, you don’t have a Fish, so you must have a Bird.
 */
/**
 * typeof type guards
 */
/**
 We didn’t actually discuss the implementation of the version of padLeft which used union types. We could write it with type predicates as follows:
 */
function isNumber(x) {
    return typeof x === "number";
}
function isString(x) {
    return typeof x === "string";
}
function padLeft(value, padding) {
    if (isNumber(padding)) {
        return Array(padding + 1).join(" ") + value;
    }
    if (isString(padding)) {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + value + "'.");
}
/**
 However, having to define a function to figure out if a type is a primitive is kind of a pain.
 Luckily, you don’t need to abstract typeof x === "number" into its own function because TypeScript
 will recognize it as a type guard on its own.
 That means we could just write these checks inline.
 */
function padLeft(value, padding) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error("Expected string or number, got '" + value + "'.");
}
var SpaceRepeatingPadder = (function () {
    function SpaceRepeatingPadder(numSpaces) {
        this.numSpaces = numSpaces;
    }
    SpaceRepeatingPadder.prototype.getPaddingString = function () {
        return Array(this.numSpaces + 1).join(" ");
    };
    return SpaceRepeatingPadder;
}());
var StringPadder = (function () {
    function StringPadder(value) {
        this.value = value;
    }
    StringPadder.prototype.getPaddingString = function () {
        return this.value;
    };
    return StringPadder;
}());
function getRandomPadder() {
    return Math.random() < 0.5 ?
        new SpaceRepeatingPadder(4) :
        new StringPadder("  ");
}
// Type is SpaceRepeatingPadder | StringPadder
var padder = getRandomPadder();
if (padder instanceof SpaceRepeatingPadder) {
    padder; // type narrowed to 'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // type narrowed to 'StringPadder'
}
/**
 The right side of the instanceof needs to be a constructor function, and TypeScript will narrow down to:
    1. the type of the function’s prototype property if its type is not any
    2. the union of types returned by that type’s construct signatures
in that order.
 */
/**
 * Intersection Types
 *
 
 
Intersection types are closely related to union types, but they are used very differently. An intersection type, Person & Serializable & Loggable, for example, is a Person and Serializable and Loggable. That means an object of this type will have all members of all three types. In practice you will mostly see intersection types used for mixins. Here’s a simple mixin example:
 */
function extend(first, second) {
    var result = {};
    for (var id in first) {
        result[id] = first[id];
    }
    for (var id in second) {
        if (!result.hasOwnProperty(id)) {
            result[id] = second[id];
        }
    }
    return result;
}
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
var ConsoleLogger = (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.prototype.log = function () {
        // ...
    };
    return ConsoleLogger;
}());
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
var people;
var s = people.name;
var s = people.next.name;
var s = people.next.next.name;
var s = people.next.next.next.name;
var UIElement = (function () {
    function UIElement() {
    }
    UIElement.prototype.animate = function (dx, dy, easing) {
        if (easing === "ease-in") {
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
        }
    };
    return UIElement;
}());
var button = new UIElement();
button.animate(0, 0, "ease-in");
button.animate(0, 0, "uneasy"); // error: "uneasy" is not allowed here
// ... more overloads ...
function createElement(tagName) {
    // ... code goes here ...
}
/**
 Polymorphic this types

A polymorphic this type represents a type that is the subtype of the containing class or interface. This is called F-bounded polymorphism. This makes hierarchical fluent interfaces much easier to express, for example. Take a simple calculator that returns this after each operation:

 */
var BasicCalculator = (function () {
    function BasicCalculator(value) {
        if (value === void 0) { value = 0; }
        this.value = value;
    }
    BasicCalculator.prototype.currentValue = function () {
        return this.value;
    };
    BasicCalculator.prototype.add = function (operand) {
        this.value += operand;
        return this;
    };
    BasicCalculator.prototype.multiply = function (operand) {
        this.value *= operand;
        return this;
    };
    return BasicCalculator;
}());
var v = new BasicCalculator(2)
    .multiply(5)
    .add(1)
    .currentValue();
//Since the class uses this types, you can extend it and the new class can use the old methods with no changes.
var ScientificCalculator = (function (_super) {
    __extends(ScientificCalculator, _super);
    function ScientificCalculator(value) {
        if (value === void 0) { value = 0; }
        _super.call(this, value);
    }
    ScientificCalculator.prototype.sin = function () {
        this.value = Math.sin(this.value);
        return this;
    };
    return ScientificCalculator;
}(BasicCalculator));
var v = new ScientificCalculator(2)
    .multiply(5)
    .sin()
    .add(1)
    .currentValue();
/**
 Without this types, ScientificCalculator would not have been able to extend BasicCalculator and keep the fluent interface. multiply would have returned BasicCalculator, which doesn’t have the sin method. However, with this types, multiply returns this, which is ScientificCalculator here.
 */ 
