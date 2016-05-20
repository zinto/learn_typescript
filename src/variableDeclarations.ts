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
    }
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
function f(shouldInitialize: boolean) {
    if (shouldInitialize) {
        var x = 10;
        
    }
    return x;
    
}
f(true); // return 10
f(false); // return undefined

//
function sumMaxtrix(maxtrix: number[][]) {
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
    setTimeout(function() {
        console.log(i);
    }, 100 * i);
    
}
//
for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}

/**
 * let Declarations
 */
let hello = "hello";

/**
 * BLOCK-SCOPING
 */
function f(input: boolean) {
    let a = 100;
    
    if(input)
    {
      //Still okey to reference 'a'
      
      let b = a + 1;
      
      return b;
      
    }
    
    // ERROR: 'b' doesn't exist here
    return b;
}

/**
 * TRY - CATCH
 */
try {    
     console.log("oh well")
} catch (e) {
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

let a;

/**
 * Re-declarations and Shadowing
 */
function f(x) {
    var x;
    
    var x;
    
    if(true)
    {
        var x;
    }
}
//
let x = 10;
let x = 20; // Error: cant re-declare 'x' in the same scope

//
function f(x) {
    let x = 100; // error: interferes with parameter declarations
}

function g() {
    let x = 10;
    
    var x = 100; // error cant have both declarations of 'x'
}

function f(condition, x) {
    if(condition){
        let x = 100;
        return x;
    }
    
    return x;
}
 f(false , 0); // return 0
 f(true, 0); // return 100
 
 //
 function sumMaxtrix(maxtrix: number [] []) {
     let sum = 0;
     for (let i = 0; i < maxtrix.length; i++) {
         var currentRow = maxtrix[i];
         for (let i = 0; i < currentRow.length; i++) {
           sum += currentRow[i];
       }
     }
     
     return sum;
 }
 
 //
 function theCityAlwaySleep() {
     let getCity;
     
     if(true)
     {
         let city = "Da Nang";
         
         getCity = function () {
             return city;
         }
     }
     
     return getCity();
 }
 //
 for (let i = 0; i < 10 ; i++) {
    setTimeout(function() {console.log(i); }, 100 * i);
}

/**
 * CONST
 */
const numLivesForCat = 9;
const kitty = {
    name: "Herry",
    numLives: numLivesForCat
}
// error
kitty = {
  name: "Daniel",
  numLives: numLivesForCat
}

/**
 * Destructuring
 */
/**
 * Array destructuring
 */
let input = [1, 2];
let [first, second] = input;
console.log(first); // outputs 1
console.log(second); // outputs 2

//
//This creates two new variables named first and second. 
//This is equivalent to using indexing, but is much more convenient:
first = input[0];
second = input[1];

// swap variables
[first, second] = [second, first];

//And with parameters to a function:
function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f(input);

// create a variable for the remaining items in a list using the syntax ...name:
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4 ]

let [first] = [1, 2, 3, 4];
console.log(first); // outputs 1

//Or other elements:
let [, second, , fourth] = [1, 2, 3, 4];

/**
 * Object destructuring
 */

let o = {
    a: "foo",
    b: 12,
    c: "bar"
}
let {a, b} = o;
//This creates new variables a and b from o.a and o.b. 
//Notice that you can skip c if you don’t need it.
//Like array destructuring, you can have assignment without declaration:

({a, b} = {a: "baz", b: 101});

/**
 * Property renaming
 */
let {a: newName1, b: newName2} = o;

//Here the syntax starts to get confusing. 
//You can read a: newName1 as “a as newName1”. 
//The direction is left-to-right, as if you had written:
let newName1 = o.a;
let newName2 = o.b;

//
let {a, b}: {a: string, b: number} = o;

/**
 * Default values
 */
function keepWholeObject(wholeObject: {a: string, b?: number}) {
    let {a, b = 1001} = wholeObject;
}

/**
 * Function declarations
 */
type C = {a: string, b?: number}
function f({a, b}: C): void {
    // ...
}
function f({a, b} = {a: "", b: 0}): void {
    // ...
}
f(); // ok, default to {a: "", b: 0}

//
//
function f({a, b = 0} = {a: ""}): void {
    // ...
}
f({a: "yes"}) // ok, default b = 0
f() // ok, default to {a: ""}, which then defaults b = 0
f({}) // error, 'a' is required if you supply an argument