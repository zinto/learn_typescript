/**
 Modules
A note about terminology: It’s important to note that in TypeScript 1.5, the nomenclature has changed. “Internal modules” are now “namespaces”. “External modules” are now simply “modules”, as to align with ECMAScript 2015’s terminology, (namely that module X { is equivalent to the now-preferred namespace X {).
    
Introduction

Starting with the ECMAScript 2015, JavaScript has a concept of modules. TypeScript shares this concept.

Modules are executed within their own scope, not in the global scope; this means that variables, functions, classes, etc. declared in a module are not visible outside the module unless they are explicitly exported using one of the export forms. Conversely, to consume a variable, function, class, interface, etc. exported from a different module, it has to be imported using one of the import forms.

Modules are declarative; the relationships between modules are specified in terms of imports and exports at the file level.

Modules import one another using a module loader. At runtime the module loader is responsible for locating and executing all dependencies of a module before executing it. Well-known modules loaders used in JavaScript are the CommonJS module loader for Node.js and require.js for Web applications.

In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.

 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
//ZipCodeValidator.ts
exports.numberRegexp = /^[0-9]+$/;
var ZipCodeValidator = (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && exports.numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
exports.ZipCodeValidator = ZipCodeValidator;
/**
 
Export statements

Export statements are handy when exports need to be renamed for consumers, so the above example can be written as:

 */
var ZipCodeValidator = (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && exports.numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
/**
 Re-exports

Often modules extend other modules, and partially expose some of their features. A re-export does not import it locally, or introduce a local variable.

ParseIntBasedZipCodeValidator.ts

 */
var ParseIntBasedZipCodeValidator = (function () {
    function ParseIntBasedZipCodeValidator() {
    }
    ParseIntBasedZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && parseInt(s).toString() === s;
    };
    return ParseIntBasedZipCodeValidator;
}());
exports.ParseIntBasedZipCodeValidator = ParseIntBasedZipCodeValidator;
// Export original validator but rename it
/**
Optionally, a module can wrap one or more modules and combine all their exports using export * from "module" syntax.

AllValidators.ts

 */
__export(require("./StringValidator")); // exports interface StringValidator
__export(require("./LettersOnlyValidator")); // exports class LettersOnlyValidator
__export(require("./ZipCodeValidator")); // exports class ZipCodeValidator
/**
 Import

Importing is just about as easy as exporting from an module. Importing an exported declaration is done through using one of the import forms below:

Import a single export from a module

 */
var ZipCodeValidator_2 = require("./ZipCodeValidator");
var myValidator = new ZipCodeValidator_2.ZipCodeValidator();
//imports can also be renamed
var ZipCodeValidator_3 = require("./ZipCodeValidator");
var myValidator = new ZipCodeValidator_3.ZipCodeValidator();
//Import the entire module into a single variable, and use it to access the module exports
var validator = require("./ZipCodeValidator");
var myValidator = new validator.ZipCodeValidator();
/**
 Import a module for side-effects only

Though not recommended practice, some modules set up some global state that can be used by other modules. These modules may not have any exports, or the consumer is not interested in any of their exports. To import these modules, use:

 */
require("./my-module.js");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JQuery_1.default;
//App.ts
var JQuery_1 = require("JQuery");
JQuery_1.default("button.continue").html("Next Step...");
/**
 Classes and function declarations can be authored directly as default exports. Default export class and function declaration names are optional.

ZipCodeValidator.ts
*/
var ZipCodeValidator = (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && ZipCodeValidator_2.ZipCodeValidator.numberRegexp.test(s);
    };
    ZipCodeValidator.numberRegexp = /^[0-9]+$/;
    return ZipCodeValidator;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ZipCodeValidator;
