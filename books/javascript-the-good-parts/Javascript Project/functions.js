// Functions

// Invocation Patterns

//
// Method Invocation Pattern
// ------ ---------- -------
//
var myObject = {
	value: 0,
	increment: function(inc_amount) {
		this.value += typeof inc_amount === 'number' ? inc_amount : 1;
	}
};
document.writeln("myObject.value: " + myObject.value);
myObject.increment();
document.writeln("myObject.value: " + myObject.value);
myObject.increment(5);
document.writeln("myObject.value: " + myObject.value);
myObject.increment("passing a non-numeric value still increments and causes no error...");
document.writeln("myObject.value: " + myObject.value);

document.writeln();

//
// Function Invocation Pattern
// -------- ---------- -------
//

// Function is defined as a Global Function Literal
var add = function(a, b) {
	// Notice that this overrides the function definition in basics.js
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: "TypeError",
			message: 'add requires numbers as parameters'
		}
	}
	return a + b;
}
var sum = add(6, 7);

// The above form of invocation has 'this' bound to the Global Object (bad!)
// Having the context bound to the Global Object means that an inner function 
// has no access to the variables of an enclosing function (if there is one).

// Let's add a method 'double' to the existing myObject defined above...
myObject.double = function() {
	var that = this;
	
	var helper = function() {
		// When execution gets here 'this' is pointing to the Global Context ("window")
		that.value = add(that.value, that.value);
	}

	helper();
};
myObject.double();
document.writeln(myObject.value);

// More examples showing the need for 'that'
var value = 2;
myObject.doubleNot = function() {
	var helper = function() {
		this.value = add(this.value, this.value);
	}

	helper();
}
myObject.doubleNot(); // Does not double because it is operating on the value in the Global Context
document.writeln(myObject.value + " myObject.value did not get doubled");
document.writeln(value + "  global variable \'value\' did get doubled (2 + 2)"); // This prints 2 + 2 === 4

document.writeln();

//
// Constructor Invocation Pattern
// ----------- ---------- -------
//

var Quo = function(string) {
	this.status = string;
}

Quo.prototype.get_status = function() {
	return this.status;
}

var myQuo = new Quo("confused");

document.writeln("myQuo status is: " + myQuo.get_status());

document.writeln();

//
// Apply Invocation Pattern
// ----- ---------- -------
//
var parms_array = [5, 6];
var sum = add.apply(null, parms_array);
document.writeln(sum + ' this is the result of invoking add.apply() with [5, 6]<br>');

var statusObject = {
	status: 'A-OK'
};

// The following shows how to change the context of an invoked method using apply().
// The 'status' property is defined in the context of the 'statusObject'.  When we
// 'pass the statusObject' as the first parameter of the apply() method then  it's 
// context is used and the value of it's status property is displayed by the status()
// function of myQuo. Whoa!
document.writeln(myQuo.get_status.apply(statusObject));
document.writeln();


// Arguments
var some_function = function(o) {
	document.writeln("arguments: " + arguments);
	return arguments;
}
document.writeln("argments.length is: " + some_function(0));
document.writeln();

// Exceptions
try {
	add(1, "string");
} catch (e) {
	document.writeln("Exception: " + e.name + ": " + e.message);
};
document.writeln();

//
// Type Augmentation
// ---- ------------
//
// See 'method' declaration in headers.js!
//

// Add an 'integer' method to the Number prototype
Number.method('integer', function() {
	// Somehow 'this' is the primative value resulting from (-10 / 3).
	// The following line evaluates to:
	// Math['ceil'](3.33335);
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});
var int = (-10 / 3).integer();
document.writeln("Chopping off the fractional part of -10/3 yields: " + int);
document.writeln();

// Add a 'trim' method to the String prototype
String.method('trim', function() {
	// Somehow 'this' is the String upon which the method has been invoked.
	// 'untrimmed_string' in this case.
	return this.replace(/^\s+|\s+$/g, '');
});
var untrimmed_string = "     neat     ";
document.writeln('"' + untrimmed_string + '"');
document.writeln('"' + untrimmed_string.trim() + '"');
document.writeln();

// Recursion
var hanoi = function hanoi(disc, src, aux, dst) {
	if (disc > 0) {
		hanoi(disc - 1, src, dst, aux);
		document.writeln('move disc ' + disc + ' from ' + src + ' to ' + dst);
		hanoi(disc - 1, aux, src, dst);
	}
};

hanoi(3, 'Source', "Auxilary", "Destination");
