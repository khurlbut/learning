"use strict";

var myObject = (function() {
	var value = 0;

	return {
		increment: function(inc_value) {
			value += typeof inc_value == 'number' ? inc_value : 1;
		},
		getValue: function() {
			return value;
		}
	};
}());

// It seems that we can still access a 'value' property on the local 'myObject', 
// but this 'value'  is independent of the 'value' in the Closure. We can read
// and set the 'myObject.value',  however,  this has no impact on the behavior
// of the 'value' which is controlled by the methods in the Closure.
myObject.value = 5;
document.writeln("myObject value is: " + myObject.getValue()); // Returns 0 (not 5)
myObject.increment();
document.writeln("myObject value after increment is: " + myObject.getValue()); // Returns 1
document.writeln("myObject.value is: " + myObject.value); // Returns 5

// This is an alternative way to initialize the 'value'
var myObject = (function(value) {
	return {
		increment: function(inc_value) {
			value += typeof inc_value == 'number' ? inc_value : 1;
		},
		getValue: function() {
			return value;
		}
	};
}(100));
document.writeln("myObject value is: " + myObject.getValue()); // Returns 100
myObject.increment(25);
document.writeln("myObject value after increment is: " + myObject.getValue()); // Returns 125

// Creation of "quo" ('status quo' haha) without using a 'new' operator. 
// The 'status' is now 'private'.
var quo = function(status) {
	return {
		get_status: function() {
			return status;
		}
	};
};

var myQuo = quo("Amazed");
document.writeln(myQuo.get_status());

// Fade the page...
var fade = function(node) {
	var level = 1;
	var fade_speed = 100;

	var step = function() {
		var hex = level.toString(16);
		node.style.backgroundColor = '#FFFF' + hex + hex;
		if (level < 15) {
			level += 1;
			setTimeout(step, fade_speed);
		}
	};
	setTimeout(step, fade_speed);
};

fade(document.body);
