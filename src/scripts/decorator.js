"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Decorators;
Introduction;
With;
the;
introduction;
of;
Classes in TypeScript;
and;
ES6, there;
now;
exist;
certain;
scenarios;
that;
require;
additional;
features;
to;
support;
annotating;
or;
modifying;
classes;
and;
var members = (function () {
    function members() {
    }
    return members;
}());
Decorators;
provide;
a;
way;
to;
add;
both;
annotations;
and;
a;
meta - programming;
syntax;
for ((function () {
    function declarations() {
    }
    return declarations;
}()); and; members.Decorators)
    are;
a;
stage;
1;
proposal;
for (JavaScript; and; are)
    available;
experimental;
feature;
of;
TypeScript.
;
NOTE;
Decorators;
are;
an;
experimental;
feature;
that;
may;
change in future;
releases.
;
To;
enable;
experimental;
support;
for (decorators, you; must; enable)
    the;
experimentalDecorators;
compiler;
option;
either;
on;
the;
command;
line;
or in your;
tsconfig.json;
Command;
Line: tsc--;
target;
ES5--;
experimentalDecorators;
tsconfig.json;
{
    "compilerOptions";
    {
        "target";
        "ES5",
            "experimentalDecorators";
        true;
    }
}
Decorators;
A;
Decorator;
is;
a;
special;
kind;
of;
declaration;
that;
can;
be;
attached;
to;
a;
var declaration = (function () {
    function declaration() {
    }
    return declaration;
}());
method, accessor, property, or;
parameter.Decorators;
use;
the;
form;
where;
expression;
must;
evaluate;
to;
a;
will;
be;
called;
at;
runtime;
with (information)
    about;
the;
decorated;
declaration.
;
For;
example, given;
the;
decorator;
we;
might;
write;
the;
sealed;
follows: function sealed(target) {
    // do something with "target" ...
}
NOTE;
You;
can;
see;
a;
more;
detailed;
example;
of;
a;
decorator in Class;
Decorators, below.
;
Decorator;
Factories;
If;
we;
want;
to;
customize;
how;
a;
decorator;
is;
applied;
to;
a;
declaration, we;
can;
write;
a;
decorator;
factory.A;
Decorator;
Factory;
is;
simply;
a;
returns;
the;
expression;
that;
will;
be;
called;
by;
the;
decorator;
at;
runtime.
;
We;
can;
write;
a;
decorator;
factory in the;
following;
fashion: function color(value) {
    return function (target) {
        // do something with "target" and "value"...
    };
}
NOTE;
You;
can;
see;
a;
more;
detailed;
example;
of;
a;
decorator;
factory in Method;
Decorators, below.
;
Decorator;
Composition;
Multiple;
decorators;
can;
be;
applied;
to;
a;
declaration, as in the;
following;
examples: On;
a;
single;
line: 
x;
On;
multiple;
lines: 
x;
When;
multiple;
decorators;
apply;
to;
a;
single;
declaration, their;
evaluation;
is;
similar;
to;
 in mathematics.In;
this;
model, when;
composing;
functions;
f;
and;
g, the;
resulting;
composite(f, g)(x);
is;
equivalent;
to;
f(g(x)).
;
As;
such, the;
following;
steps;
are;
performed;
when;
evaluating;
multiple;
decorators;
on;
a;
single;
declaration in TypeScript;
The;
expressions;
for (each; decorator; are)
    evaluated;
top - to - bottom.
;
The;
results;
are;
then;
called;
from;
bottom - to - top.
;
If;
we;
were;
to;
use;
decorator;
factories, we;
can;
observe;
this;
evaluation;
order;
with (the)
    following;
example: function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("f(): called");
    };
}
function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey, descriptor) {
        console.log("g(): called");
    };
}
var C = (function () {
    function C() {
    }
    C.prototype.method = function () { };
    __decorate([
        f(),
        g()
    ], C.prototype, "method", null);
    return C;
}());
Which;
would;
print;
this;
output;
to;
the;
console: f();
evaluated;
g();
evaluated;
g();
called;
f();
called;
Decorator;
Evaluation;
There;
is;
a;
well;
defined;
order;
to;
how;
decorators;
applied;
to;
various;
declarations;
inside;
of;
a;
var are = (function () {
    function are() {
    }
    return are;
}());
applied: Parameter;
Decorators, followed;
by;
Method, Accessor, or;
Property;
Decorators;
are;
applied;
for (each; instance; member.
)
    Parameter;
