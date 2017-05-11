import React from 'react';
import ReactDOM from 'react-dom';

/*
Handling Multiple Inputs.

Notice that the handleInputChange method is performing
"double duty". It is using a ternary operator to figure
out which input to update. This is fine for a simple
example but I think a more complicated form would require
something more sophisiticated.
*/

class Reservation extends React.Component {
	constructor(props) {
		super(props); 
		this.state = {
			isGoing: true,
			numberOfGuests: 2
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

/*
Notice the use of the "Computed Property Name" (new in ES6). We
assign 'value' directly to '[name]'. This is equivalent to:

	var partialState = {};
	partialState[name] = value;
	this.setState(partialState);
*/
		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<form>
				<label>
					Is going:
					<input
						name="isGoing"
						type="checkbox"
						checked={this.state.isGoing}
						onChange={this.handleInputChange} />
				</label>
				<br />
				<label>
					numberOfGuests:
					<input
						name="numberOfGuests"
						type="number"
						value={this.state.numberOfGuests}
						onChange={this.handleInputChange} />
				</label>
			</form>
		);
	}
}

ReactDOM.render(
	<Reservation />,
  	document.getElementById('root')
);
