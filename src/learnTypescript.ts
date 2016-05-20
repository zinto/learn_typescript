
// For emuration
enum Color {Red, Green, Blue};
var c:Color = Color.Green;


//Lastly, "void" is used in the special case of a function returning nothing
function alertMessage(): void {
    alert("I'm a little message!");
}

//
var f1 = function (i:number): number {
    return i * i;
}
//
var f2 = function (i:number) {
    return i * i;
}
//
var f3 = (i:number): number => {
    return i * i;
}
//
var f4 = (i:number) => {
    return i * i;
}
//
var f5 = (i:number) => i * i;
//
//
// Interfaces are strutural , anything that has the properties is compliant with the interface
interface Person{
    name: string;
    
    age?: number;
    
    move(): void;
}

// Object that implement the "Person" interface can be treated as a Person since it has the name and move properties
var p: Person = {name: "Zin", move:()=> {
    alert("moved");
}}
//
var validPerson: Person = {name : "Zin", age:27, move:()=>{
    alert("moved");
}} 
//
var invalidPerson : Person = {name: "Zin", age:true}

interface SearchFunc {
    (source: string, subString :string): boolean;
}
//
var mySearch: SearchFunc;
mySearch = function (src:string, sub: string) {
    return src.search(sub) != -1;
}
//
/**
 * Point
 */
class Point {
    x: number;
    constructor(x: number, public y: number = 0) {
        this.x = x;
    }
    
//Functions
dist(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

static origin = new Point (0 , 0);

}

//
var p1 = new Point(10 , 20);

var p2 = new Point (25);

// Inheritace 
/**
 * Point3D
 */
class Point3D extends Point{
    constructor(x: number, y: number, public z: number =0) {
        super(x,y);
        
    }
    //Override
    dist(){
        var d = super.dist();
        return Math.sqrt (d * d + this.z * this.z);        
    }
    
}
//
module Geometry {
    export /**
     * Square
     */
    class Square {
        constructor(public sideLength: number = 0) {
            
        }
        area()
        {
            return Math.pow(this.sideLength, 2);
        }
    }
}
//
var s1 = new Geometry.Square(5);
//
import G = Geometry;
//
var s2 = new G.Square(10);

// Generics
// Classes
/**
 * Tuple <T1,T2>
 */
class Tuple <T1,T2> {
    constructor(public item1: T1, public item2: T2) {
        
    }
}

// Interfaces
interface Pair <T>
{
    item1: T;
    
    item2: T;
}
//
var pairToTuple = function <T>(p: Pair<T>) {

return new Tuple(p.item1 , p.item2);

}

//
var name = 'Anh Tuan';

var greetings = `Hi ${name}, how are you?`

var multiline = 'This is an example';