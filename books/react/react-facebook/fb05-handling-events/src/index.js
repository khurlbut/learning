import React from 'react';
import ReactDOM from 'react-dom';

/*
Synthetic Events are events that wrap each browswers native 
events into a single, cross-browser eventing system. Using
Synthetic events frees you from coding events for each 
individual browser.

handleClick (as opposed to 'handleclick') is a synthetic event
(note the uppercase 'C' vs the lowercase 'c').
*/

class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggleOn: true};

		// "This binding is necessary to make 'this' work in the callback"
		this.handleClick = this.handleClick.bind(this);

		/*
		This business of binding 'this' to handleClick has to do
		with the underlying JavaScript. Class methods are not bound
		to "this" by default.  If you don't bind 'this' then it will
		be undefined when you invoke the function.

		The tutorial says "Generally, if you refer to a method without
		() after it, such as onClick={this.handleClick}, you should
		bind that method".

		There are 'experimental' sytactical workarounds, but I think
		I will ignore those for now. Perhaps by the time I am
		re-reading this the alternatives will be mainstream.
		*/
	}

	handleClick() {
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}

	render() {
		return (
			<button onClick={this.handleClick}>
				{this.state.isToggleOn ? 'ON' : 'OFF'}
			</button>
		)
	}
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);
