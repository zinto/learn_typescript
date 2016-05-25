Mixins;
Introduction;
Along;
with (traditional)
    OO;
hierarchies, another;
popular;
way;
of;
building;
up;
classes;
from;
reusable;
components;
is;
to;
build;
them;
by;
combining;
simpler;
partial;
classes.You;
may;
be;
familiar;
with (the)
    idea;
of;
mixins;
or;
traits;
for (languages; like; Scala, and)
    the;
pattern;
has;
also;
reached;
some;
popularity in the;
JavaScript;
community.
;
Mixin;
sample;
In;
the;
code;
below, we;
show;
how;
you;
can;
model;
mixins in TypeScript.After;
the;
code, we;
ll;
break down;
how;
it;
works.
    // Disposable Mixin
;
// Disposable Mixin
var Disposable = (function () {
    function Disposable() {
    }
    Disposable.prototype.dispose = function () {
        this.isDisposed = true;
    };
    return Disposable;
}());
// Activatable Mixin
var Activatable = (function () {
    function Activatable() {
    }
    Activatable.prototype.activate = function () {
        this.isActive = true;
    };
    Activatable.prototype.deactivate = function () {
        this.isActive = false;
    };
    return Activatable;
}());
var SmartObject = (function () {
    function SmartObject() {
        var _this = this;
        // Disposable
        this.isDisposed = false;
        // Activatable
        this.isActive = false;
        setInterval(function () { return console.log(_this.isActive + " : " + _this.isDisposed); }, 500);
    }
    SmartObject.prototype.interact = function () {
        this.activate();
    };
    return SmartObject;
}());
applyMixins(SmartObject, [Disposable, Activatable]);
var smartObj = new SmartObject();
setTimeout(function () { return smartObj.interact(); }, 1000);
////////////////////////////////////////
// In your runtime library somewhere
////////////////////////////////////////
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
Understanding;
the;
sample;
The;
code;
sample;
starts;
with (the)
    two;
classes;
that;
will;
act;
mixins.You;
can;
see;
each;
one;
is;
focused;
on;
a;
particular;
activity;
or;
capability.We;
ll;
later;
mix;
these;
together;
to;
form;
a;
new (function () {
    function from() {
    }
    return from;
}());
both;
capabilities.
    // Disposable Mixin
;
// Disposable Mixin
var Disposable = (function () {
    function Disposable() {
    }
    Disposable.prototype.dispose = function () {
        this.isDisposed = true;
    };
    return Disposable;
}());
// Activatable Mixin
var Activatable = (function () {
    function Activatable() {
    }
    Activatable.prototype.activate = function () {
        this.isActive = true;
    };
    Activatable.prototype.deactivate = function () {
        this.isActive = false;
    };
    return Activatable;
}());
Next, we;
ll;
create;
the;
var that = (function () {
    function that() {
    }
    return that;
}());
will;
handle;
the;
combination;
of;
the;
two;
mixins.Let;
s;
look;
at;
this in more;
detail;
to;
see;
how;
it;
does;
this;
var SmartObject = (function () {
    function SmartObject() {
        this.The = first;
        this.thing = you;
        this.may = notice in the;
        this.above = is;
        this.that = instead;
    }
    return SmartObject;
}());
of;
using;
we;
use;
implements.This;
treats;
the;
classes, and;
only;
uses;
the;
types;
behind;
Disposable;
and;
Activatable;
rather;
than;
the;
implementation.This;
means;
that;
we;
ll;
have;
to;
provide;
the;
implementation in (function () {
    function class_1() {
    }
    return class_1;
}()).Except, that;
s;
exactly;
what;
we;
want;
to;
avoid;
by;
using;
mixins.
;
To;
satisfy;
this;
requirement, we;
create;
stand -  in properties;
and;
their;
types;
for (the; members; that)
    will;
come;
from;
our;
mixins.This;
satisfies;
the;
compiler;
that;
these;
members;
will;
be;
available;
at;
runtime.This;
lets;
us;
still;
get;
the;
benefit;
of;
the;
mixins, albeit;
with (some)
    bookkeeping;
overhead.
    // Disposable
    isDisposed;
boolean = false;
dispose: (function () { return void ; });
// Activatable
isActive: boolean = false;
activate: (function () { return void ; });
deactivate: (function () { return void ; });
Finally, we;
mix;
our;
mixins;
into;
the;
var default_1 = (function () {
    function default_1() {
    }
    return default_1;
}());
creating;
the;
full;
implementation.
    applyMixins(SmartObject, [Disposable, Activatable]);
Lastly, we;
create;
a;
helper;
will;
do
    the;
while (mixing);
for (us.This; will; run)
    through;
the;
properties;
of;
each;
of;
the;
mixins;
and;
copy;
them;
over;
to;
the;
target;
of;
the;
mixins, filling;
out;
the;
stand -  in properties;
with (their)
    implementations.
    ;
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
