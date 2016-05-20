/**
 * VAR
 */
var a = 10;
function f() {
    var message = "Hello world!";
    return message;
}
//
function f() {
    var a = 10;
    return function g() {
        var b = a + 1;
        return b;
    };
}
var g = f();
g(); // return 11
//
function f() {
    var a = 1;
    a = 2;
    var b = g();
    a = 3;
    return b;
    function g() {
        return a;
    }
}
f(); // return 2
/**
 * SCOPING RULES
 */
function f(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10;
    }
    return x;
}
f(true); // return 10
f(false); // return undefined
//
function sumMaxtrix(maxtrix) {
    var sum = 0;
    for (var i = 0; i < maxtrix.length; i++) {
        var currentRow = maxtrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            var element = currentRow[i];
        }
    }
    return sum;
}
/**
 * VARIABLE CAPTURING QUIRKS
 */
for (var i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i);
    }, 100 * i);
}
//
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function (i) {
        setTimeout(function () { console.log(i); }, 100 * i);
    })(i);
}
/**
 * let Declarations
 */
var hello = "hello";
/**
 * BLOCK-SCOPING
 */
function f(input) {
    var a = 100;
    if (input) {
        //Still okey to reference 'a'
        var b_1 = a + 1;
        return b_1;
    }
    // ERROR: 'b' doesn't exist here
    return b;
}
/**
 * TRY - CATCH
 */
try {
    console.log("oh well");
}
catch (e) {
    throw "oh no!";
}
console.log(e); // Error: 'e' doesn't not exist here
//
function foo() {
    // okey to capture 'a'
    return a;
}
// illegal call 'foo' before 'a' is declared
// runtimes should throw an error here
foo();
var a;
/**
 * Re-declarations and Shadowing
 */
function f(x) {
    var x;
    var x;
    if (true) {
        var x;
    }
}
//
var x = 10;
var x = 20; // Error: cant re-declare 'x' in the same scope
//
function f(x) {
    var x = 100; // error: interferes with parameter declarations
}
function g() {
    var x = 10;
    var x = 100; // error cant have both declarations of 'x'
}
function f(condition, x) {
    if (condition) {
        var x_1 = 100;
        return x_1;
    }
    return x;
}
f(false, 0); // return 0
f(true, 0); // return 100
//
function sumMaxtrix(maxtrix) {
    var sum = 0;
    for (var i_1 = 0; i_1 < maxtrix.length; i_1++) {
        var currentRow = maxtrix[i_1];
        for (var i_2 = 0; i_2 < currentRow.length; i_2++) {
            sum += currentRow[i_2];
        }
    }
    return sum;
}
//
function theCityAlwaySleep() {
    var getCity;
    if (true) {
        var city_1 = "Da Nang";
        getCity = function () {
            return city_1;
        };
    }
    return getCity();
}
//
var _loop_1 = function(i_3) {
    setTimeout(function () { console.log(i_3); }, 100 * i_3);
};
for (var i_3 = 0; i_3 < 10; i_3++) {
    _loop_1(i_3);
}
/**
 * CONST
 */
var numLivesForCat = 9;
var kitty = {
    name: "Herry",
    numLives: numLivesForCat
};
// error
kitty = {
    name: "Daniel",
    numLives: numLivesForCat
};
/**
 * Destructuring
 */
/**
 * Array destructuring
 */
var input = [1, 2];
var first = input[0], second = input[1];
console.log(first); // outputs 1
console.log(second); // outputs 2
//
//This creates two new variables named first and second. 
//This is equivalent to using indexing, but is much more convenient:
first = input[0];
second = input[1];
// swap variables
_a = [second, first], first = _a[0], second = _a[1];
//And with parameters to a function:
function f(_a) {
    var first = _a[0], second = _a[1];
    console.log(first);
    console.log(second);
}
f(input);
// create a variable for the remaining items in a list using the syntax ...name:
var _b = [1, 2, 3, 4], first = _b[0], rest = _b.slice(1);
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]
var first = [1, 2, 3, 4][0];
console.log(first); // outputs 1
//Or other elements:
var _c = [1, 2, 3, 4], second = _c[1], fourth = _c[3];
/**
 * Object destructuring
 */
var o = {
    a: "foo",
    b: 12,
    c: "bar"
};
var a = o.a, b = o.b;
//This creates new variables a and b from o.a and o.b. 
//Notice that you can skip c if you don’t need it.
//Like array destructuring, you can have assignment without declaration:
(_d = { a: "baz", b: 101 }, a = _d.a, b = _d.b, _d);
/**
 * Property renaming
 */
var newName1 = o.a, newName2 = o.b;
//Here the syntax starts to get confusing. 
//You can read a: newName1 as “a as newName1”. 
//The direction is left-to-right, as if you had written:
var newName1 = o.a;
var newName2 = o.b;
//
var a = o.a, b = o.b;
/**
 * Default values
 */
function keepWholeObject(wholeObject) {
    var a = wholeObject.a, _a = wholeObject.b, b = _a === void 0 ? 1001 : _a;
}
function f(_a) {
    var a = _a.a, b = _a.b;
    // ...
}
function f(_a) {
    var _b = _a === void 0 ? { a: "", b: 0 } : _a, a = _b.a, b = _b.b;
    // ...
}
f(); // ok, default to {a: "", b: 0}
//
//
function f(_a) {
    var _b = _a === void 0 ? { a: "" } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
    // ...
}
f({ a: "yes" }); // ok, default b = 0
f(); // ok, default to {a: ""}, which then defaults b = 0
f({}); // error, 'a' is required if you supply an argument
var _a, _d;
