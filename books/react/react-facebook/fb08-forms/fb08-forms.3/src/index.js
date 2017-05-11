import React from 'react';
import ReactDOM from 'react-dom';

/* Traditional HTML select.
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>*/

/* 
Here is a React Controlled Component that creates a select.

Notice the use of state.
*/

class FlavorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 'coconut'};

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('Your favorite flavor is: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<center>
			<form onSubmit={this.handleSubmit}>
				<label>
					Pick your favorite La Croix flavor:<br/>
					<select value={this.state.value} onChange={this.handleChange}>
						<option value="grapefruit">Grapefruit</option>
						<option value="lime">Lime</option>
						<option value="coconut">Coconut</option>
						<option value="mango">Mango</option>
					</select>
				</label>
				<br/>
				<input type="submit" value="Submit" />
			</form>
			</center>
		);
	}
}

ReactDOM.render(
	<FlavorForm />,
  	document.getElementById('root')
);
