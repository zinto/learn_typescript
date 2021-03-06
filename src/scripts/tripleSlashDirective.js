"use strict";
Triple - Slash;
Directives;
Triple - slash;
directives;
are;
single - line;
comments;
containing;
a;
single;
XML;
tag.The;
contents;
of;
the;
comment;
are;
used;
directives.
    Triple - slash;
directives;
are;
only;
valid;
at;
the;
top;
of;
their;
containing;
file.A;
triple - slash;
directive;
can;
only;
be;
preceded;
by;
single;
or;
multi - line;
comments, including;
other;
triple - slash;
directives.If;
they;
are;
encountered;
following;
a;
statement;
or;
a;
declaration;
they;
are;
treated;
single - line;
comments, and;
hold;
no;
special;
meaning.
    /// <reference path="..." />
    The; /// <reference path="..." /> directive is the most common of this group. It serves as a declaration of dependency between files.
Triple - slash;
references;
instruct;
the;
compiler;
to;
include;
additional;
files in the;
compilation;
process.
;
They;
also;
serve;
method;
to;
order;
the;
output;
when;
using--;
out;
or--;
outFile.Files;
are;
emitted;
to;
the;
output;
file;
location in the;
same;
order;
input;
after;
preprocessing;
pass.
;
Preprocessing;
input;
files;
The;
compiler;
performs;
a;
preprocessing;
pass;
on;
input;
files;
to;
resolve;
all;
triple - slash;
reference;
directives.During;
this;
process, additional;
files;
are;
added;
to;
the;
compilation.
;
The;
process;
starts;
with (a)
    set;
of;
root;
files;
these;
are;
the;
file;
names;
specified;
on;
the;
command - line;
or in the;
"files";
list in the;
tsconfig.json;
file.These;
root;
files;
are;
preprocessed in the;
same;
order;
they;
are;
specified.Before;
a;
file;
is;
added;
to;
the;
list, all;
triple - slash;
references in it;
are;
processed, and;
their;
targets;
included.Triple - slash;
references;
are;
resolved in a;
depth;
first;
manner,  in the;
order;
they;
have;
been;
seen in the;
file.
;
A;
triple - slash;
reference;
path;
is;
resolved;
relative;
to;
the;
containing;
file, ;
if (unrooted.
    Errors)
    It;
is;
an;
error;
to;
reference;
a;
file;
that;
does;
not;
exist.It;
is;
an;
error;
for (a; file; to)
    have;
a;
triple - slash;
reference;
to;
itself.
    Using--;
noResolve;
If;
the;
compiler;
flag--;
noResolve;
is;
specified, triple - slash;
references;
are;
ignored;
they;
neither;
result in adding;
new files, nor;
change;
the;
order;
of;
the;
files;
provided.
    /// <reference no-default-lib="true"/>
;
/// <reference no-default-lib="true"/>
This;
directive;
marks;
a;
file;
library.You;
will;
see;
this;
comment;
at;
the;
top;
of;
lib.d.ts;
and;
its;
different;
variants.
;
This;
directive;
instructs;
the;
compiler;
to;
not;
include;
the;
library(i.e.lib.d.ts) in the;
compilation.The;
impact;
here;
is;
similar;
to;
passing--;
noLib;
on;
the;
command;
line.
;
Also;
note;
that;
when;
passing--;
skipDefaultLibCheck, the;
compiler;
will;
only;
skip;
checking;
files;
with (
/// <amd-module />
By)
    ;
AMD;
modules;
are;
generated;
anonymous.This;
can;
lead;
to;
problems;
when;
other;
tools;
are;
used;
to;
process;
the;
resulting;
modules, such;
(e.g.r.js).
;
The;
amd - module;
directive;
allows;
passing;
an;
optional;
to;
the;
compiler: amdModule.ts;
///<amd-module name='NamedModule'/>
var C = (function () {
    function C() {
    }
    return C;
}());
exports.C = C;
Will;
result in assigning;
the;
name;
NamedModule;
to;
the;
part;
of;
calling;
the;
AMD;
define: amdModule.js;
define("NamedModule", ["require", "exports"], function (require, exports) {
    var C = (function () {
        function C() {
        }
        return C;
    })();
    exports.C = C;
});
/// <amd-dependency />
Note: this;
directive;
has;
been;
deprecated.Use;
require("moduleName");
statements;
instead.
    /// <amd-dependency path="x" /> informs the compiler about a non-TS module dependency that needs to be injected in the resulting module’s require call.
;
/// <amd-dependency path="x" /> informs the compiler about a non-TS module dependency that needs to be injected in the resulting module’s require call.
The;
amd - dependency;
directive;
can;
also;
have;
an;
optional;
name;
property;
this;
allows;
passing;
an;
optional;
name;
for (an; amd - dependency; )
    : 
moduleA.callStuff();
Generated;
JS;
code: define(["require", "exports", "legacy/moduleA"], function (require, exports, moduleA) {
    moduleA.callStuff();
});
