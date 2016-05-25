"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
JSX;
Introduction;
JSX;
is;
an;
embeddable;
XML - like;
syntax.It;
is;
meant;
to;
be;
transformed;
into;
valid;
JavaScript, though;
the;
semantics;
of;
that;
transformation;
are;
implementation - specific.JSX;
came;
to;
popularity;
with (the)
    React;
framework, but;
has;
since;
seen;
other;
applications;
supports;
embedding, type;
checking, and;
compiling;
JSX;
directly;
into;
JavaScript.
;
Basic;
usage;
In;
order;
to;
use;
JSX;
you;
must;
do
    two;
while (things.
);
Name;
your;
files;
with (a.tsx)
    extension;
Enable;
the;
jsx;
option;
TypeScript;
ships;
with (two)
    JSX;
modes: preserve;
and;
react.These;
modes;
only;
affect;
the;
emit;
stage - type;
checking;
is;
unaffected.The;
preserve;
mode;
will;
keep;
the;
JSX;
of;
the;
output;
to;
be;
further;
consumed;
by;
another;
transform;
step(e.g.Babel).Additionally;
the;
output;
will;
have;
a.jsx;
file;
extension.The;
react;
mode;
will;
emit;
React.createElement, does;
not;
need;
to;
go;
through;
a;
JSX;
transformation;
before;
use, and;
the;
output;
will;
have;
a.js;
file;
extension.
;
Mode;
Input;
Output;
Output;
File;
Extension;
preserve < div /  > />	.jsx;
react < div /  > React.createElement("div").js;
You;
can;
specify;
this;
mode;
using;
either;
the--;
jsx;
command;
line;
flag;
or;
the;
corresponding;
option in your;
tsconfig.json;
file.
    Note;
The;
identifier;
React;
is;
hard - coded, so;
you;
must;
make;
React;
available;
with (an)
    uppercase;
R.
;
The;
Recall;
how;
to;
write;
a;
var foo = bar;
Here;
we;
are;
asserting;
the;
variable;
bar;
to;
have;
the;
TypeScript;
also;
uses;
angle;
brackets;
for (type; assertions, JSX; )
    ;
s;
syntax;
introduces;
certain;
parsing;
difficulties.As;
a;
result, TypeScript;
disallows;
angle;
bracket;
 in .tsx;
files.
;
To;
make;
up;
for (this; loss; of)
    functionality in .tsx;
files, a;
new type;
assertion;
operator;
has;
been;
added: as.The;
above;
example;
can;
easily;
be;
rewritten;
with (the)
    var foo = bar;
The;
is;
available in both.ts;
and.tsx;
files, and;
is;
identical in behavior;
to;
the;
other;
Type;
Checking;
In;
order;
to;
understand;
with (JSX, you)
    must;
first;
understand;
the;
difference;
between;
intrinsic;
elements;
and;
value - based;
elements.Given;
a;
JSX;
expression < expr /  > , expr;
may;
either;
refer;
to;
something;
intrinsic;
to;
the;
environment(e.g.a, div, or, span in a, DOM, environment);
or;
to;
a;
custom;
component;
that;
you;
ve;
created.This;
is;
important;
for (two; reasons; )
    : For;
React, intrinsic;
elements;
are;
emitted;
(React.createElement("div")), whereas;
a;
component;
you;
ve;
created;
is;
not(React.createElement(myComponent_1.default)).
;
The;
types;
of;
the;
attributes;
being;
passed in the;
JSX;
element;
should;
be;
looked;
up;
differently.Intrinsic;
element;
attributes;
should;
be;
known;
intrinsically;
whereas;
components;
will;
likely;
want;
to;
specify;
their;
own;
set;
of;
attributes.
;
TypeScript;
uses;
the;
same;
convention;
that;
React;
does;
for (distinguishing; between; these.An)
    intrinsic;
element;
always;
begins;
with (a)
    lowercase;
