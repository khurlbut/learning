import React from 'react';
import ReactDOM from 'react-dom';

/* Traditional HTML form.
<form>
	<label>
		Name:
		<input type="text" name="name" />
	</label>
	<input type="submit" value="Submit" />
</form>
*/

/*
In React we use Controlled Components

Notice that 'value' is maintained in the React state. 

The handleChange method invokes the setState() method to 
mutate the value on each keystroke, and the value is 
retrieved from the React state for display in the form.

With Controlled Components all state mutations are controlled
by a handler method. This makes it easy to modify or validate
user input.
*/

class NameForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	// This is the original handleChange method...
	// handleChange(event) {
	// 	this.setState({value: event.target.value});
	// }

	// This version of handleChange demonstrates how easy it is
	// to modify/validate user input by forcing all submitted
	// characters to be Upper Case.
	handleChange(event) {
		this.setState({value: event.target.value.toUpperCase()});
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.value);
		// I think 'preventDefault' is a way to tell React to ignore
		// it's default handling of this event. We have handled the
		// event by showing our alert message and that is we want to
		// have happen.
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<input type="text" value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

ReactDOM.render(
	<NameForm />,
  	document.getElementById('root')
);
