/*
Module Resolution
This section assumes some basic knowledge about modules. Please see the Modules documentation for more information.
Module resolution is the process the compiler uses to figure out what an import refers to. Consider an import statement like import { a } from "moduleA"; in order to check any use of a, the compiler needs to know exactly what it represents, and will need to check its definition moduleA.

At this point, the compiler will ask “what’s the shape of moduleA?” While this sounds straightforward, moduleA could be defined in one of your own .ts/.tsx files, or in a .d.ts that your code depends on.

First, the compiler will try to locate a file that represents the imported module. To do so the compiler follows one of two different strategies: Classic or Node. These strategies tell the compiler where to look for moduleA.

If that didn’t work and if the module name is non-relative (and in the case of "moduleA", it is), then the compiler will attempt to locate an ambient module declaration. We’ll cover non-relative imports next.

Finally, if the compiler could not resolve the module, it will log an error. In this case, the error would be something like error TS2307: Cannot find module 'moduleA'.
*/

/*
Relative vs. Non-relative module imports

Module imports are resolved differently based on whether the module reference is relative or non-relative.

A relative import is one that starts with /, ./ or ../. Some examples include:
*/
import Entry from "./components/Entry";
import { DefaultHeaders } from "../constants/http";
import "/mod";

//Any other import is considered non-relative. Some examples include:

import * as $ from "jQuery";
import { Component } from "angular2/core";
/*
A relative import is resolved relative to the importing file and cannot resolve to an ambient module declaration. You should use relative imports for your own modules that are guaranteed to maintain their relative location at runtime.
*/

/*
Module Resolution Strategies

There are two possible module resolution strategies: Node and Classic. You can use the --moduleResolution flag to specify the module resolution strategy. The default if not specified is Node.
*/


/*
Classic

This used to be TypeScript’s default resolution strategy. Nowadays, this strategy is mainly present for backward compatibility.

A relative import will be resolved relative to the importing file. So import { b } from "./moduleB" in source file /root/src/folder/A.ts would result in the following lookups:

/root/src/folder/moduleB.ts
/root/src/folder/moduleB.d.ts
For non-relative module imports, however, the compiler walks up the directory tree starting with the directory containing the importing file, trying to locate a matching definition file.

For example:

A non-relative import to moduleB such as import { b } from "moduleB", in a source file /root/src/folder/A.ts, would result in attempting the following locations for locating "moduleB":

/root/src/folder/moduleB.ts
/root/src/folder/moduleB.d.ts
/root/src/moduleB.ts
/root/src/moduleB.d.ts
/root/moduleB.ts
/root/moduleB.d.ts
/moduleB.ts
/moduleB.d.ts

*/