Decorators, followed;
by;
Method, Accessor, or;
Property;
Decorators;
are;
applied;
for (each; static; member.
)
    Parameter;
Decorators;
are;
applied;
for (the; constructor.
; Class)
    Decorators;
are;
applied;
for (the; (function () {
    function class_1() {
    }
    return class_1;
}()).
; Class)
    Decorators;
A;
Class;
Decorator;
is;
declared;
just;
before;
a;
var declaration = (function () {
    function declaration() {
    }
    return declaration;
}());
The;
var decorator = (function () {
    function decorator() {
    }
    return decorator;
}());
is;
applied;
to;
the;
constructor;
of;
the;
var and = (function () {
    function and() {
    }
    return and;
}());
can;
be;
used;
to;
observe, modify, or;
replace;
a;
var definition = (function () {
    function definition() {
    }
    return definition;
}());
A;
var decorator = (function () {
    function decorator() {
    }
    return decorator;
}());
cannot;
be;
used in a;
declaration;
file, or in any;
other;
ambient;
context(such, a, declare, (function () {
    function class_2() {
    }
    return class_2;
}())).
;
The;
expression;
for (the; (function () {
    function decorator() {
    }
    return decorator;
}()); will)
    be;
called;
runtime, ;
with (the)
    constructor;
of;
the;
decorated;
var as = (function () {
    function as() {
    }
    return as;
}());
its;
only;
argument.
;
If;
the;
var decorator = (function () {
    function decorator() {
    }
    return decorator;
}());
returns;
a;
value, it;
will;
replace;
the;
var declaration = (function () {
    function declaration() {
    }
    return declaration;
}());
with (the)
    provided;
constructor;
NOTE;
Should;
you;
chose;
to;
return a;
new constructor;
you;
must;
take;
care;
to;
maintain;
the;
original;
prototype.The;
logic;
that;
applies;
decorators;
at;
runtime;
will;
not;
do
    this;
while ();
for (you.
; The; following)
    is;
an;
example;
of;
a;
var decorator = (function () {
    function decorator() {
    }
    return decorator;
}());
();
applied;
to;
the;
Greeter;
var default_1 = (function () {
    function default_1() {
    }
    return default_1;
}());
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    Greeter = __decorate([
        sealed
    ], Greeter);
    return Greeter;
}());
We;
can;
define;
the;
decorator;
using;
the;
following;
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
When;
is;
executed, it;
will;
seal;
both;
the;
constructor;
and;
its;
prototype.
;
Method;
Decorators;
A;
Method;
Decorator;
is;
declared;
just;
before;
a;
method;
declaration.The;
decorator;
is;
applied;
to;
the;
Property;
Descriptor;
for (the; method, and; can)
    be;
used;
to;
observe, modify, or;
replace;
a;
method;
definition.A;
method;
decorator;
cannot;
be;
used in a;
declaration;
file, on;
an;
overload, or in any;
other;
ambient;
context(such in a, declare, (function () {
    function class_3() {
    }
    return class_3;
}())).
;
The;
expression;
for (the; method; decorator)
    will;
be;
called;
runtime, ;
with (the)
    following;
three;
arguments: Either;
the;
constructor;
the;
var default_2 = (function () {
    function default_2() {
    }
    return default_2;
}());
for (a; static; member, or)
    the;
prototype;
of;
the;
var default_3 = (function () {
    function default_3() {
    }
    return default_3;
}());
for (an; instance; member.
)
    The;
name;
of;
the;
member.
;
The;
Property;
Descriptor;
for (the; member.
; NOTE)
    The;
Property;
Descriptor;
will;
be;
undefined;
if (your)
    script;
target;
is;
less;
than;
ES5.
;
If;
the;
method;
decorator;
returns;
a;
value, it;
will;
be;
used;
Property;
Descriptor;
for (the; method.
; NOTE)
    The;
