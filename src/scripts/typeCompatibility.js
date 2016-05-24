var Person = (function () {
    function Person() {
    }
    return Person;
}());
var p;
// OK, because of structural typing
p = new Person();
var x;
// y's inferred type is { name: string; location: string; }
var y = { name: 'Alice', location: 'Seattle' };
x = y;
/**
 To check whether y can be assigned to x, the compiler checks each property of x to find a corresponding compatible property in y. In this case, y must have a member called name that is a string. It does, so the assignment is allowed.

The same rule for assignment is used when checking function call arguments:

 */
function greet(n) {
    alert('Hello, ' + n.name);
}
greet(y); // OK
/**
 Note that y has an extra location property, but this does not create an error. Only members of the target type (Named in this case) are considered when checking for compatibility.

This comparison process proceeds recursively, exploring the type of each member and sub-member.

 */
/**
 Comparing two functions

While comparing primitive types and object types is relatively straightforward, the question of what kinds of functions should be considered compatible is a bit more involved. Let’s start with a basic example of two functions that differ only in their parameter lists:

 */
var x = function (a) { return 0; };
var y = function (b, s) { return 0; };
y = x; // OK
x = y; // Error
/**
 To check if x is assignable to y, we first look at the parameter list. Each parameter in x must have a corresponding parameter in y with a compatible type. Note that the names of the parameters are not considered, only their types. In this case, every parameter of x has a corresponding compatible parameter in y, so the assignment is allowed.

The second assignment is an error, because y has a required second parameter that ‘x’ does not have, so the assignment is disallowed.

You may be wondering why we allow ‘discarding’ parameters like in the example y = x. The reason for this assignment to be allowed is that ignoring extra function parameters is actually quite common in JavaScript. For example, Array#forEach provides three parameters to the callback function: the array element, its index, and the containing array. Nevertheless, it’s very useful to provide a callback that only uses the first parameter:

 */
var items = [1, 2, 3];
// Don't force these extra parameters
items.forEach(function (item, index, array) { return console.log(item); });
// Should be OK!
items.forEach(function (item) { return console.log(item); });
//Now let’s look at how return types are treated, using two functions that differ only by their return type:
var x = function () { return ({ name: 'Alice' }); };
var y = function () { return ({ name: 'Alice', location: 'Seattle' }); };
x = y; // OK
y = x; // Error because x() lacks a location property
//The type system enforces that the source function’s return type be a subtype of the target type’s return type.
/**
 Function Parameter Bivariance

When comparing the types of function parameters, assignment succeeds if either the source parameter is assignable to the target parameter, or vice versa. This is unsound because a caller might end up being given a function that takes a more specialized type, but invokes the function with a less specialized type. In practice, this sort of error is rare, and allowing this enables many common JavaScript patterns. A brief example:

 */
var EventType;
(function (EventType) {
    EventType[EventType["Mouse"] = 0] = "Mouse";
    EventType[EventType["Keyboard"] = 1] = "Keyboard";
})(EventType || (EventType = {}));
function listenEvent(eventType, handler) {
    /* ... */
}
// Unsound, but useful and common
listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ',' + e.y); });
// Undesirable alternatives in presence of soundness
listenEvent(EventType.Mouse, function (e) { return console.log(e.x + ',' + e.y); });
listenEvent(EventType.Mouse, (function (e) { return console.log(e.x + ',' + e.y); }));
// Still disallowed (clear error). Type safety enforced for wholly incompatible types
listenEvent(EventType.Mouse, function (e) { return console.log(e); });
/**
 Optional Parameters and Rest Parameters

When comparing functions for compatibility, optional and required parameters are interchangeable. Extra optional parameters of the source type are not an error, and optional parameters of the target type without corresponding parameters in the target type are not an error.

When a function has a rest parameter, it is treated as if it were an infinite series of optional parameters.

This is unsound from a type system perspective, but from a runtime point of view the idea of an optional parameter is generally not well-enforced since passing undefined in that position is equivalent for most functions.

The motivating example is the common pattern of a function that takes a callback and invokes it with some predictable (to the programmer) but unknown (to the type system) number of arguments:

 */
function invokeLater(args, callback) {
    /* ... Invoke callback with 'args' ... */
}
// Unsound - invokeLater "might" provide any number of arguments
invokeLater([1, 2], function (x, y) { return console.log(x + ', ' + y); });
// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], function (x, y) { return console.log(x + ', ' + y); });
Functions;
with (overloads)
    When;
a;
overloads, each;
overload in the;
source;
matched;
by;
a;
compatible;
signature;
on;
the;
target;
type.This;
ensures;
that;
the;
target;
be;
called in all;
the;
same;
situations;
source;
/**
Enums

Enums are compatible with numbers, and numbers are compatible with enums. Enum values from different enum types are considered incompatible. For example,

 */
var Status;
(function (Status) {
    Status[Status["Ready"] = 0] = "Ready";
    Status[Status["Waiting"] = 1] = "Waiting";
})(Status || (Status = {}));
;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Blue"] = 1] = "Blue";
    Color[Color["Green"] = 2] = "Green";
})(Color || (Color = {}));
;
var status = Status.Ready;
status = Color.Green; //error
/**
 Classes

Classes work similarly to object literal types and interfaces with one exception: they have both a static and an instance type. When comparing two objects of a class type, only members of the instance are compared. Static members and constructors do not affect compatibility.

 */
var Animal = (function () {
    function Animal(name, numFeet) {
    }
    return Animal;
}());
var Size = (function () {
    function Size(numFeet) {
    }
    return Size;
}());
var a;
var s;
a = s; //OK
s = a; //OK
var x;
var y;
x = y; // okay, y matches structure of x
var x;
var y;
x = y; // error, x and y are not compatible
/**
 In this way, a generic type that has its type arguments specified acts just like a non-generic type.

For generic types that do not have their type arguments specified, compatibility is checked by specifying any in place of all unspecified type arguments. The resulting types are then checked for compatibility, just as in the non-generic case.

 */
//For example,
var identity = function (x) {
    // ...
};
var reverse = function (y) {
    // ...
};
identity = reverse; // Okay because (x: any)=>any matches (y: any)=>any
/**
 Advanced Topics

Subtype vs Assignment

So far, we’ve used ‘compatible’, which is not a term defined in the language spec.
In TypeScript, there are two kinds of compatibility: subtype and assignment.
These differ only in that assignment extends subtype compatibility with rules to allow
assignment to and from any and to and from enum with corresponding numeric values.

Different places in the language use one of the two compatibility mechanisms, depending on the situation.
For practical purposes, type compatibility is dictated by assignment compatibility even in the cases of the
implements and extends clauses.
For more information, see the TypeScript spec.
 */ 
