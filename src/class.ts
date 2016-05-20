/**
 * Shape
 */
class Shape {
 
    area: number;
    
    color: string;
 
    constructor (public name: string, width: number, height: number ) {
        
        this.area = width * height;
        
        this.color = "pink";
    };
 
    shoutout() {
        
        return "I'm " + this.color + " " + this.name +  " with an area of " + this.area + " cm squared.";
    }
}
 
var square = new Shape("square", 30, 30);
console.log( "=========================================" );

console.log( square.shoutout() );

console.log( 'Area of Shape: ' + square.area );

console.log( 'Name of Shape: ' + square.name );

console.log( 'Color of Shape: ' + square.color );

console.log( 'Width of Shape: ' + square.width );

console.log( 'Height of Shape: ' + square.height );

/** 
 * Shape3D
 */ 

class Shape3D extends Shape {
    volume: number;
    
    constructor(public name: string, width: number, height: number, length: number) {
        super(name, width, height);
        
        this.volume = length * this.area;
    }
    
    shoutout()
    {
        return "I'm a "+ this.name  + " with a volumn of " + this.volume + " cm cube";
    }
    
    superShout(){
        return super.shoutout();
    }
    
}

var squared = new Shape3D("cube", 30, 30,30);

console.log(squared.shoutout() );

console.log(squared.superShout() );