var myValidator = new validator();
//or
//StaticZipCodeValidator.ts
var numberRegexp = /^[0-9]+$/;
function default_1(s) {
    return s.length === 5 && exports.numberRegexp.test(s);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//Test.ts
var StaticZipCodeValidator_1 = require("./StaticZipCodeValidator");
var strings = ["Hello", "98052", "101"];
// Use function validate
strings.forEach(function (s) {
    console.log("\"" + s + "\" " + (StaticZipCodeValidator_1.default(s) ? " matches" : " does not match"));
});
exports;
can;
also;
be;
just;
values: 
exports.default = "123";
//Log.ts
var OneTwoThree_1 = require("./OneTwoThree");
console.log(OneTwoThree_1.default); // "123"
require();
/**
 Both CommonJS and AMD generally have the concept of an exports object which contains all exports from a module.

They also support replacing the exports object with a custom single object. Default exports are meant to act as a replacement for this behavior; however, the two are incompatible. TypeScript supports export = to model the traditional CommonJS and AMD workflow.

The export = syntax specifies a single object that is exported from the module. This can be a class, interface, namespace, function, or enum.

When importing a module using export =, TypeScript-specific import let = require("module") must be used to import the module.

ZipCodeValidator.ts
 */
var numberRegexp = /^[0-9]+$/;
var ZipCodeValidator = (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && exports.numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
//Test.ts
var zip = require("./ZipCodeValidator");
// Some samples to try
var strings = ["Hello", "98052", "101"];
// Validators to use
var validator = new zip();
// Show whether each string passed each validator
strings.forEach(function (s) {
    console.log("\"" + s + "\" - " + (validator.isAcceptable(s) ? "matches" : "does not match"));
});
/**
 Code Generation for Modules

Depending on the module target specified during compilation, the compiler will generate appropriate code for Node.js (CommonJS), require.js (AMD), isomorphic (UMD), SystemJS, or ECMAScript 2015 native modules (ES6) module-loading systems. For more information on what the define, require and register calls in the generated code do, consult the documentation for each module loader.

This simple example shows how the names used during importing and exporting get translated into the module loading code.

SimpleModule.ts

 */
var m = require("mod");
exports.t = m.something + 1;
//AMD / RequireJS SimpleModule.js
define(["require", "exports", "./mod"], function (require, exports, mod_1) {
    exports.t = mod_1.something + 1;
});
//CommonJS / Node SimpleModule.js
var mod_1 = require("./mod");
exports.t = mod_1.something + 1;
//UMD SimpleModule.js
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined)
            module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./mod"], factory);
    }
})(function (require, exports) {
    var mod_1 = require("./mod");
    exports.t = mod_1.something + 1;
});
//System SimpleModule.js
System.register(["./mod"], function (exports_1) {
    var mod_1;
    var t;
    return {
        setters: [
            function (mod_1_1) {
                mod_1 = mod_1_1;
            }],
        execute: function () {
            exports_1("t", t = mod_1.something + 1);
        }
    };
});
//Native ECMAScript 2015 modules SimpleModule.js
var mod_2 = require("./mod");
exports.t = mod_2.something + 1;
var lettersRegexp = /^[A-Za-z]+$/;
var LettersOnlyValidator = (function () {
    function LettersOnlyValidator() {
    }
    LettersOnlyValidator.prototype.isAcceptable = function (s) {
        return lettersRegexp.test(s);
    };
    return LettersOnlyValidator;
}());
exports.LettersOnlyValidator = LettersOnlyValidator;
var numberRegexp = /^[0-9]+$/;
var ZipCodeValidator = (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && exports.numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
exports.ZipCodeValidator = ZipCodeValidator;
var LettersOnlyValidator_2 = require("./LettersOnlyValidator");
// Some samples to try
var strings = ["Hello", "98052", "101"];
// Validators to use
var validators = {};
validators["ZIP code"] = new ZipCodeValidator_2.ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator_2.LettersOnlyValidator();
// Show whether each string passed each validator
strings.forEach(function (s) {
    for (var name_1 in validators) {
        console.log("\"" + s + "\" - " + (validators[name_1].isAcceptable(s) ? "matches" : "does not match") + " " + name_1);
    }
});
if (needZipValidation) {
    var ZipCodeValidator_4 = require("./ZipCodeValidator");
    var validator_1 = new ZipCodeValidator_4();
    if (validator_1.isAcceptable("...")) { }
}
if (needZipValidation) {
    require(["./ZipCodeValidator"], function (ZipCodeValidator) {
        var validator = new ZipCodeValidator();
        if (validator.isAcceptable("...")) { }
    });
}
if (needZipValidation) {
    System.import("./ZipCodeValidator").then(function (ZipCodeValidator) {
        var x = new ZipCodeValidator();
        if (x.isAcceptable("...")) { }
    });
}
/*
Now we can /// <reference> node.d.ts and then load the modules using import url = require("url");.
*/
/// <reference path="node.d.ts"/>
var URL = require("url");
var myUrl = URL.parse("http://www.typescriptlang.org");
/*
Guidance for structuring modules

Export as close to top-level as possible

Consumers of your module should have as little friction as possible when using things that you export. Adding too many levels of nesting tends to be cumbersome, so think carefully about how you want to structure things.

Exporting a namespace from your module is an example of adding too many layers of nesting. While namespaces sometimes have their uses, they add an extra level of indirection when using modules. This can quickly becomes a pain point for users, and is usually unnecessary.

Static methods on an exported class have a similar problem - the class itself adds a layer of nesting. Unless it increases expressivity or intent in a clearly useful way, consider simply exporting a helper function.

If you’re only exporting a single class or function, use export default

Just as “exporting near the top-level” reduces friction on your module’s consumers, so does introducing a default export. If a module’s primary purpose is to house one specific export, then you should consider exporting it as a default export. This makes both importing and actually using the import a little easier. For example:

MyClass.ts

 */
var SomeType = (function () {
    function SomeType() {
    }
    return SomeType;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SomeType;
//MyFunc.ts
function getThing() { return 'thing'; }
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getThing;
//Consumer.ts
var MyClass_1 = require("./MyClass");
var MyFunc_1 = require("./MyFunc");
var x = new exports.t();
console.log(MyFunc_1.default());
/*
This is optimal for consumers. They can name your type whatever they want (t in this case) and don’t have to do any excessive dotting to find your objects.

If you’re exporting multiple objects, put them all at top-level

MyThings.ts

*/
var SomeType = (function () {
    function SomeType() {
    }
    return SomeType;
}());
exports.SomeType = SomeType;
function someFunc() { }
exports.someFunc = someFunc;
/*
Conversly when importing:

Explicitlly list imported names

Consumer.ts

*/
var MyThings_1 = require("./MyThings");
var x = new MyThings_1.SomeType();
var y = MyThings_1.someFunc();
/*
Use the namespace import pattern if you’re importing a large number of things

MyLargeModule.ts

*/
var Dog = (function () {
    function Dog() {
    }
    return Dog;
}());
exports.Dog = Dog;
var Cat = (function () {
    function Cat() {
    }
    return Cat;
}());
exports.Cat = Cat;
var Tree = (function () {
    function Tree() {
    }
    return Tree;
}());
exports.Tree = Tree;
var Flower = (function () {
    function Flower() {
    }
    return Flower;
}());
exports.Flower = Flower;
//Consumer.ts
var myLargeModule = require("./MyLargeModule.ts");
var x = new myLargeModule.Dog();
/**
 Re-export to extend

Often you will need to extend functionality on a module. A common JS pattern is to augment the original object with extensions, similar to how JQuery extensions work. As we’ve mentioned before, modules do not merge like global namespace objects would. The recommended solution is to not mutate the original object, but rather export a new entity that provides the new functionality.

Consider a simple calculator implementation defined in module Calculator.ts. The module also exports a helper function to test the calculator functionality by passing a list of input strings and writing the result at the end.

Calculator.ts

 */
var Calculator = (function () {
    function Calculator() {
        this.current = 0;
        this.memory = 0;
    }
    Calculator.prototype.processDigit = function (digit, currentValue) {
        if (digit >= "0" && digit <= "9") {
            return currentValue * 10 + (digit.charCodeAt(0) - "0".charCodeAt(0));
        }
    };
    Calculator.prototype.processOperator = function (operator) {
        if (["+", "-", "*", "/"].indexOf(operator) >= 0) {
            return operator;
        }
    };
    Calculator.prototype.evaluateOperator = function (operator, left, right) {
        switch (this.operator) {
            case "+": return left + right;
            case "-": return left - right;
            case "*": return left * right;
            case "/": return left / right;
        }
    };
    Calculator.prototype.evaluate = function () {
        if (this.operator) {
            this.memory = this.evaluateOperator(this.operator, this.memory, this.current);
        }
        else {
            this.memory = this.current;
        }
        this.current = 0;
    };
    Calculator.prototype.handelChar = function (char) {
        if (char === "=") {
            this.evaluate();
            return;
        }
        else {
            var value = this.processDigit(char, this.current);
            if (value !== undefined) {
                this.current = value;
                return;
            }
            else {
                var value_1 = this.processOperator(char);
                if (value_1 !== undefined) {
                    this.evaluate();
                    this.operator = value_1;
                    return;
                }
            }
        }
        throw new Error("Unsupported input: '" + char + "'");
    };
    Calculator.prototype.getResult = function () {
        return this.memory;
    };
    return Calculator;
}());
exports.Calculator = Calculator;
function test(c, input) {
    for (var i_1 = 0; i_1 < input.length; i_1++) {
        c.handelChar(input[i_1]);
    }
    console.log("result of '" + input + "' is '" + c.getResult() + "'");
}
exports.test = test;
/*
Here is a simple test for the calculator using the exposed test function.

TestCalculator.ts

 */
var Calculator_1 = require("./Calculator");
var c = new Calculator_1.Calculator();
Calculator_1.test(c, "1+2*33/11="); // prints 9
var ProgrammerCalculator = (function (_super) {
    __extends(ProgrammerCalculator, _super);
    function ProgrammerCalculator(base) {
        _super.call(this);
        this.base = base;
        if (base <= 0 || base > ProgrammerCalculator.digits.length) {
            throw new Error("base has to be within 0 to 16 inclusive.");
        }
    }
    ProgrammerCalculator.prototype.processDigit = function (digit, currentValue) {
        if (ProgrammerCalculator.digits.indexOf(digit) >= 0) {
            return currentValue * this.base + ProgrammerCalculator.digits.indexOf(digit);
        }
    };
    ProgrammerCalculator.digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    return ProgrammerCalculator;
}(Calculator_1.Calculator));
// Export the new extended calculator as Calculator
// Also, export the helper function
var c = new Calculator_1.Calculator(2);
Calculator_1.test(c, "001+010="); // prints 3
/*
Do not use namespaces in modules

When first moving to a module-based organization, a common tendency is to wrap exports in an additional layer of namespaces. Modules have their own scope, and only exported declarations are visible from outside the module. With this in mind, namespace provide very little, if any, value when working with modules.

On the organization front, namespaces are handy for grouping together logically-related objects and types in the global scope. For example, in C#, you’re going to find all the collection types in System.Collections. By organizing our types into hierarchical namespaces, we provide a good “discovery” experience for users of those types. Modules, on the other hand, are already present in a file system, necessarily. We have to resolve them by path and filename, so there’s a logical organization scheme for us to use. We can have a /collections/generic/ folder with a list module in it.

Namespaces are important to avoid naming collisions in the global scope. For example, you might have My.Application.Customer.AddForm and My.Application.Order.AddForm – two types with the same name, but a different namespace. This, however, is not an issue with modules. Within a module, there’s no plausible reason to have two objects with the same name. From the consumption side, the consumer of any given module gets to pick the name that they will use to refer to the module, so accidental naming conflicts are impossible.

For more discussion about modules and namespaces see Namespaces and Modules.
Red Flags

All of the following are red flags for module structuring. Double-check that you’re not trying to namespace your external modules if any of these apply to your files:

A file whose only top-level declaration is export namespace Foo { ... } (remove Foo and move everything ‘up’ a level)
A file that has a single export class or export function (consider using export default)
Multiple files that have the same export namespace Foo { at top-level (don’t think that these are going to combine into one Foo!)
*/ 
