import React from 'react';
import ReactDOM from 'react-dom';

/*
Elements are the building blocks in Components.

Elements are immutable.

Elements may be thought of as a single frame in a movie.
They represent the UI at a certain point in time.
*/

function tick() {
	const element = (
		<div>
			<h1>Hello, world!</h1>
			<h2>It is {new Date().toLocaleTimeString()}.</h2>
		</div>
	)
	ReactDOM.render(
		element,
  		document.getElementById('root')
	);
}

setInterval(tick, 2000);

