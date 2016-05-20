// Boolean
var isDone = false;
/**
 *  Number
 */
var decimal = 6;
var hex = 0xf00d;
var binary = 10;
var octal = 484;
/**
 *  String
 */
var color = "blue";
var fullName = "Anh Tuan";
var age = 37;
var sentence = "hello, my name is " + fullName;
var sentence1 = "I'll be " + (age + 1) + " years old next month";
/**
 *  Array
 */
var list = [1, 2, 3];
/**
 *  Generic Array
 */
var genericArray = [1, 2, 3];
/**
 * TUPLE
 */
/**Tuple types allow you to express an array
 * where the type of a fixed number of elements is known, but need not be the same.
 * For example, you may want to represent a value as a pair of a string and a number: *
 */
//
//Declare a tuple type
var x;
// Initialize it
x = ['hello', 10]; // OK
x = [10, 'Hello']; // Error
// index of tuple
console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // error because it is a number
// accessing
x[3] = 'world'; // OK, string can be assigned to (string | number)
console.log(x[5].toString()); // OK, 'string' and 'number' both have toString
//
x[6] = true; // Error, boolean isn't (string | number)
/**
 * ENUM
 */
var Color2;
(function (Color2) {
    Color2[Color2["Red"] = 0] = "Red";
    Color2[Color2["Green"] = 1] = "Green";
    Color2[Color2["Blue"] = 2] = "Blue";
})(Color2 || (Color2 = {}));
;
var color1 = Color2.Green;
// 
var Color3;
(function (Color3) {
    Color3[Color3["Red"] = 1] = "Red";
    Color3[Color3["Green"] = 2] = "Green";
    Color3[Color3["Blue"] = 3] = "Blue";
})(Color3 || (Color3 = {}));
;
var color2 = Color3.Green;
//
var Color4;
(function (Color4) {
    Color4[Color4["Red"] = 1] = "Red";
    Color4[Color4["Green"] = 2] = "Green";
    Color4[Color4["Blue"] = 4] = "Blue";
})(Color4 || (Color4 = {}));
;
var color3 = Color4.Green;
//
var colorName = Color4[2];
alert(colorName);
/**
 * ANY
 *
 * The any type is a powerful way to work with existing JavaScript,
 * allowing you to gradually opt-in and opt-out of type-checking during compilation.
 * You might expect Object to play a similar role, as it does in other languages.
 * But variables of type Object only allow you to assign any value to them
 * – you can’t call arbitrary methods on them, even ones that actually exist:
 */
var notSure = 4;
notSure = "Maybe a string instead";
notSure = false;
notSure.ifItExist(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)
//
var prettySure = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
/**
 * The any type is also handy if you know some part of the type, but perhaps not all of it.
 * For example, you may have an array but the array has a mix of different types:
 */
var list = [1, true, "free"];
var list = [1, true, "free"];
list[1] = 100;
/**
 * VOID
 */
function warnUser() {
    alert("This is a warning message");
}
/**
 *  TYPE ASSERTIONS
 */
var someValue = "this is a string";
var strLength = someValue.length;
var someValue = "this is a string";
var strLength = someValue.length;
/**
 * A NOTE ABOUT let

You may’ve noticed that so far,
we’ve been using the let keyword instead of JavaScript’s var keyword
which you might be more familiar with.
The let keyword is actually a newer JavaScript construct that TypeScript makes available.
We’ll discuss the details later, but many common problems in JavaScript are
alleviated by using let, so you should use it instead of var whenever possible.
 */ 