letter, and;
a;
value - based;
element;
always;
begins;
with (an)
    uppercase;
letter.
;
Intrinsic;
elements;
Intrinsic;
elements;
are;
looked;
up;
on;
the;
special;
IntrinsicElements.By;
if (this)
not;
specified, then;
anything;
goes;
and;
intrinsic;
elements;
will;
not;
be;
if (interface)
    is;
present, then;
the;
name;
of;
the;
intrinsic;
element;
is;
looked;
up;
property;
on;
the;
JSX.IntrinsicElements;
interface.For;
example: 
/>; / / ok
    < bar /  > ; // error
In;
the;
above;
example, /> will work fine but <bar / > will;
result in an;
error;
since;
it;
has;
not;
been;
specified;
on;
JSX.IntrinsicElements.
    Note;
You;
can;
also;
specify;
a;
try { }
catch () { }
-all;
string;
indexer;
on;
JSX.IntrinsicElements;
ts;
Value - based;
elements;
Value;
based;
elements;
are;
simply;
looked;
up;
by;
identifiers;
that;
are in scope.
;
var myComponent_1 = require("./myComponent");
/>; / / ok
    < SomeOtherComponent /  > ; // error
It;
is;
possible;
to;
limit;
the;
value - based;
element.However, ;
for (this; we; must)
    introduce;
two;
new terms;
the;
element;
var type = (function () {
    function type() {
    }
    return type;
}());
and;
the;
element;
instance;
type.
    Given < Expr /  > , the;
element;
var type = (function () {
    function type() {
    }
    return type;
}());
is;
the;
 in the;
example;
above, ;
if (myComponent_1.default)
    was;
an;
ES6;
var the = (function () {
    function the() {
    }
    return the;
}());
var type = (function () {
    function type() {
    }
    return type;
}());
would;
be;
that;
var default_1 = (function () {
    function default_1() {
    }
    return default_1;
}());
If;
myComponent_1.default;
was;
a;
factory;
the;
var type = (function () {
    function type() {
    }
    return type;
}());
would;
be;
that;
Once;
the;
var type = (function () {
    function type() {
    }
    return type;
}());
is;
established, the;
instance;
by;
the;
union;
of;
the;
return types;
of;
the;
var type = (function () {
    function type() {
    }
    return type;
}());
s;
call;
signatures;
and;
construct;
signatures.So;
again,  in the;
of;
an;
ES6;
var default_2 = (function () {
    function default_2() {
    }
    return default_2;
}());
the;
instance;
the;
instance;
of;
that;
var default_3 = (function () {
    function default_3() {
    }
    return default_3;
}());
and in the;
of;
a;
factory;
it;
would;
be;
the;
value;
returned;
from;
the;
var MyComponent = (function () {
    function MyComponent() {
    }
    MyComponent.prototype.render = function () { };
    return MyComponent;
}());
// use a construct signature
var myComponent = new myComponent_1.default();
// element class type => MyComponent
// element instance type => { render: () => void }
function MyFactoryFunction() {
    return {
        render: function () {
        }
    };
}
// use a call signature
var myComponent = MyFactoryFunction();
// element class type => FactoryFunction
// element instance type => { render: () => void }
The;
element;
instance;
because;
it;
must;
be;
assignable;
to;
JSX.ElementClass;
or;
it;
will;
result in an;
error.By;
JSX.ElementClass;
is;
{ }
but;
it;
can;
be;
augmented;
to;
limit;
the;
use;
of;
JSX;
to;
only;
those;
types;
that;
conform;
to;
the;
proper;
interface.
;
JSX;
{
}
var MyComponent = (function () {
    function MyComponent() {
    }
    MyComponent.prototype.render = function () { };
    return MyComponent;
}());
function MyFactoryFunction() {
    return { render: function () { } };
}
/>; / / ok
    < MyFactoryFunction /  > ; // ok
