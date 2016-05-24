/**
 Namespaces and Modules
A note about terminology: It’s important to note that in TypeScript 1.5, the nomenclature has changed. “Internal modules” are now “namespaces”. “External modules” are now simply “modules”, as to align with ECMAScript 2015’s terminology, (namely that module X { is equivalent to the now-preferred namespace X {).
Introduction

This post outlines the various ways to organize your code using namespaces and modules in TypeScript. We’ll also go over some advanced topics of how to use namespaces and modules, and address some common pitfalls when using them in TypeScript.

See the Modules documentation for more information about modules. See the Namespaces documentation for more information about namespaces.

 */
"use strict";
/*
The reference tag here allows us to locate the declaration file that contains the declaration for the ambient module. This is how the node.d.ts file that several of the TypeScript samples use is consumed.

Needless Namespacing

If you’re converting a program from namespaces to modules, it can be easy to end up with a file that looks like this:
 */
//shapes.ts
var Shapes;
(function (Shapes) {
    var Triangle = (function () {
        function Triangle() {
        }
        return Triangle;
    }());
    Shapes.Triangle = Triangle;
    var Square = (function () {
        function Square() {
        }
        return Square;
    }());
    Shapes.Square = Square;
})(Shapes = exports.Shapes || (exports.Shapes = {}));
/*
The top-level module here Shapes wraps up Triangle and Square for no reason. This is confusing and annoying for consumers of your module:
 */
//shapeConsumer.ts
var shapes = require("./shapes");
var t = new shapes.Shapes.Triangle(); // shapes.Shapes?
/*
A key feature of modules in TypeScript is that two different modules will never contribute names to the same scope. Because the consumer of a module decides what name to assign it, there’s no need to proactively wrap up the exported symbols in a namespace.

To reiterate why you shouldn’t try to namespace your module contents, the general idea of namespacing is to provide logical grouping of constructs and to prevent name collisions. Because the module file itself is already a logical grouping, and its top-level name is defined by the code that imports it, it’s unnecessary to use an additional module layer for exported objects.

Here’s a revised example:
*/
//shapes.ts
var Triangle = (function () {
    function Triangle() {
    }
    return Triangle;
}());
exports.Triangle = Triangle;
var Square = (function () {
    function Square() {
    }
    return Square;
}());
exports.Square = Square;
var t = new shapes.Triangle();
/*
Trade-offs of Modules

Just as there is a one-to-one correspondence between JS files and modules, TypeScript has a one-to-one correspondence between module source files and their emitted JS files. One effect of this is that it’s not possible to use the --outFile compiler switch to concatenate multiple module source files into a single JavaScript file.
*/ 
