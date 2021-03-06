/**
 Introduction

A major part of software engineering is building components that not only have well-defined and consistent APIs,
but are also reusable.
Components that are capable of working on the data of today as well as the data of tomorrow
will give you the most flexible capabilities for building up large software systems.

In languages like C# and Java, one of the main tools in the toolbox for creating reusable components is ‘generics’, that is, being able to create a component that can work over a variety of types rather than a single one.
This allows users to consume these components and use their own types.
 
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 Hello World of Generics

To start off, let’s do the “hello world” of generics: the identity function.
The identity function is a function that will return back whatever is passed in.
You can think of this in a similar way to the ‘echo’ command.

Without generics, we would either have to give the identity function a specific type:
 */
function identity(arg) {
    return arg;
}
function identity(arg) {
    return arg;
}
/**
 While using any is certainly generic in that will accept any and all types for the type of arg,
 we actually are losing the information about what that type was when the function returns.
 If we passed in a number, the only information we have is that any type could be returned.

Instead, we need a way of capturing the type of the argument in such a way that we can also use it to denote
what is being returned.
Here, we will use a type variable, a special kind of variable that works on types rather than values.
 */
function identity(arg) {
    return arg;
}
/**
 We’ve now added a type variable T to the identity function.
 This T allows us to capture the type the user provides (e.g. number),
 so that we can use that information later.
 Here, we use T again as the return type.
 On inspection, we can now see the same type is used for the argument and the return type.
 This allows us to traffic that type information in one side of the function and out the other.

We say that this version of the identity function is generic, as it works over a range of types.
Unlike using any, it’s also just as precise (ie, it doesn’t lose any information)
as the first identity function that used numbers for the argument and return type.

Once we’ve written the generic identity function, we can call it in one of two ways.
The first way is to pass all of the arguments, including the type argument, to the function:
 */
var output = identity("myString"); // type of output will be 'string'
/**
 Here we explicitly set T to be string as one of the arguments to the function call,
 denoted using the <> around the arguments rather than ().

The second way is also perhaps the most common. Here we use type argument inference,
that is, we want the compiler to set the value of T for us automatically based on the type of the argument we pass in:
 */
var output = identity("myString"); // type of output will be 'string'
/**
 Notice that we didn’t have to explicitly pass the type in the angle brackets (<>),
 the compiler just looked at the value "myString", and set T to its type.
 While type argument inference can be a helpful tool to keep code shorter and more readable,
 you may need to explicitly pass in the type arguments as we did in the previous example
 when the compiler fails to infer the type, as may happen in more complex examples.
 */
/**
 * Working with Generic Type Variables
 */
/**
 When you begin to use generics, you’ll notice that when you create generic functions like identity,
 the compiler will enforce that you use any generically typed parameters in the body of the function correctly.
 That is, that you actually treat these parameters as if they could be any and all types.

Let’s take our identity function from earlier:
 */
function identity(arg) {
    return arg;
}
/**
 What if we want to also log the length of the argument arg to the console with each call?
 We might be tempted to write this:
 */
function loggingIdentity(arg) {
    console.log(arg.length); // Error: T doesn't have .length
    return arg;
}
/**
 When we do, the compiler will give us an error that we’re using the .length member of arg,
 but nowhere have we said that arg has this member.
 Remember, we said earlier that these type variables stand in for any and all types,
 so someone using this function could have passed in a number instead, which does not have a .length member.

Let’s say that we’ve actually intended this function to work on arrays of T rather than T directly.
Since we’re working with arrays, the .length member should be available.
We can describe this just like we would create arrays of other types:
 */
function loggingIdentity(arg) {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}
/**
 You can read the type of loggingIdentity as “the generic function loggingIdentity takes a type parameter T,
 and an argument arg which is an array of Ts, and returns an array of Ts.”
 If we passed in an array of numbers, we’d get an array of numbers back out, as T would bind to number.
 This allows us to use our generic type variable T as part of the types we’re working with,
 rather than the whole type, giving us greater flexibility.

We can alternatively write the sample example this way:
 */
function loggingIdentity(arg) {
    console.log(arg.length); // Array has a .length, so no more error
    return arg;
}
/**
 You may already be familiar with this style of type from other languages.
 In the next section, we’ll cover how you can create your own generic types like Array<T>.
 */
/**
 Generic Types
 */
/**
 In previous sections, we created generic identity functions that worked over a range of types.
 In this section, we’ll explore the type of the functions themselves and how to create generic interfaces.

The type of generic functions is just like those of non-generic functions,
with the type parameters listed first, similarly to function declarations:
 */
