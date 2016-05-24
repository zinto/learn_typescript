/**
Enums

Enums allow us to define a set of named numeric constants.
An enum can be defined using the enum keyword.

 */
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
/**
 The body of an enum consists of zero or more enum members.
 Enum members have numeric value associated with them and can be either constant or computed.
 An enum member is considered constant if:

    - It does not have an initializer and the preceding enum member was constant.
        In this case the value of the current enum member will be the value of the preceding enum member plus one.
        One exception to this rule is the first element on an enum.
        If it does not have initializer it is assigned the value 0.

    - The enum member is initialized with a constant enum expression.
        A constant enum expression is a subset of TypeScript expressions that can be fully evaluated at compile time.
        An expression is a constant enum expression if it is either:
           + numeric literal
           + reference to previously defined constant enum member (it can be defined in different enum).
            If member is defined in the same enum it can be referenced using unqualified name.
           + parenthesized constant enum expression
            
           + "+, -, ~" unary operators applied to constant enum expression
           + "+, -, *, /, %, <<, >>, >>>, &, |, ^ " binary operators with constant enum expressions as operands.
            It is a compile time error for constant enum expressions to be evaluated to NaN or Infinity.
            
In all other cases enum member is considered computed.
 */
var FileAccess;
(function (FileAccess) {
    // constant members
    FileAccess[FileAccess["None"] = 0] = "None";
    FileAccess[FileAccess["Read"] = 2] = "Read";
    FileAccess[FileAccess["Write"] = 4] = "Write";
    FileAccess[FileAccess["ReadWrite"] = 6] = "ReadWrite";
    // computed member
    FileAccess[FileAccess["G"] = "123".length] = "G";
})(FileAccess || (FileAccess = {}));
/**
 Enums are real objects that exist at runtime.
 One reason is the ability to maintain a reverse mapping from enum values to enum names.

 */
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[Enum.A]; // "A"
is;
compiled;
to: var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
})(Enum || (Enum = {}));
var a = Enum.A;
var nameOfA = Enum[Enum.A]; // "A"
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
// in generated code will become
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
/**
 One important difference between ambient and non-ambient enums is that,
 in regular enums, members that don’t have an initializer are considered constant members.
 For non-const ambient enums member that does not have initializer is considered computed.
 */ 
