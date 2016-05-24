var lettersRegexp = /^[A-Za-z]+$/;
var numberRegexp = /^[0-9]+$/;
var LettersOnlyValidator = (function () {
    function LettersOnlyValidator() {
    }
    LettersOnlyValidator.prototype.isAcceptable = function (s) {
        return lettersRegexp.test(s);
    };
    return LettersOnlyValidator;
}());
var ZipCodeValidator = (function () {
    function ZipCodeValidator() {
    }
    ZipCodeValidator.prototype.isAcceptable = function (s) {
        return s.length === 5 && numberRegexp.test(s);
    };
    return ZipCodeValidator;
}());
// Some samples to try
var strings = ["Hello", "98052", "101"];
// Validators to use
var validators = {};
validators["ZIP code"] = new ZipCodeValidator();
validators["Letters only"] = new LettersOnlyValidator();
// Show whether each string passed each validator
for (var _a = 0, strings_1 = strings; _a < strings_1.length; _a++) {
    var s_1 = strings_1[_a];
    for (var name_1 in validators) {
        var isMatch = validators[name_1].isAcceptable(s_1);
        console.log("'" + s_1 + "' " + (isMatch ? "matches" : "does not match") + " '" + name_1 + "'.");
    }
}
/**
 Namespacing

As we add more validators, we’re going to want to have some kind of organization scheme so that we can keep track of our types and not worry about name collisions with other objects. Instead of putting lots of different names into the global namespace, let’s wrap up our objects into a namespace.

In this example, we’ll move all validator-related entities into a namespace called Validation. Because we want the interfaces and classes here to be visible outside the namespace, we preface them with export. Conversely, the variables lettersRegexp and numberRegexp are implementation details, so they are left unexported and will not be visible to code outside the namespace. In the test code at the bottom of the file, we now need to qualify the names of the types when used outside the namespace, e.g. Validation.LettersOnlyValidator.

Namespaced Validators

 */
var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var numberRegexp = /^[0-9]+$/;
    var LettersOnlyValidator = (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    Validation.LettersOnlyValidator = LettersOnlyValidator;
    var ZipCodeValidator = (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    Validation.ZipCodeValidator = ZipCodeValidator;
})(Validation || (Validation = {}));
// Some samples to try
var strings = ["Hello", "98052", "101"];
// Validators to use
var validators = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (var _b = 0, strings_2 = strings; _b < strings_2.length; _b++) {
    var s_2 = strings_2[_b];
    for (var name in validators) {
        console.log("\"" + s_2 + "\" - " + (validators[name].isAcceptable(s_2) ? "matches" : "does not match") + " " + name);
    }
}
//LettersOnlyValidator.ts
/// <reference path="Validation.ts" />
var Validation;
(function (Validation) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var LettersOnlyValidator = (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    Validation.LettersOnlyValidator = LettersOnlyValidator;
})(Validation || (Validation = {}));
//ZipCodeValidator.ts
/// <reference path="Validation.ts" />
var Validation;
(function (Validation) {
    var numberRegexp = /^[0-9]+$/;
    var ZipCodeValidator = (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    Validation.ZipCodeValidator = ZipCodeValidator;
})(Validation || (Validation = {}));
//Test.ts
/// <reference path="Validation.ts" />
/// <reference path="LettersOnlyValidator.ts" />
/// <reference path="ZipCodeValidator.ts" />
// Some samples to try
var strings = ["Hello", "98052", "101"];
// Validators to use
var validators = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();
// Show whether each string passed each validator
for (var _c = 0, strings_3 = strings; _c < strings_3.length; _c++) {
    var s_3 = strings_3[_c];
    for (var name_2 in validators) {
        console.log("", " + s + ", " " + (validators[name_2].isAcceptable(s_3) ? " matches " : " does not match ") + name_2);
    }
}
/**
 
Once there are multiple files involved, we’ll need to make sure all of the compiled code gets loaded. There are two ways of doing this.

First, we can use concatenated output using the --outFile flag to compile all of the input files into a single JavaScript output file:

tsc --outFile sample.js Test.ts
The compiler will automatically order the output file based on the reference tags present in the files. You can also specify each file individually:

tsc --outFile sample.js Validation.ts LettersOnlyValidator.ts ZipCodeValidator.ts Test.ts
Alternatively, we can use per-file compilation (the default) to emit one JavaScript file for each input file. If multiple JS files get produced, we’ll need to use <script> tags on our webpage to load each emitted file in the appropriate order, for example:

 */
//MyTestPage.html (excerpt)
/**
 <script src="Validation.js" type="text/javascript" />
<script src="LettersOnlyValidator.js" type="text/javascript" />
<script src="ZipCodeValidator.js" type="text/javascript" />
<script src="Test.js" type="text/javascript" />

 */
/**
 Aliases

Another way that you can simplify working with of namespaces is to use import q = x.y.z to create shorter names for commonly-used objects. Not to be confused with the import x = require("name") syntax used to load modules, this syntax simply creates an alias for the specified symbol. You can use these sorts of imports (commonly referred to as aliases) for any kind of identifier, including objects created from module imports.

 */
var Shapes;
(function (Shapes) {
    var Polygons;
    (function (Polygons) {
        var Triangle = (function () {
            function Triangle() {
            }
            return Triangle;
        }());
        Polygons.Triangle = Triangle;
        var Square = (function () {
            function Square() {
            }
            return Square;
        }());
        Polygons.Square = Square;
    })(Polygons = Shapes.Polygons || (Shapes.Polygons = {}));
})(Shapes || (Shapes = {}));
var polygons = Shapes.Polygons;
var sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"