function identity(arg) {
    return arg;
}
var myIdentity = identity;
/**
 We could also have used a different name for the generic type parameter in the type,
 so long as the number of type variables and how the type variables are used line up.
 */
function identity(arg) {
    return arg;
}
var myIdentity = identity;
//We can also write the generic type as a call signature of an object literal type:
function identity(arg) {
    return arg;
}
var myIdentity = identity;
function identity(arg) {
    return arg;
}
var myIdentity = identity;
function identity(arg) {
    return arg;
}
var myIdentity = identity;
/**
 Notice that our example has changed to be something slightly different.
 Instead of describing a generic function, we now have a non-generic function signature that is a part of a generic type.
 When we use GenericIdentityFn, we now will also need to specify the corresponding type argument (here: number),
 effectively locking in what the underlying call signature will use.
 Understanding when to put the type parameter directly on the call signature
 and when to put it on the interface itself will be helpful in describing what aspects of a type are generic.

In addition to generic interfaces, we can also create generic classes.
Note that it is not possible to create generic enums and namespaces.

 */
/**
 Generic Classes

 */
/**
 A generic class has a similar shape to a generic interface.
 Generic classes have a generic type parameter list in angle brackets (<>) following the name of the class.
 */
var GenericNumber = (function () {
    function GenericNumber() {
    }
    return GenericNumber;
}());
var myGenericNumber = new GenericNumber();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };
/**
 
This is a pretty literal use of the GenericNumber class,
but you may have noticed that nothing is restricting it to only use the number type.
We could have instead used string or even more complex objects.

 */
var stringNumeric = new GenericNumber();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) { return x + y; };
alert(stringNumeric.add(stringNumeric.zeroValue, "test"));
/**
 Just as with interface, putting the type parameter on the class itself lets us make sure all of
 the properties of the class are working with the same type.

As we covered in our section on classes, a class has two sides to its type: the static side and the instance side.
Generic classes are only generic over their instance side rather than their static side,
so when working with classes, static members can not use the class’s type parameter.
 */
/**
 * Generic Constraints
 */
/**
If you remember from an earlier example, you may sometimes want to write a generic function
that works on a set of types where you have some knowledge about what capabilities that set of types will have.
In our loggingIdentity example, we wanted to be able access the .length property of arg,
but the compiler could not prove that every type had a .length property, so it warns us that we can’t make this assumption.
 */
function loggingIdentity(arg) {
    console.log(arg.length); // Error: T doesn't have .length
    return arg;
}
function loggingIdentity(arg) {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
}
//Because the generic function is now constrained, it will no longer work over any and all types:
loggingIdentity(3); // Error, number doesn't have a .length property
//Instead, we need to pass in values whose type has all the required properties:
loggingIdentity({ length: 10, value: 3 });
/**
 * Using Type Parameters in Generic Constraints
 */
//In some cases, it may be useful to declare a type parameter that is constrained by another type parameter. For example,
function find(n, s) {
    // ...
}
find(giraffe, myAnimals);
//You can achieve the pattern above by replacing the type parameter with its constraint. Rewriting the example above,
function find(n, s) {
    // ...
}
find(giraffe, myAnimals);
//Note: The above is not strictly identical, as the return type of the first function could have returned U, which the second function pattern does not provide a means to do.
/**
 * Using Class Types in Generics
 */
/**
 When creating factories in TypeScript using generics, it is necessary to refer to class types by
 their constructor functions.
 For example,
 */
function create(c) {
    return new c();
}
// A more advanced example uses the prototype property to infer and constrain relationships 
// between the constructor function and the instance side of class types.
var BeeKeeper = (function () {
    function BeeKeeper() {
    }
    return BeeKeeper;
}());
var ZooKeeper = (function () {
    function ZooKeeper() {
    }
    return ZooKeeper;
}());
var Animal = (function () {
    function Animal() {
    }
    return Animal;
}());
var Bee = (function (_super) {
    __extends(Bee, _super);
    function Bee() {
        _super.apply(this, arguments);
    }
    return Bee;
}(Animal));
var Lion = (function (_super) {
    __extends(Lion, _super);
    function Lion() {
        _super.apply(this, arguments);
    }
    return Lion;
}(Animal));
function findKeeper(a) {
    return a.prototype.keeper;
}
findKeeper(Lion).nametag; // typechecks!
