"use strict";

// Functional Pattern 

var mammal = function(spec) {
	var that = {};

	that.get_name = function() {
		return spec.name;
	};

	that.says = function() {
		return spec.saying;
	};

	return that;
};

var myMammal = mammal({name: 'Herb'});

document.writeln("myMammal\'s name: " + myMammal.get_name());
document.writeln("myMammal says: " + myMammal.says());

// Showing 'inheritance'
var cat = function(spec) {
	spec.saying = spec.saying || "meow";
	var that = mammal(spec);
	
	that.purr = function(n) {
		var i, s = '';
		for (i = 0; i < n; i++) {
			if (s === '') {
				s = 'p';
			}
			if (s.length > 2) {
				s += '-';
			}
			s += 'r';
		}
		return s;
	};

	that.get_name = function() {
		return that.says() + ' ' + spec.name + ' ' + that.says();
	}

	return that;
};

var myCat = cat({name: "Joe-Joe"});

document.writeln();
document.writeln("myCat\'s name: " + myCat.get_name());
document.writeln("myCat says: " + myCat.says());
document.writeln(myCat.purr(3));

// Showing how to access a super object
// First, add a 'superior' method to the Object prototype
Object.method('superior', function(name) {
	var that = this;
	var method = that[name];

	return function() {
		return method.apply(that, arguments);
	};
});

// And 'extend' cat
var coolcat = function(spec) {
	var that = cat(spec);
	var super_get_name = that.superior('get_name');

	that.get_name = function(n) {
		return 'like ' + super_get_name() + ' baby';
	};

	return that;
};

var myCoolCat = coolcat({name: 'Buddy'});

document.writeln("myCoolCat\'s name: " + myCoolCat.get_name());
document.writeln("myCoolCat says: " + myCoolCat.says());
document.writeln(myCoolCat.purr(6));

