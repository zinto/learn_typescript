/*
Writing Declaration Files
Introduction

When using an external JavaScript library, or new host API, you’ll need to use a declaration file (.d.ts) to describe the shape of that library. This guide covers a few high-level concepts specific to writing declaration files, then proceeds with a number of examples that show how to transcribe various concepts to their matching declaration file descriptions.
 */
"use strict";
MyPoint.z = 4; // OK
/*
Whether or not you want your declarations to be extensible in this way is a bit of a judgement call. As always, try to represent the intent of the library here.

*/
/*
Class Decomposition

Classes in TypeScript create two separate types: the instance type, which defines what members an instance of a class has, and the constructor function type, which defines what members the class constructor function has. The constructor function type is also known as the “static side” type because it includes static members of the class.

While you can reference the static side of a class using the typeof keyword, it is sometimes useful or necessary when writing declaration files to use the decomposed class pattern which explicitly separates the instance and static types of class.

As an example, the following two declarations are nearly equivalent from a consumption perspective:

 */
//Standard
var A = (function () {
    function A(m) {
    }
    return A;
}());
//The trade-offs here are as follows:
/*

Standard classes can be inherited from using extends; decomposed classes cannot. This might change in later version of TypeScript if arbitrary extends expressions are allowed.
It is possible to add members later (through declaration merging) to the static side of both standard and decomposed classes
It is possible to add instance members to decomposed classes, but not standard classes
You’ll need to come up with sensible names for more types when writing a decomposed class
 */
/*
Naming Conventions

In general, you shouldn’t prefix interfaces with I (e.g. IColor). Because the concept of an interface in TypeScript is much more broad than in C# or Java, the IFoo naming convention is not broadly useful.

 */
/*
Examples

Let’s jump in to the examples section. For each example, sample usage of the library is provided, followed by the declaration code that accurately types the usage. When there are multiple good representations, more than one declaration sample might be listed.

 */
//Options Objects
//Usage
animalFactory.create("dog");
animalFactory.create("giraffe", { name: "ronald" });
animalFactory.create("panda", { name: "bob", height: 400 });
// Invalid: name must be provided if options is given
animalFactory.create("cat", { height: 32 });
//Typing
var animalFactory;
(function (animalFactory) {
})(animalFactory || (animalFactory = {}));
/*
Functions with Properties

Usage
 */
zooKeeper.workSchedule = "morning";
zooKeeper(giraffeCage);
var zooKeeper;
(function (zooKeeper) {
    var workSchedule;
})(zooKeeper || (zooKeeper = {}));
/*
New + callable methods

Usage
 */
var w = widget(32, 16);
var y = new widget("sprocket");
// w and y are both widgets
w.sprock();
y.sprock();
/*
Global / External-agnostic Libraries

Usage
 */
// Either
var x = require('zoo');
x.open();
// or
zoo.open();
/*
Single Complex Object in Modules

Usage

 */
// Super-chainable library for eagles
var Eagle = require('./eagle');
// Call directly
Eagle('bald').fly();
// Invoke with new
var eddie = new Eagle('Mille');
// Set properties
eddie.kind = 'golden';
/*
Function as an Module

This is a common pattern for modules whose imported entities are callable functions.

Usage
 */
var sayHello = require("say-hello");
sayHello("Travis");
/*

Callbacks

Usage
 */
addLater(3, 4, function (x) { return console.log('x = ' + x); });
(function (sum) { return void ; });
void ;
module.exports = Eagle;
//Please post a comment here if there’s a pattern you’d like to see documented! We’ll add to this as we can. 
