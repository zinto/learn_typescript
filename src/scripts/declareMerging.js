/*
Declaration Merging
Introduction

Some of the unique concepts in TypeScript describe the shape of JavaScript objects at the type level. One example that is especially unique to TypeScript is the concept of ‘declaration merging’. Understanding this concept will give you an advantage when working with existing JavaScript. It also opens the door to more advanced abstraction concepts.

For the purposes of this article, “declaration merging” means that the compiler merges two separate declarations declared with the same name into a single definition. This merged definition has the features of both of the original declarations. Any number of declarations can be merged; it’s not limited to just two declarations.
 */
"use strict";
Basic;
Concepts;
In;
TypeScript, a;
declaration;
creates;
entities in at;
least;
one;
of;
three;
groups: namespace, type, or;
value.Namespace - creating;
declarations;
create;
a;
namespace, which;
contains;
names;
that;
are;
accessed;
using;
a;
dotted;
notation.Type - creating;
declarations;
do
    just;
while (that);
they;
create;
a;
visible;
with (the)
    declared;
shape;
and;
bound;
to;
the;
given;
name.Lastly, value - creating;
declarations;
create;
values;
that;
are;
visible in the;
output;
JavaScript.
;
Declaration;
Type;
Namespace;
Type;
Value;
Namespace;
X;
X;
Class;
X;
X;
Enum;
X;
X;
Interface;
X;
Type;
Alias;
X;
Function;
X;
Variable;
X;
var box = { height: 5, width: 6, scale: 10 };
/*
Merging Namespaces

Similarly to interfaces, namespaces of the same name will also merge their members. Since namespaces create both a namespace and a value, we need to understand how both merge.

To merge the namespaces, type definitions from exported interfaces declared in each namespace are themselves merged, forming a single namespace with merged interface definitions inside.

To merge the namespace value, at each declaration site, if a namespace already exists with the given name, it is further extended by taking the existing namespace and adding the exported members of the second namespace to the first.

The declaration merge of Animals in this example:

 */
var Animals;
(function (Animals) {
    var Zebra = (function () {
        function Zebra() {
        }
        return Zebra;
    }());
    Animals.Zebra = Zebra;
})(Animals || (Animals = {}));
var Animals;
(function (Animals) {
    var Dog = (function () {
        function Dog() {
        }
        return Dog;
    }());
    Animals.Dog = Dog;
})(Animals || (Animals = {}));
//is equivalent to:
var Animals;
(function (Animals) {
    var Zebra = (function () {
        function Zebra() {
        }
        return Zebra;
    }());
    Animals.Zebra = Zebra;
    var Dog = (function () {
        function Dog() {
        }
        return Dog;
    }());
    Animals.Dog = Dog;
})(Animals || (Animals = {}));
/*
This model of namespace merging is a helpful starting place, but we also need to understand what happens with non-exported members. Non-exported members are only visible in the original (un-merged) namespace. This means that after merging, merged members that came from other declarations cannot see non-exported members.

We can see this more clearly in this example:

 */
var Animal;
(function (Animal) {
    var haveMuscles = true;
    function animalsHaveMuscles() {
        return haveMuscles;
    }
    Animal.animalsHaveMuscles = animalsHaveMuscles;
})(Animal || (Animal = {}));
var Animal;
(function (Animal) {
    function doAnimalsHaveMuscles() {
        return haveMuscles; // <-- error, haveMuscles is not visible here
    }
    Animal.doAnimalsHaveMuscles = doAnimalsHaveMuscles;
})(Animal || (Animal = {}));
/*
Because haveMuscles is not exported, only the animalsHaveMuscles function that shares the same un-merged namespace can see the symbol. The doAnimalsHaveMuscles function, even though it’s part of the merged Animal namespace can not see this un-exported member.

Merging Namespaces with Classes, Functions, and Enums

Namespaces are flexible enough to also merge with other types of declarations. To do so, the namespace declaration must follow the declaration it will merge with. The resulting declaration has properties of both declaration types. TypeScript uses this capability to model some of patterns in JavaScript as well as other programming languages.
 */
/*

Merging Namespaces with Classes

This gives the user a way of describing inner classes.

 */
var Album = (function () {
    function Album() {
    }
    return Album;
}());
var Album;
(function (Album) {
    var AlbumLabel = (function () {
        function AlbumLabel() {
        }
        return AlbumLabel;
    }());
    Album.AlbumLabel = AlbumLabel;
})(Album || (Album = {}));
/*
The visibility rules for merged members is the same as described in the ‘Merging Namespaces’ section, so we must export the AlbumLabel class for the merged class to see it. The end result is a class managed inside of another class. You can also use namespaces to add more static members to an existing class.

In addition to the pattern of inner classes, you may also be familiar with JavaScript practice of creating a function and then extending the function further by adding properties onto the function. TypeScript uses declaration merging to build up definitions like this in a type-safe way.

 */
function buildLabel(name) {
    return buildLabel.prefix + name + buildLabel.suffix;
}
var buildLabel;
(function (buildLabel) {
    buildLabel.suffix = "";
    buildLabel.prefix = "Hello, ";
})(buildLabel || (buildLabel = {}));
alert(buildLabel("Sam Smith"));
//Similarly, namespaces can be used to extend enums with static members:
var Color;
(function (Color) {
    Color[Color["red"] = 1] = "red";
    Color[Color["green"] = 2] = "green";
    Color[Color["blue"] = 4] = "blue";
})(Color || (Color = {}));
var Color;
(function (Color) {
    function mixColor(colorName) {
        if (colorName == "yellow") {
            return Color.red + Color.green;
        }
        else if (colorName == "white") {
            return Color.red + Color.green + Color.blue;
        }
        else if (colorName == "magenta") {
            return Color.red + Color.blue;
        }
        else if (colorName == "cyan") {
            return Color.green + Color.blue;
        }
    }
    Color.mixColor = mixColor;
})(Color || (Color = {}));
/*
Disallowed Merges

Not all merges are allowed in TypeScript. Currently, classes can not merge with other classes or with variables. For information on mimicking class merging, see the Mixins in TypeScript section.

 */
/*
Module Augmentation

Although JavaScript modules do not support merging, you can patch existing objects by importing and then updating them. Let’s look at a toy Observable example:

 */
// observable.js
var Observable = (function () {
    function Observable() {
    }
    return Observable;
}());
exports.Observable = Observable;
// map.js
var observable_1 = require("./observable");
observable_1.Observable.prototype.map = function (f) {
    // ... another exercise for the reader
};
observable_1.Observable.prototype.map = function (f) {
    // ... another exercise for the reader
};
require("./map");
var o;
o.map(function (x) { return x.toFixed(); });
/*
The module name is resolved the same way as module specifiers in import/export. See Modules for more information. Then the declarations in an augmentation are merged as if they were declared in the same file as the original. However, you can’t declare new top-level declarations in the augmentation – just patches to existing declarations.

 */
/*
Global augmentation

You can also add declarations to the global scope from inside a module:

 */
// observable.ts
var Observable = (function () {
    function Observable() {
    }
    return Observable;
}());
exports.Observable = Observable;
Array.prototype.toObservable = function () {
    // ...
};
//Global augmentations have the same behavior and limits as module augmentations. 
