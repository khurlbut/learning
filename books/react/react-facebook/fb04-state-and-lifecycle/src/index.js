import React from 'react';
import ReactDOM from 'react-dom';

/* 
The following Clock works fine, but it can't update itself.
We must rely on an external call to setInterval() to update
the clock.

You can see this clock in action by uncommenting the tick()
method in ReactDOM.render() (bottom).
*/
function Clock(props) {
	return (
		<div>
			<h1>Goodbye, cruel world...</h1>
			<h2>It is {props.date.toLocaleTimeString()}.</h2>
		</div>
	);
}

function tick() {
	ReactDOM.render(
		<Clock date={new Date()} />,
		document.getElementById('root')
	);
}

// Uncomment the setInterval() method to see the original,
// stateless clock in action.

// setInterval(tick, 1000);

function FormattedDate(props) {
	return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

/*
Components that are defined as classes may be stateful.

To make the Clock self-updating we need to endow it with 
'state'. 

'state' is maintained at the Component level and flows "down",
never "up". Put anoter way, Component A may invoke Component B
and pass state "down" from A to B.  However, the state of B is
neven accessible to A.

Let's create a ClassClock...

Notice that ClassClock references "this" (Component context) to 
access its stateful properties.

Also notice the addition of a constructor which invokes the 
super/base (React.Component) constructor. All stateful class 
components should do this!

The class component also has a render() method which is 
invoked to get the element to display in the DOM.

Class Components also support LifeCycleleHooks.
                              -----------------

LifeCycleHooks include:
	componentDidMount()
	componentWillUnmount()

We use the LifeCycleHooks to update the clock internally.
*/
class ClassClock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {date: new Date()};
	}

	/*
	componentDidMount is invoked after the Component has been
	rendered in the DOM.

	We set the timerID directly onto "this" (Component context).

	Notice that the 'timerID' us not actually used.  We only 
	save it so that it can be referenced in the Unmount method
	(the clock works just fine without saving the 'timerID').
	*/
	componentDidMount() {
		this.timerID = setInterval(
			() => this.statefulTick(),
			1000
		);
	}

	/*
	componentWillUnmount() is invoked when the Component is
	about to be removed from the DOM.
	*/
	componentWillUnmount() {
		clearInterval(this.timerID)
	}

	statefulTick() {
		this.setState({
			date: new Date()
		});
	}

	/*
	this.props:
	-----------
		Is 'owned' by React and is read-only for us.

	this.state:
	-----------
		Has special meaning and is intended for use in the render() 
		method only! 

	this.anyOtherField:
	--------------------
		We are free to create other fields if we need to track 
		something that is not used for visual output. 'this.timerID' 
		is an example of a non-visual field not managed in this.state. 
		"non-visual" means it is not referenced in the render() 
		method.
	*/
	render() {
		return (
			<div>
				<h1>Goodbye, cruel world...</h1>
				<FormattedDate date={this.state.date} />
			</div>
		);
	}
}

/*
Important things to remember about state:

1. Never update the state directly. Always use setState()
method instead (initialization in the constructor seems
to be an exception?).

2. State updates may be Asynchrounous.  If you need the
"current/previous" state as the starting point to create
your new state then use the 2 parameter version of
setState
	setState(previousState, props)
This is because React may optimize state changes and bundle
several updates into a single setState call.  If you attempt
to access the current state directly you might be behind.

3. React does "shallow" updates of your state. This means
it only updates the attributes contained in the object 
you pass to setState and leaves other attributes unchanged.
So,  if you have multiple state attibutes you can update 
them independently.

The following App Component demonstrates that each instance
of ClassClock has its own state.  State is "local" or
"encapsulated" to/within each Component.
*/

function App() {
	return (
		<div>
			<ClassClock />
			<ClassClock />
			<ClassClock />
		</div>
	);
}


ReactDOM.render(
	// tick(),
	<ClassClock />,
	// <App />,
	document.getElementById('root')
);


