// Boolean
let isDone: boolean = false;

/**
 *  Number
 */
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
/**
 *  String
 */
let color: string = "blue";
let fullName: string = "Anh Tuan";
let age: number = 37;
let sentence: string = `hello, my name is ${fullName}`

let sentence1: string =`I'll be ${age + 1} years old next month`

/**
 *  Array
 */
let list: number[] = [1, 2, 3];

/**
 *  Generic Array
 */
let genericArray : Array<number> = [1,2,3];

/**
 * TUPLE
 */
/**Tuple types allow you to express an array 
 * where the type of a fixed number of elements is known, but need not be the same. 
 * For example, you may want to represent a value as a pair of a string and a number: * 
 */
//
//Declare a tuple type
let x: [string, number];
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
enum Color2 {Red, Green, Blue};

let color1: Color2 = Color2.Green;

// 
enum Color3 {Red = 1, Green, Blue};
let color2: Color3 = Color3.Green;
//
enum Color4 {Red = 1, Green = 2, Blue = 4};
let color3: Color4 = Color4.Green;
//
let colorName: string = Color4[2];
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

let notSure: any = 4;
notSure = "Maybe a string instead";
notSure = false;
notSure.ifItExist();    // okay, ifItExists might exist at runtime
notSure.toFixed();      // okay, toFixed exists (but the compiler doesn't check)
//
let prettySure: Object = 4;
prettySure.toFixed();   // Error: Property 'toFixed' doesn't exist on type 'Object'.
/**
 * The any type is also handy if you know some part of the type, but perhaps not all of it. 
 * For example, you may have an array but the array has a mix of different types:
 */
let list: any[] = [1 , true, "free"];
let list: any[] = [1, true, "free"];
list[1] = 100;
 
/**
 * VOID 
 */
function warnUser(): void {
    alert("This is a warning message");
    
}
/**
 *  TYPE ASSERTIONS
 */
let someValue : any = "this is a string";
let strLength : number = (<string>someValue).length;

let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;

/**
 * A NOTE ABOUT let

You may’ve noticed that so far, 
we’ve been using the let keyword instead of JavaScript’s var keyword 
which you might be more familiar with. 
The let keyword is actually a newer JavaScript construct that TypeScript makes available. 
We’ll discuss the details later, but many common problems in JavaScript are 
alleviated by using let, so you should use it instead of var whenever possible.
 */