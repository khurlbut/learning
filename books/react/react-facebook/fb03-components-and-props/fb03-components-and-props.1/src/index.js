import React from 'react';
import ReactDOM from 'react-dom';
/*
Elements can be represented by user-defined components.
*/

/* 
User-defined component 'Welcome'.
Component accepts JSX Attributes object 'props'.

Componenent names should always start with a Capital Letter (by
convention).
*/
function Welcome(props) {
	return <h1>Hello, {props.name}</h1>
}

/*
Components are "composable", that is, they can reference other
components.  Here, the 'App' component invokes the 'Welcome'
component multiple times, each time assigning a different value
to the JSX name attribute in 'props'.

Components must always return a single root element. This is
accomplished by wrapping all of the 'Welcome' invocations in 
a single <div /> element.
*/
function App() {
	return (
		<div>
			<Welcome name="Sara" />
			<Welcome name="Cahal" />
			<Welcome name="Edite" />
		</div>
	)
}

/*
The simpleElement object refers to the 'Welcome' component and
sets the name attribute of the 'props' object to 'Sara'.
*/
const simpleElement = <Welcome name="Sara" />

/*
When using 'simpleElement' React invokes the 'Welcome' 
component with the value 'Sara' in the 'name' attribute 
of the JSX 'props' object.

ReactDOM.render can also invoke Componets directly, as shown
when we use <App />.
*/
ReactDOM.render(
	// simpleElement,
	<App />,
  	document.getElementById('root')
);