var NotAValidComponent = (function () {
    function NotAValidComponent() {
    }
    return NotAValidComponent;
}());
function NotAValidFactoryFunction() {
    return {};
}
/>; / / error
    < NotAValidFactoryFunction /  > ; // error
Attribute;
first;
step;
to;
is;
to;
determine;
the;
element;
attributes;
type.This;
is;
slightly;
different;
between;
intrinsic;
and;
value - based;
elements.
;
For;
intrinsic;
elements, it;
is;
the;
property;
on;
JSX.IntrinsicElements;
// element attributes type for `foo` is `{bar?: boolean}`
bar /  > ;
For;
value - based;
elements, it;
is;
a;
bit;
more;
complex.It;
is;
determined;
by;
the;
property;
on;
the;
element;
instance;
previously;
determined.Which;
property;
to;
use;
is;
determined;
by;
JSX.ElementAttributesProperty.It;
should;
be;
declared;
with (a)
    single;
property.The;
name;
of;
that;
property;
is;
then;
used.
;
var MyComponent = (function () {
    function MyComponent() {
    }
    return MyComponent;
}());
// element attributes type for `MyComponent` is `{foo?: string}`
foo;
"bar" /  >
    The;
element;
attribute;
to;
attributes in the;
JSX.Optional;
and;
required;
properties;
are;
supported.
;
requiredProp;
"bar" /  > ; // ok
requiredProp;
"bar";
optionalProp = { 0:  } /  > ; // ok
/>; / / error, requiredProp;
is;
missing
    < foo;
requiredProp = { 0:  } /  > ; // error, requiredProp should be a string
requiredProp;
"bar";
unknownProp /  > ; // error, unknownProp does not exist
requiredProp;
"bar";
some - unknown - prop /  > ; // ok, because `some-unknown-prop` is not a valid identifier
Note: If;
an;
attribute;
name;
is;
not;
a;
valid;
JS;
identifier(like, a, data -  * attribute), it;
is;
not;
considered;
to;
be;
an;
error;
if (it)
    is;
not;
found in the;
element;
attributes;
type.
;
The;
spread;
operator;
also;
works: var props = { requiredProp: 'bar' };
{ props: props } /  > ; // ok
var badProps = {};
{ badProps: badProps } /  > ; // error
The;
JSX;
result;
type;
By;
the;
result;
of;
a;
JSX;
expression;
is;
typed;
can;
customize;
the;
the;
JSX.Element;
interface.However, it;
is;
not;
possible;
to;
retrieve;
the;
element, attributes;
or;
children;
of;
the;
JSX;
from;
this;
interface.It;
is;
a;
black;
box.
;
Embedding;
Expressions;
JSX;
allows;
you;
to;
embed;
expressions;
between;
tags;
by;
surrounding;
the;
expressions;
with (curly)
    braces({}).
    ;
var a = (_a = {}, _a['foo', 'bar'] = .map(function (i) { return { i: / 2}</span >  }; }), _a)
    < /div>;
The;
above;
code;
will;
result in an;
error;
since;
you;
cannot;
divide;
a;
string;
by;
a;
number.The;
output, when;
using;
the;
preserve;
option, looks;
like: var a = (_b = {}, _b['foo', 'bar'] = .map(function (i) { return { i: / 2}</span >  }; }), _b)
    < /div>;
React;
integration;
To;
use;
JSX;
with (React)
    you;
should;
use;
the;
React;
typings.These;
typings;
define;
the;
JSX;
for (use; ; )
    with (React.
        /// <reference path="react.d.ts" />
    )
var MyComponent = (function (_super) {
    __extends(MyComponent, _super);
    function MyComponent() {
        _super.apply(this, arguments);
    }
    MyComponent.prototype.render = function () {
        return { this: .props.foo } < /span>;
    };
    return MyComponent;
}(React.Component));
foo;
"bar" /  > ; // ok
foo;
{
    0;
}
/>; / / error;
var _a, _b;
