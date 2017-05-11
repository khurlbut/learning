"use strict";

// Assempbling Parts in JavaScript (A.K.A "mixin")

// Example: Mixing an Event Processor into any generic object
//  var some_func = function(spec, my) {
//	    ...
//      eventuality(this);
//      ...
//      return that;
//  }
//  
//  Adding the call to eventuality in the constructor will add the 'on'
//  and 'fire' capabilities to the some_func function.
//
//  Also see: http://stackoverflow.com/questions/6173780/douglas-crockfords-javascript-the-good-parts-chapter-5-5
//:

var eventuality = function(that) {
	var registry = {};

	that.fire = function(event) {
		var array;
		var func;
		var handler;
		var i;
		var type = typeof event === 'string' ? event : event.type;

		if (registry.hasOwnProperty(type)) {
			array = registry[type];
			for (i = 0; i < array.length; i++) {
				handler = array[i];

				func = handler.method;
				if (typeof func === 'string') {
					func = this[func];
				}

				func.apply(this, handler.parameters || [event]);
			}
		}	
			
		return this;
	};

	that.on = function(type, method, parameters) {
		var handler = {
			method: method,
			parameters: parameters
		};
		if (registry.hasOwnProperty(type)) {
			registry[type].push(handler);
		} else {
			registry[type] = [handler];
		}
		return this;
	};

	return that;
};