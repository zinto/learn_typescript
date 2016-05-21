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