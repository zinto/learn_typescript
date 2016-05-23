interface Shape{
    name: string;
    
    width: number;
    
    height: number;
    
    color?: string;
}

function area(shape:Shape) {
    
    var area = shape.width * shape.height;
    
    return "I am a " + shape.name + " with area " + area + " cm squared";
    
}

console.log( area( {name: "retangle", width: 30, height: 15} ) );
    
console.log( area( {name: "square", width: 30, height: 15,color: "blue"} ) ) ;

console.log( area( {width: 30, height:15} ) );

var shape = {
    name: "retangle",
    
    popup: function () {
        console.log('This inside popup()' + this.name);
        
        setTimeout(() => {
            console.log('This is inside setTimeout():' + this.name);
            
            console.log("I'm a "+ this.name);
            
        },3000);
    }
}

shape.popup();
//---------------------------
// BEGINING
interface SquareConfig{
    color?: string;
    width?: number;
    [propName: string]: any;
}
function createSquare(config: SquareConfig) : {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    
    if (config.color) {
        newSquare.color = config.color;
        
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
        
    }
    return newSquare;
}
let mySquare = createSquare({color: "black"});

/**
 * Excess Property Checks
 */
let mySquare = createSquare({ colour: "red", width: 100 });
// error: 'colour' not expected in type 'SquareConfig'
let mySquare = createSquare({ colour: "red", width: 100 });
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
//
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
/**
 * Function Types
 * 
 * To describe a function type with an interface, we give the interface a call signature. 
 * This is like a function declaration with only the parameter list and return type given. 
 * Each parameter in the parameter list requires both name and type.
 */
interface SearchFunc {
    (source: string, subString: string): boolean;
}
/**
 * Once defined, we can use this function type interface like we would other interfaces. 
 * Here, we show how you can create a variable of a function type 
 * and assign it a function value of the same type.
 */
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
}

/**
 * Indexable Types
 * 
 * Similarly to how we can use interfaces to describe function types, 
 * we can also describe types that we can “index into” like a[10], or ageMap["daniel"]. 
 * Indexable types have an index signature that describes the types we can use to index into the object,
 * along with the corresponding return types when indexing.
 * Let’s take an example:
 */

interface StringArray{
    [index: number]: string;
}

let myArray: StringArray;

myArray = ["Bob", "Fred"];

let myString: string = myArray[0];

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
class Animal {
    name: string;
}

/**
 * Dog extends Animal
 */
class Dog extends Animal {
    breed: string;    
}

// error: indexing with a 'string' will sometimes get you a Dog!
interface NotOkay{
    [x: number]: Animal;
    [x: string]: Dog;
}

/**
 * While string index signatures are a powerful way to describe the “dictionary” pattern, 
 * they also enforce that all properties match their return type.
 * This is because a string index declares that obj.
 * property is also available as obj["property"].
 * In the following example, name’s type does not match the string index’s type, and the type-checker gives an error:
 */
interface NumberDictionary{
    [index: string]: number;
    length: number; // OK, length is a number
    name: string; // error, the type of 'name' is not a subtype if the indexer
}

/**
 * Class Types
 */
/**
 * Implementing an interface 
 */
interface ClockInterface{
    currentTime: Date;
    setTime( d: Date);
}

/**
 * Clock implements ClockInterface
 */
class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date){
        this.currentTime = d;
    }
    constructor(h: number, m: number) {
        
    }  
    
}

/** 
 * Difference between the static and instance sides of classes
 * 
 * When working with classes and interfaces, it helps to keep in mind that a class has two types: 
 *       + the type of the static side
 *       + the type of the instance side. 
 * You may notice that if you create an interface with a construct signature 
 * and try to create a class that implements this interface you get an error:
 */
interface ClockConstructor{
    new (hour: number, minute: number);
}

/**
 * Clock implements ClockConstructor
 */
class Clock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, number: number) {
        
    }
}

/**
 * This is because when a class implements an interface, only the instance side of the class is checked. 
 * Since the constructor sits in the static side, it is not included in this check.
 * 
 * Instead, you would need to work with the static side of the class directly. 
 * In this example, we define two interfaces, 
 * ClockConstructor for the constructor and ClockInterface for the instance methods. 
 * Then for convenience we define a constructor function createClock 
 * that creates instances of the type that is passed to it.
 */

interface ClockConstructor{
    new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface{
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

/**
 * DigitalClock implements ClockInterface
 */
class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {
    }
    tick()
    {
        console.log(" beep beep ");
    }        
}

/**
 * AnalogClock implements ClockInterface
 */
class AnalogClock implements ClockInterface {
    constructor(parametersh: number, m: number) {
        
    }
    
    tick()
    {
        console.log(" tick tock");
    }
}

/**
 * Because createClock’s first parameter is of type ClockConstructor, in createClock(AnalogClock, 7, 32), 
 * it checks that AnalogClock has the correct constructor signature.
 */


//====================

/**
 * Extending Interfaces
 * 
 * Like classes, interfaces can extend each other. 
 * This allows you to copy the members of one interface into another, 
 * which gives you more flexibility in how you separate your interfaces into reusable components.
 */

interface Shape{
    color: string;
}

interface Square extends Shape{
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
/**
 *An interface can extend multiple interfaces, creating a combination of all of the interfaces.
 */
interface PenStroke{
    penWidth: number;
}

interface Square extends Shape,PenStroke{
    sideLength: number;
}

let square = <square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;

/**
 * Hybrid Types
 * 
 * As we mentioned earlier, interfaces can describe the rich types present in real world JavaScript. 
 * Because of JavaScript’s dynamic and flexible nature, you may occasionally encounter an object
 * that works as a combination of some of the types described above.
One such example is an object that acts as both a function and an object, with additional properties:
 */

interface Counter{
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter> function (start: number) {};
    
    counter.interval = 123;
    counter.reset = function () {
        
    }
    return counter;
}

let c = getCounter();
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
class Control {
   private state: any;
}

interface SelectableControl extends Control{
    select(): void;
}

/**
 * Button extends Control
 */
class Button extends Control {
    select(){}
}

/**
 * TextBox extends Control
 */
class TextBox extends Control {
       select(){}
}

/**
 * Image extends Control
 */
class Image extends Control {
   
}

/**
 * Location 
 */
class Location  {
    select(){}
}

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