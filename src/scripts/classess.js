/**
 * Introduction
 *
Traditional JavaScript focuses on functions and prototype-based inheritance as the basic means of building up reusable components,
but this may feel a bit awkward to programmers more comfortable with an object-oriented approach,
where classes inherit functionality and objects are built from these classes.
 
Starting with ECMAScript 2015, also known as ECMAScript 6, JavaScript programmers will be able to
build their applications using this object-oriented class-based approach.
In TypeScript, we allow developers to use these techniques now,
and compile them down to JavaScript that works across all major browsers and platforms,
without having to wait for the next version of JavaScript.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Classes
 */
/**
 * Greeter
 */
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
/**
 * The syntax should look familiar if you’ve used C# or Java before. We declare a new class Greeter.
 * This class has three members: a property called greeting, a constructor, and a method greet.

You’ll notice that in the class when we refer to one of the members of the class we prepend this..
This denotes that it’s a member access.

In the last line we construct an instance of the Greeter class using new.
This calls into the constructor we defined earlier, creating a new object with the Greeter shape, and running the constructor to initialize it.
 */
//
//
/**
 * Inheritance
 */
/**
 *  Animal
 */
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log(this.name + " moved " + distanceInMeters + " .");
    };
    return Animal;
}());
/**
 * Snake extends Animal
 */
var Snake = (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        _super.call(this, name);
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log("Slithering....");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
/**
 * Horse extends Animal
 */
var Horse = (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        _super.call(this, name);
    }
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log("Galloping....");
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal));
var sam = new Snake("Sammy the Python");
var tom = new Horse("Tommy the Palomino");
sam.move();
tom.move(34);
/**
 * This example covers quite a few of the inheritance features in TypeScript that are common to other languages. Here we see the extends keywords used to create a subclass. You can see this where Horse and Snake subclass the base class Animal and gain access to its features.

Derived classes that contain constructor functions must call super() which will execute the constructor function on the base class.

The example also shows how to override methods in the base class with methods that are specialized for the subclass. Here both Snake and Horse create a move method that overrides the move from Animal, giving it functionality specific to each class. Note that even though tom is declared as an Animal, since its value is a Horse, when tom.move(34) calls the overriding method in Horse:
 */
/**
 * Public, private, and protected modifiers
 *
 * In our examples, we’ve been able to freely access the members that we declared throughout our programs.
 * If you’re familiar with classes in other languages,
 * you may have noticed in the above examples we haven’t had to use the word public to accomplish this;
 * for instance, C# requires that each member be explicitly labeled public to be visible.
 * In TypeScript, each member is public by default.

You may still mark a member public explicitly.
We could have written the Animal class from the previous section in the following way:
 */
/**
 * Animal
 */
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        console.log(this.name + " moved " + distanceInMeters + ".");
    };
    return Animal;
}());
/**
 * Understanding private

When a member is marked private, it cannot be accessed from outside of its containing class.
For example:
*/
/**
 * Animal
 */
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    return Animal;
}());
/**
 * Rhino extends
 */
var Rhino = (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        _super.call(this, "Rhino");
    }
    return Rhino;
}(Animal));
/**
 * Employee
 */
var Employee = (function () {
    function Employee(theName) {
        this.name = theName;
    }
    return Employee;
}());
var animal = new Animal("Goat");
var rhino = new Rhino();
var employee = new Employee("Bob");
/**
 * In this example, we have an Animal and a Rhino, with Rhino being a subclass of Animal.
 * We also have a new class Employee that looks identical to Animal in terms of shape.
 * We create some instances of these classes and then try to assign them
 * to each other to see what will happen.
 * Because Animal and Rhino share the private side of their shape from
 * the same declaration of private name: string in Animal, they are compatible.
 * However, this is not the case for Employee.
 * When we try to assign from an Employee to Animal we get an error that these types are not compatible.
 * Even though Employee also has a private member called name, it’s not the one we declared in Animal.
 */
/**
 * Understanding protected
 */
/**
 * Person
 */
var Person = (function () {
    function Person(name) {
        this.name = name;
    }
    return Person;
}());
/**
 * Employee
 */
var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(name, deparment) {
        _super.call(this, name);
        this.department = deparment;
    }
    Employee.prototype.getElevatorPitch = function () {
        return "Hello, my name is " + this.name + " and I work in " + this.department;
    };
    return Employee;
}(Person));
var howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name);
/**
 * Notice that while we can’t use name from outside of Person,
 * we can still use it from within an instance method of Employee because Employee derives from Person.
 */
/**
 * Parameter properties
 *
 * In our last example, we had to declare a private member name and a constructor parameter theName,
 * and we then immediately set name to theName.
 * This turns out to be a very common practice.
 * Parameter properties let you create and initialize a member in one place.
 * Here’s a further revision of the previous Animal class using a parameter property:
 */
/**
 * Animal
 */
var Animal = (function () {
    function Animal(name) {
        this.name = name;
        move(distanceInMeters, number);
        {
            console.log(this.name + " moved " + distannceInMeters + " m.");
        }
    }
    return Animal;
}());
/**
 * Notice how we dropped theName altogether and just use
 * the shortened private name: string parameter on the constructor to create and initialize the name member.
 * We’ve consolidated the declarations and assignment into one location.

Parameter properties are declared by prefixing a constructor parameter with an accessibility modifier.
Using private for a parameter property declares and initializes a private member;
likewise, the same is done for public and protected.
 */
/**
 * Accessors
 *
 * TypeScript supports getters/setters as a way of intercepting accesses to a member of an object.
 * This gives you a way of having finer-grained control over how a member is accessed on each object.

Let’s convert a simple class to use get and set.
First, let’s start with an example without getters and setters.
 */
