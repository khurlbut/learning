import React from 'react';
import ReactDOM from 'react-dom';

/* 
This is JavaScript Extension (JSX).  It is a syntax extension 
to JavaScript. More accurately, it is "syntactic sugar" which
combines HTML with JavaScript for use with React.

A Babel compiler can compile JSX into standard JavaScript. 
Babel can "transpile" various versions of JS into older,
more widely supported versions of JS. In the case of JSX
Babel compiles HTML'ish stuff into standard JS which uses
Reach libraries/packages/components (still not sure which).

<div className="sidebar" />

The above "HTML" compiles into the JS below...

React.createElement(
  'div',
  {className: 'sidebar'},
  null
)

It should be used with React to describe the UI. It looks a
bit like a template language, but it has the full power of 
JavaScript. 
*/

function formatName(user) {
	return user.firstName + ' ' + user.lastName
}

function getGreeting(user) {
	if (user) {
		return <h1>Hello, {formatName(user)}!</h1>;
	}
	return <h1>Hello, Stranger.</h1>;
}

const user = {
	firstName: 'Kevin',
	lastName: 'Davidson'
}

/*
JSX has 'elements'.  Elements are displayed in the UI
and can be created in multiple ways, as shown below.
*/

const singleLineElement = <h1>Hello, {formatName(user)}!</h1>

// Multiline element (requires parentheses).
const multiLineElement = (
	<h1>
		Hello, {formatName(user)}!
	</h1>
)

// Elements with children (multiple HTML sub-elements) 
// require a wrapping <div/>
const elementWithChildren = (
	<div>
		<h1>Hello!</h1>
		<h2>Good to see you here.</h2>
	</div>
)

/*
JSX is compiled (by Babel) into "React Elements". 
React elements are then transformed into JavaScript
objects.  

JSX elements and React elements are essentially
identical. We can choose to write React elements
directly if we choose.
*/

const jsxElement = (
	<h1 className="greeting">
		Hello, World!
	</h1>
)

const reactElement = React.createElement(
	'h1',
	{className: 'greeting'},
	'Hello, World!'
)

/*
The output of the createElement() function will
look like this...
*/

const javaScriptElement = {
	type: 'h1',
	props: {
		classname: 'greeting',
		children: 'Hello, World!'
	}
}

/*
Un-comment any element line (below) to see how it works!
*/

ReactDOM.render(
	// singleLineElement,
	// multiLineElement,
	// getGreeting(user),
	// elementWithChildren,
	// jsxElement,
	reactElement,
  	document.getElementById('root')
);