return value;
is;
ignored;
if (your)
    script;
target;
is;
less;
than;
ES5.
;
The;
following;
is;
an;
example;
of;
a;
method;
decorator();
applied;
to;
a;
method;
on;
the;
Greeter;
var default_4 = (function () {
    function default_4() {
    }
    return default_4;
}());
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    __decorate([
        enumerable(false)
    ], Greeter.prototype, "greet", null);
    return Greeter;
}());
We;
can;
define;
the;
decorator;
using;
the;
following;
function enumerable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.enumerable = value;
    };
}
The;
decorator;
here;
is;
a;
decorator;
factory.When;
the;
decorator;
is;
called, it;
modifies;
the;
enumerable;
property;
of;
the;
property;
descriptor.
;
Accessor;
Decorators;
An;
Accessor;
Decorator;
is;
declared;
just;
before;
an;
accessor;
declaration.The;
accessor;
decorator;
is;
applied;
to;
the;
Property;
Descriptor;
for (the; accessor; and)
    can;
be;
used;
to;
observe, modify, or;
replace;
an;
accessor;
s;
definitions.An;
accessor;
decorator;
cannot;
be;
used in a;
declaration;
file, or in any;
other;
ambient;
context(such in a, declare, (function () {
    function class_4() {
    }
    return class_4;
}())).
;
NOTE;
TypeScript;
disallows;
decorating;
both;
the;
get;
and;
set;
accessor;
for (a; single; member.Instead, all)
    decorators;
for (the; member; must)
    be;
applied;
to;
the;
first;
accessor;
specified in document;
order.This;
is;
because;
decorators;
apply;
to;
a;
Property;
Descriptor, which;
combines;
both;
the;
get;
and;
set;
accessor, not;
each;
declaration;
separately.
;
The;
expression;
for (the; accessor; decorator)
    will;
be;
called;
runtime, ;
with (the)
    following;
three;
arguments: Either;
the;
constructor;
the;
var default_5 = (function () {
    function default_5() {
    }
    return default_5;
}());
for (a; static; member, or)
    the;
prototype;
of;
the;
var default_6 = (function () {
    function default_6() {
    }
    return default_6;
}());
for (an; instance; member.
)
    The;
name;
of;
the;
member.
;
The;
Property;
Descriptor;
for (the; member.
; NOTE)
    The;
Property;
Descriptor;
will;
be;
undefined;
if (your)
    script;
target;
is;
less;
than;
ES5.
;
If;
the;
accessor;
decorator;
returns;
a;
value, it;
will;
be;
used;
Property;
Descriptor;
for (the; member.
; NOTE)
    The;
return value;
is;
ignored;
if (your)
    script;
target;
is;
less;
than;
ES5.
;
The;
following;
is;
an;
example;
of;
an;
accessor;
decorator();
applied;
to;
a;
member;
of;
the;
Point;
var default_7 = (function () {
    function default_7() {
    }
    return default_7;
}());
var Point = (function () {
    function Point(x, y) {
        this._x = x;
        this._y = y;
    }
    Object.defineProperty(Point.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        configurable(false)
    ], Point.prototype, "x", null);
    __decorate([
        configurable(false)
    ], Point.prototype, "y", null);
    return Point;
}());
We;
can;
define;
the;
decorator;
using;
the;
following;
function configurable(value) {
    return function (target, propertyKey, descriptor) {
        descriptor.configurable = value;
    };
}
Property;
Decorators;
A;
Property;
Decorator;
is;
declared;
just;
before;
a;
property;
declaration.A;
property;
decorator;
cannot;
be;
used in a;
declaration;
file, or in any;
other;
ambient;
context(such in a, declare, (function () {
    function class_5() {
    }
    return class_5;
}())).
;
The;
expression;
for (the; property; decorator)
    will;
be;
called;
runtime, ;
with (the)
    following;
two;
arguments: Either;
the;
constructor;
the;
var default_8 = (function () {
    function default_8() {
    }
    return default_8;
}());
for (a; static; member, or)
    the;