/**
 * Employee
 */
var Employee = (function () {
    function Employee() {
    }
    return Employee;
}());
var employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
/**
 * While allowing people to randomly set fullName directly is pretty handy,
 * this might get us in trouble if people can change names on a whim.

In this version, we check to make sure the user has a secret passcode available
before we allow them to modify the employee.
We do this by replacing the direct access to fullName with a set that will check the passcode.
We add a corresponding get to allow the previous example to continue to work seamlessly.
 */
var passcode = "secret passcode";
/**
 * Employee
 */
var Employee = (function () {
    function Employee() {
    }
    Employee.prototype.getFullName = function () {
        return this.fullName;
    };
    Object.defineProperty(Employee.prototype, "fullName", {
        set: function (newFullName) {
            if (passcode && passcode == "secret passcode") {
                this.fullName = newFullName;
            }
            else {
                console.log("Error: Unauthorize update for employee");
            }
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
var employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
    console.log(employee.fullName);
}
/**
 * To prove to ourselves that our accessor is now checking the passcode,
 * we can modify the passcode and see that when it doesn’t match
 * we instead get the message warning us we don’t have access to update the employee.

Note: Accessors require you to set the compiler to output ECMAScript 5 or higher.
 */
/**
 * Grid
 */
var Grid = (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = (point.x - Grid.origin.x);
        var yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid1 = new Grid(1.0);
var grid2 = new Grid(5.0);
console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
/**
 * Abstract Classes
 *
 * Abstract classes are base classes from which other classes may be derived.
 * They may not be instantiated directly.
 * Unlike an interface, an abstract class may contain implementation details for its members.
 * The abstract keyword is used to define abstract classes
 * as well as abstract methods within an abstract class.
 */
/**
 * abstract  class Animal
 */
var Animal = (function () {
    function Animal() {
    }
    Animal.prototype.move = function () {
        console.log("roaming the earth....");
    };
    return Animal;
}());
/**
 * Methods within an abstract class that are marked as abstract do not contain an implementation
 * and must be implemented in derived classes.
 * Abstract methods share a similar syntax to interface methods.
 * Both define the signature of a method without including a method body.
 * However, abstract methods must include the abstract keyword and may optionally include access modifiers.
 */
/**
 * abstract class Deparment
 */
var Deparment = (function () {
    function Deparment(name) {
        this.name = name;
    }
    Deparment.prototype.printName = function () {
        console.log('Deparment name: ' + this.name);
    };
    return Deparment;
}());
/**
 * AccountingDeparment extends
 */
var AccountingDeparment = (function (_super) {
    __extends(AccountingDeparment, _super);
    function AccountingDeparment() {
        _super.call(this, 'Accounting and Auditing'); // constructors in derived classes must call super()
    }
    AccountingDeparment.prototype.printMeeting = function () {
        console.log('The Accounting Deparment meets each Moday at 10am.');
    };
    AccountingDeparment.prototype.generateReport = function () {
        console.log('Generating accounting reports ...');
    };
    return AccountingDeparment;
}(Deparment));
var department; // ok to create a reference to an abstract types
department = new Deparment(); // error: cannot create an instance of an abstract class
department = new AccountingDeparment(); // ok to create and assign a non-abstract subclass
department.printName();
department.printMeeting();
department.generateReport(); // error: method doesn’t exist on declared abstract types
/**
 * Advanced Techniques
 * Constructor functions
 *
 * When you declare a class in TypeScript, you are actually creating multiple declarations at the same time.
 * The first is the type of the instance of the class.
 */
/**
 * Greeter
 */
var Greeter = (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello" + this.greeting;
    };
    return Greeter;
}());
var greeter;
greeter = new Greeter("World");
console.log(greeter.greet());
/**
 * Here, let Greeter is going to be assigned the constructor function.
 * When we call new and run this function, we get an instance of the class.
 * The constructor function also contains all of the static members of the class.
 * Another way to think of each class is that there is an instance side and a static side.

Let’s modify the example a bit to show this difference:
 */
/**
 * Greeter
 */
var Greeter1 = (function () {
    function Greeter1() {
    }
    Greeter1.prototype.greet = function () {
        if (this.greeting) {
            return "Hello, " + this.greeting;
        }
        else {
            return Greeter1.standardGreeting;
        }
    };
    Greeter1.standardGreeting = "Hello, there";
    return Greeter1;
}());
var greeter1;
greeter1 = new Greeter1();
console.log(greeter1.greet());
var greeterMaker = Greeter1;
greeterMaker.standardGreeting = "Hey, there!";
var greeter2 = new greeterMaker();
console.log(greeter2.greet());
/**
 * In this example, greeter1 works similarly to before.
 * We instantiate the Greeter class, and use this object. This we have seen before.

Next, we then use the class directly.
Here we create a new variable called greeterMaker. T
his variable will hold the class itself, or said another way its constructor function.
Here we use typeof Greeter, that is “give me the type of the Greeter class itself”
rather than the instance type. Or, more precisely, “give me the type of the symbol called Greeter”,
which is the type of the constructor function.
This type will contain all of the static members of Greeter along with the constructor
that creates instances of the Greeter class. We show this by using new on greeterMaker,
creating new instances of Greeter and invoking them as before.
 */
/**
 * Using a class as an interface
 *
 * As we said in the previous section, a class declaration creates two things:
 *     + a type representing instances of the class
 *     + a constructor function.
 * Because classes create types, you can use them in the same places you would be able to use interfaces.
 */
/**
 * Point
 */
var Point = (function () {
    function Point() {
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };
