var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// For emuration
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Green;
//Lastly, "void" is used in the special case of a function returning nothing
function alertMessage() {
    alert("I'm a little message!");
}
//
var f1 = function (i) {
    return i * i;
};
//
var f2 = function (i) {
    return i * i;
};
//
var f3 = function (i) {
    return i * i;
};
//
var f4 = function (i) {
    return i * i;
};
//
var f5 = function (i) { return i * i; };
// Object that implement the "Person" interface can be treated as a Person since it has the name and move properties
var p = { name: "Zin", move: function () {
        alert("moved");
    } };
//
var validPerson = { name: "Zin", age: 27, move: function () {
        alert("moved");
    } };
//
var invalidPerson = { name: "Zin", age: true };
//
var mySearch;
mySearch = function (src, sub) {
    return src.search(sub) != -1;
};
//
/**
 * Point
 */
var Point = (function () {
    function Point(x, y) {
        if (y === void 0) { y = 0; }
        this.y = y;
        this.x = x;
    }
    //Functions
    Point.prototype.dist = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Point.origin = new Point(0, 0);
    return Point;
}());
//
var p1 = new Point(10, 20);
var p2 = new Point(25);
// Inheritace 
/**
 * Point3D
 */
var Point3D = (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z) {
        if (z === void 0) { z = 0; }
        _super.call(this, x, y);
        this.z = z;
    }
    //Override
    Point3D.prototype.dist = function () {
        var d = _super.prototype.dist.call(this);
        return Math.sqrt(d * d + this.z * this.z);
    };
    return Point3D;
}(Point));
//
var Geometry;
(function (Geometry) {
    var Square = (function () {
        function Square(sideLength) {
            if (sideLength === void 0) { sideLength = 0; }
            this.sideLength = sideLength;
        }
        Square.prototype.area = function () {
            return Math.pow(this.sideLength, 2);
        };
        return Square;
    }());
    Geometry.Square = Square;
})(Geometry || (Geometry = {}));
//
var s1 = new Geometry.Square(5);
//
var G = Geometry;
//
var s2 = new G.Square(10);
// Generics
// Classes
/**
 * Tuple <T1,T2>
 */
var Tuple = (function () {
    function Tuple(item1, item2) {
        this.item1 = item1;
        this.item2 = item2;
    }
    return Tuple;
}());
//
var pairToTuple = function (p) {
    return new Tuple(p.item1, p.item2);
};
//
var name = 'Anh Tuan';
var greetings = "Hi " + name + ", how are you?";
var multiline = 'This is an example';