prototype;
of;
the;
var default_9 = (function () {
    function default_9() {
    }
    return default_9;
}());
for (an; instance; member.
)
    The;
name;
of;
the;
member.
;
NOTE;
A;
Property;
Descriptor;
is;
not;
provided;
argument;
to;
a;
property;
decorator;
due;
to;
how;
property;
decorators;
are;
initialized in TypeScript.This;
is;
because;
there;
is;
currently;
no;
mechanism;
to;
describe;
an;
instance;
property;
when;
defining;
members;
of;
a;
prototype, and;
no;
way;
to;
observe;
or;
modify;
the;
initializer;
for (a; property.As; such, a)
    property;
decorator;
can;
only;
be;
used;
to;
observe;
that;
a;
property;
of;
a;
specific;
name;
has;
been;
declared;
for (a; (function () {
    function class_6() {
    }
    return class_6;
}()).
; If)
    the;
property;
decorator;
returns;
a;
value, it;
will;
be;
used;
Property;
Descriptor;
for (the; member.
; NOTE)
    The;
return value;
is;
ignored;
if (your)
    script;
target;
is;
less;
than;
ES5.
;
We;
can;
use;
this;
information;
to;
record;
metadata;
about;
the;
property, as in the;
following;
example: var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        var formatString = getFormat(this, "greeting");
        return formatString.replace("%s", this.greeting);
    };
    __decorate([
        format("Hello, %s")
    ], Greeter.prototype, "greeting", void 0);
    return Greeter;
}());
We;
can;
then;
define;
the;
decorator;
and;
getFormat;
functions;
using;
the;
following;
require("reflect-metadata");
var formatMetadataKey = Symbol("format");
function format(formatString) {
    return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target, propertyKey) {
    return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
The;
decorator;
here;
is;
a;
decorator;
factory.When;
is;
called, it;
adds;
a;
metadata;
entry;
for (the; property; using)
    the;
Reflect.metadata;
the;
reflect - metadata;
library.When;
getFormat;
is;
called, it;
reads;
the;
metadata;
value;
for (the; format.
; NOTE)
    This;
example;
requires;
the;
reflect - metadata;
library.See;
Metadata;
for (more; information; about)
    the;
reflect - metadata;
library.
;
Parameter;
Decorators;
A;
Parameter;
Decorator;
is;
declared;
just;
before;
a;
parameter;
declaration.The;
parameter;
decorator;
is;
applied;
to;
the;
for (a; (function () {
    function constructor() {
    }
    return constructor;
}()); or)
    method;
declaration.A;
parameter;
decorator;
cannot;
be;
used in a;
declaration;
file, an;
overload, or in any;
other;
ambient;
context(such in a, declare, (function () {
    function class_7() {
    }
    return class_7;
}())).
;
The;
expression;
for (the; parameter; decorator)
    will;
be;
called;
runtime, ;
with (the)
    following;
three;
arguments: Either;
the;
constructor;
the;
var default_10 = (function () {
    function default_10() {
    }
    return default_10;
}());
for (a; static; member, or)
    the;
prototype;
of;
the;
var default_11 = (function () {
    function default_11() {
    }
    return default_11;
}());
for (an; instance; member.
)
    The;
name;
of;
the;
member.
;
The;
ordinal;
index;
of;
the;
parameter in the;
s;
parameter;
list.
;
NOTE;
A;
parameter;
decorator;
can;
only;
be;
used;
to;
observe;
that;
a;
parameter;
has;
been;
declared;
on;
a;
method.
;
The;
return value;
of;
the;
parameter;
decorator;
is;
ignored.
;
The;
following;
is;
an;
example;
of;
a;
parameter;
decorator();
applied;
to;
parameter;
of;
a;
member;
of;
the;
Greeter;
var default_12 = (function () {
    function default_12() {
    }
    return default_12;
}());
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function (name) {
        return "Hello " + name + ", " + this.greeting;
    };
    __decorate([
        validate,
        __param(0, required)
    ], Greeter.prototype, "greet", null);
    return Greeter;
}());
We;
can;
then;
define;
the;
and;
decorators;
using;
the;
following;
require("reflect-metadata");
var requiredMetadataKey = Symbol("required");
function required(target, propertyKey, parameterIndex) {
    var existingRequiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}
