
// Define a "method" method which defines methods in the Function prototype.
// Also known specifically as 'Function Augmentation' or generically as 'Type Augmentation'.
Function.prototype.method = function(name, func) {
	this.prototype[name] = func;
	return this;
};

// Adding an object 'create' method to the Object prototype:
// This method allows us to specify an arbitrary prototype ('o')
// when we create an object.
if (typeof Object.create !== 'function') { // Add this function to the Object prototype
	Object.create = function(o) {
		var F = function () {}; // Create an empty function
		F.prototype = o; 		// Specify the object's prototype
		return new F();
	}
};