/*
Node

This resolution strategy attempts to mimic the Node.js module resolution mechanism at runtime. The full Node.js resolution algorithm is outlined in Node.js module documentation.

How Node.js resolves modules

To understand what steps the TS compiler will follow, it is important to shed some light on Node.js modules. Traditionally, imports in Node.js are performed by calling a function named require. The behavior Node.js takes will differ depending on if require is given a relative path or a non-relative path.

Relative paths are fairly straightforward. As an example, let’s consider a file located at /root/src/moduleA.js, which contains the import var x = require("./moduleB"); Node.js resolves that import in the following order:

As the file named /root/src/moduleB.js, if it exists.

As the folder /root/src/moduleB if it contains a file named package.json that specifies a "main" module. In our example, if Node.js found the file /root/src/moduleB/package.json containing { "main": "lib/mainModule.js" }, then Node.js will refer to /root/src/moduleB/lib/mainModule.js.

As the folder /root/src/moduleB if it contains a file named index.js. That file is implicitly considered that folder’s “main” module.

You can read more about this in Node.js documentation on file modules and folder modules.

However, resolution for a non-relative module name is performed differently. Node will look for your modules in special folders named node_modules. A node_modules folder can be on the same level as the current file, or higher up in the directory chain. Node will walk up the directory chain, looking through each node_modules until it finds the module you tried to load.

Following up our example above, consider if /root/src/moduleA.js instead used a non-relative path and had the import var x = require("moduleB");. Node would then try to resolve moduleB to each of the locations until one worked.

/root/src/node_modules/moduleB.js
/root/src/node_modules/moduleB/package.json (if it specifies a "main" property)
/root/src/node_modules/moduleB/index.js

/root/node_modules/moduleB.js
/root/node_modules/moduleB/package.json (if it specifies a "main" property)
/root/node_modules/moduleB/index.js

/node_modules/moduleB.js
/node_modules/moduleB/package.json (if it specifies a "main" property)
/node_modules/moduleB/index.js
Notice that Node.js jumped up a directory in steps (4) and (7).

You can read more about the process in Node.js documentation on loading modules from node_modules.

How TypeScript resolves modules

TypeScript will mimic the Node.js run-time resolution strategy in order to locate definition files for modules at compile-time. To accomplish this, TypeScript overlays the TypeScript source file extensions (.ts, .tsx, and .d.ts) over the Node’s resolution logic. TypeScript will also use a field in package.json named "typings" to mirror the purpose of "main" - the compiler will use it to find the “main” definition file to consult.

For example, an import statement like import { b } from "./moduleB" in /root/src/moduleA.ts would result in attempting the following locations for locating "./moduleB":

/root/src/moduleB.ts
/root/src/moduleB.tsx
/root/src/moduleB.d.ts
/root/src/moduleB/package.json (if it specifies a "typings" property)
/root/src/moduleB/index.ts
/root/src/moduleB/index.tsx
/root/src/moduleB/index.d.ts
Recall that Node.js looked for a file named moduleB.js, then an applicable package.json, and then for an index.js.

Similarly a non-relative import will follow the Node.js resolution logic, first looking up a file, then looking up an applicable folder. So import { b } from "moduleB" in source file /src/moduleA.ts would result in the following lookups:

/root/src/node_modules/moduleB.ts
/root/src/node_modules/moduleB.tsx
/root/src/node_modules/moduleB.d.ts
/root/src/node_modules/moduleB/package.json (if it specifies a "typings" property)
/root/src/node_modules/moduleB/index.ts
/root/src/node_modules/moduleB/index.tsx
/root/src/node_modules/moduleB/index.d.ts

/root/node_modules/moduleB.ts
/root/node_modules/moduleB.tsx
/root/node_modules/moduleB.d.ts
/root/node_modules/moduleB/package.json (if it specifies a "typings" property)
/root/node_modules/moduleB/index.ts
/root/node_modules/moduleB/index.tsx
/root/node_modules/moduleB/index.d.ts

/node_modules/moduleB.ts
/node_modules/moduleB.tsx
/node_modules/moduleB.d.ts
/node_modules/moduleB/package.json (if it specifies a "typings" property)
/node_modules/moduleB/index.ts
/node_modules/moduleB/index.tsx
/node_modules/moduleB/index.d.ts
Don’t be intimidated by the number of steps here - TypeScript is still only jumping up directories twice at steps (8) and (15). This is really no more complex than what Node.js itself is doing.

 */

/*

Using --noResolve

Normally the compiler will attempt to resolve all module imports before it starts the compilation process. Every time it successfully resolves an import to a file, the file is added to the set of files the compiler will process later on.

The --noResolve compiler options instructs the compiler not to “add” any files to the compilation that were not passed on the command line. It will still try to resolve the module to files, but if the file as not specified, it will not be included.

For instance:

app.ts

import * as A from "moduleA" // OK, moduleA passed on the command-line
import * as B from "moduleB" // Error TS2307: Cannot find module 'moduleB'.
tsc app.ts moduleA.ts --noResolve
Compiling app.ts using --noResolve should result in:

Correctly finding moduleA as it was passed on the command-line.
Error for not finding moduleB as it was not passed.
*/

/*

Common Questions

Why does a module in exclude list is still picked up by the compiler

tsconfig.json turns a folder into a “project”. Without specifying any “exclude” or “files” entries, all files in the folder containing the tsconfig.json and all its sub-directories are included in your compilation. If you want to exclude some of the files use “exclude”, if you would rather specify all the files instead of letting the compiler look them up, use “files”.

That was tsconfig.json automatic inclusion. That does not embed module resolution as discussed above. If the compiler identified a file as a target of a module import, it will be included in the compilation regardless if it was excluded in the previous steps.

So to exclude a file from the compilation, you need to exclude it and all all files that has an import or /// <reference path="..." /> directives to it.
 */