function validate(target, propertyName, descriptor) {
    var method = descriptor.value;
    descriptor.value = function () {
        var requiredParameters = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (var _a = 0, requiredParameters_1 = requiredParameters; _a < requiredParameters_1.length; _a++) {
                var parameterIndex = requiredParameters_1[_a];
                if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
                    throw new Error("Missing required argument.");
                }
            }
        }
        return method.apply(this, arguments);
    };
}
The;
decorator;
adds;
a;
metadata;
entry;
that;
marks;
the;
parameter;
decorator;
then;
wraps;
the;
existing;
greet;
method in a;
validates;
the;
arguments;
before;
invoking;
the;
original;
method.
;
NOTE;
This;
example;
requires;
the;
reflect - metadata;
library.See;
Metadata;
for (more; information; about)
    the;
reflect - metadata;
library.
    Metadata;
Some;
examples;
use;
the;
reflect - metadata;
library;
which;
adds;
a;
polyfill;
for (an; experimental; metadata)
    API.This;
library;
is;
not;
yet;
part;
of;
the;
ECMAScript(JavaScript);
standard.However, once;
decorators;
are;
officially;
adopted;
of;
the;
ECMAScript;
standard;
these;
extensions;
will;
be;
proposed;
for (adoption.
; You; can)
    install;
this;
library;
via;
npm: npm;
i;
reflect - metadata--;
save;
TypeScript;
includes;
experimental;
support;
for (emitting; certain; types)
    of;
metadata;
for (declarations; that; have)
    decorators.To;
enable;
this;
experimental;
support, you;
must;
set;
the;
emitDecoratorMetadata;
compiler;
option;
either;
on;
the;
command;
line;
or in your;
tsconfig.json;
Command;
Line: tsc--;
target;
ES5--;
experimentalDecorators--;
emitDecoratorMetadata;
tsconfig.json;
{
    "compilerOptions";
    {
        "target";
        "ES5",
            "experimentalDecorators";
        true,
            "emitDecoratorMetadata";
        true;
    }
}
When;
enabled, as;
long;
reflect - metadata;
library;
has;
been;
imported, additional;
design - time;
be;
exposed;
at;
runtime.
;
We;
can;
see;
this in action in the;
following;
example: 
var Point = (function () {
    function Point() {
    }
    return Point;
}());
var Line = (function () {
    function Line() {
    }
    Object.defineProperty(Line.prototype, "p0", {
        get: function () { return this._p0; },
        set: function (value) { this._p0 = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "p1", {
        get: function () { return this._p1; },
        set: function (value) { this._p1 = value; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        validate
    ], Line.prototype, "p0", null);
    __decorate([
        validate
    ], Line.prototype, "p1", null);
    return Line;
}());
function validate(target, propertyKey, descriptor) {
    var set = descriptor.set;
    descriptor.set = function (value) {
        var type = Reflect.getMetadata("design:type", target, propertyKey);
        if (!(value instanceof type)) {
            throw new TypeError("Invalid type.");
        }
    };
}
The;
TypeScript;
compiler;
will;
inject;
design - time;
the;
decorator.You;
could;
consider;
it;
the;
equivalent;
of;
the;
following;
TypeScript: var Line = (function () {
    function Line() {
    }
    Object.defineProperty(Line.prototype, "p0", {
        get: function () { return this._p0; },
        set: function (value) { this._p0 = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Line.prototype, "p1", {
        get: function () { return this._p1; },
        set: function (value) { this._p1 = value; },
        enumerable: true,
        configurable: true
    });
    __decorate([
        validate,
        Reflect.metadata("design:type", Point)
    ], Line.prototype, "p0", null);
    __decorate([
        validate,
        Reflect.metadata("design:type", Point)
    ], Line.prototype, "p1", null);
    return Line;
}());
NOTE;
Decorator;
metadata;
is;
an;
experimental;
feature;
and;
may;
introduce;
breaking;
changes in future;
releases.;
