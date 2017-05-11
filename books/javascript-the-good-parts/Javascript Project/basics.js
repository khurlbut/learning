document.write('Hello, world!<p>');

// Example of a Function Literal
var add = function(a, b) {
	return a + b;
};

document.writeln("Sum of 2 + 3 is " + add(2, 3) + "<br>");

var s = "some string";
document.writeln("The String prototype has a length property: length of 'some string' is: " + s.length + "<br>");

// Object Literals
// Note that '-' is not a legal JS name so 'first-name' must be referenced in quotes.
// An easy workaround is to use '_' (or camel case) instead of hypens.
var stooge = {
	"first-name": "Jerome",
	"last-name": "Howard"
};

// Object Literals can nest...

var flight = {
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2016-10-30 11:55",
		city: "Sydney"
	},
	arrival: {
		IATA: "SFO",
		time: "2016-11-01 18:25",
		city: "San Francisco"
	}
};

// Object Literal retrieval examples...
document.writeln("If you use illegal JS names then you can only retrive object values using [] notation as follows:");
document.writeln("<i>Stooge name is: " + stooge["first-name"] + " " + stooge["last-name"] + "</i><br>");

document.writeln("However, if you use legal JS names you can use the (preferred) 'dot' notation like this:");
document.writeln("<i>Flight departure is: " + flight.departure.time + "</i><br>");

// Object Literals may be updated directly.  New properties may be added at runtime.
stooge["first-name"] = "Jerome 'The Great'"; // Updating an existing property
stooge.nickname = 'Curly'; // Adding a new property

document.writeln(stooge.nickname + "\'s real name is " + stooge["first-name"] + " " + stooge["last-name"] + "<br>");

// Using our user defined 'create' method (see top for definition)
var another_stooge = Object.create(stooge); 	// Create a new object and specify the original 'stooge' object as it's prototype

// We can modify the properties of 'another_stooge' without impacting the underlying prototype ('stooge')
another_stooge["first-name"] = "Harry";
another_stooge["middle-name"] = "Moses";
another_stooge.nickname = "Moe";

document.writeln("stooge nickname is " + stooge.nickname + " while another_stooge nickname is " + another_stooge.nickname);
document.writeln("another_stooge inherits unspecified properties from the underlying stooge...");
document.writeln("stooge[\"last-name\"] is " + stooge["last-name"] + " and another_stooge[\"last-name\") is " + another_stooge["last-name"]);

// The prototype relationship is dynamic - a property added to the Prototype is immediatly available to all objects based on the Prototype
stooge.profession = 'actor';
document.writeln("Moe's profession is " + another_stooge.profession + ".<br>");

// 'another_stooge' does not have the 'profession' property...
document.writeln('another_stooge.hasOwnProperty(\'profession\') is ' + another_stooge.hasOwnProperty('profession') + "<br>");


// Digging values out of objects...
// 1. Raw Enumeration.  This has the potential to get everything (in random order) all the way down to functions in the Object prototype:
var name;
for (name in another_stooge) {
	document.writeln(name + ": " + another_stooge[name]);
};
document.writeln();

// 2. Enumeration while stripping out functions:
var name;
for (name in another_stooge) {
	if (typeof another_stooge[name] !== 'function') {
		document.writeln(name + ": " + another_stooge[name]);
	}
};
document.writeln();

// 3.  Define an array with property names in the desired order
var i;
var properties = [
	'nickname',
	'profession'
]
for(i = 0; i < properties.length; i++) {
	document.writeln(properties[i] + ": " + another_stooge[properties[i]]);
};
document.writeln();

// Deleting a property will reveal a property in the underlying property (if one exists)
document.writeln("another_stooge.nickname is : " + another_stooge.nickname);
delete another_stooge.nickname;
document.writeln("another_stooge.nickname is : " + another_stooge.nickname);
document.writeln();
