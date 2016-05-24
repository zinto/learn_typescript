/**
 Iterators and Generators
Iterables

An object is deemed iterable if it has an implementation for the Symbol.iterator property. Some built-in types like Array, Map, Set, String, Int32Array, Uint32Array, etc. have their Symbol.iterator property already implemented. Symbol.iterator function on an object is responsible for returning the list of values to iterate on.
 */
/**
for..of statements

for..of loops over an iterable object, invoking the Symbol.iterator property on the object. Here is a simple for..of loop on an array:


 */
var someArray = [1, "string", false];
for (var _a = 0, someArray_1 = someArray; _a < someArray_1.length; _a++) {
    var entry = someArray_1[_a];
    console.log(entry); // 1, "string", false
}
/**
 for..of vs. for..in statements

Both for..of and for..in statements iterate over lists; the values iterated on are different though, for..in returns a list of keys on the object being iterated, whereas for..of returns a list of values of the numeric properties of the object being iterated.

Here is an example that demonstrates this distinction:

 */
var list = [4, 5, 6];
for (var i_1 in list) {
    console.log(i_1); // "0", "1", "2",
}
for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
    var i_2 = list_1[_b];
    console.log(i_2); // "4", "5", "6"
}
/**
 Another distinction is that for..in operates on any object; it serves as a way to inspect properties on this object. for..of on the other hand, is mainly interested in values of iterable objects.
 Built-in objects like Map and Set implement Symbol.iterator property allowing access to stored values.
 */
var pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";
for (var pet_1 in pets) {
    console.log(pet_1); // "species"
}
for (var _c = 0, pets_1 = pets; _c < pets_1.length; _c++) {
    var pet_2 = pets_1[_c];
    console.log(pet_2); // "Cat", "Dog", "Hamster"
}
/**
 Code generation

Targeting ES5 and ES3

When targeting an ES5 or ES3, iterators are only allowed on values of Array type. It is an error to use for..of loops on non-Array values, even if these non-Array values implement the Symbol.iterator property.

The compiler will generate a simple for loop for a for..of loop, for instance:

 */
var numbers = [1, 2, 3];
for (var _d = 0, numbers_1 = numbers; _d < numbers_1.length; _d++) {
    var num_1 = numbers_1[_d];
    console.log(num_1);
}
//will be generated as:
var numbers = [1, 2, 3];
for (var _i = 0; _i < numbers.length; _i++) {
    var num = numbers[_i];
    console.log(num);
}
/**
 Targeting ECMAScript 2015 and higher

When targeting an ECMAScipt 2015-compliant engine, the compiler will generate for..of loops to target the built-in iterator implementation in the engine.
 */ 
