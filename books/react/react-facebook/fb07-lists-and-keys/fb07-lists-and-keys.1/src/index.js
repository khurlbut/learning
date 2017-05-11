import React from 'react';
import ReactDOM from 'react-dom';

// The simplest way to render a list...
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => 
	<li>{number}</li>)

// Using a Component to render lists...
function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
		<li key={number.toString()}>
			{number}
		</li>
	);
	return (
		<ul>{listItems}</ul>
	)
}
/*
Note the 'key' attribute on the <li> tag. When I look at the
"Developer Tools" console I see a Warning error when I don't
include the 'key'.

The key is somehow used when to manage items when they are 
changed, added or removed. Documentation says I should always 
use one.

The keys only make sense within the context of the surrounding
array. This can make things slightly non-intuitive when you 
refactor.
*/

/*
The Wrong Way!

Below is an incorrect refactoring of NumberList (WrongNumberList).  
The key is specified in the wrong place. Just like the NumberList
(above) this Component seems to work but it does generate a
Warning in the Tools console.
*/
function WrongListItem(props) {
	const value = props.value;
	return (
		// Don't specify the hey here.
		<li key={value.toString}>
			{value}
		</li>
	);
}

function WrongNumberList(props) {
	const numbers = props.numbers;
	const WrongListItems = numbers.map((number) =>
		// The key should be specified here...
		<WrongListItem value={number} />
	);
	return (
		<ul>
			{WrongListItems}
		</ul>
	);
}

/*
The Right Way! 
Below is the correct way to handle the keys. There is no
key related warning in the console with this Component.

Rule of thumb: Elements inside the map() call need keys.
*/
function RightListItem(props) {
	return <li>{props.value}</li>;
}

function RightNumberList(props) {
	const numbers = props.numbers;
	const RightListItems = numbers.map((number) =>
		<RightListItem key={number.toString()} 
			value={number} />
	);
	return (
		<ul>
			{RightListItems}
		</ul>
	);
}

/*
Here is an alternative implementation with the map embedded
directly in the JSX. The named variable has been eliminated.
It is a bit cleaner, but possibly more obsure.
*/
function RightNumberListWithEmbeddedMap(props) {
	const numbers = props.numbers;
	return (
		<ul>
			{numbers.map((number) =>
				<RightListItem key={number.toString()} 
					value={number} />
			)}
		</ul>
	);
}

ReactDOM.render(
	// <ul>{listItems}</ul>,
	// <NumberList numbers={numbers} />,
	// <WrongNumberList numbers={numbers} />,
	// <RightNumberList numbers={numbers} />,
	<RightNumberListWithEmbeddedMap numbers={numbers} />,
  	document.getElementById('root')
);
