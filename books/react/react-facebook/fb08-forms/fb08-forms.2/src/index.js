import React from 'react';
import ReactDOM from 'react-dom';

/* Traditional HTML textarea.
<textarea>
	Hello there, this is some text in a text area
</textarea>
*/

/* 
Here is a React Controlled Component that creates a textarea.

Notice the use of state.
*/

class EssayForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 'Please write an essay about your favorite DOM element.'
		};

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		alert('An essay was submitted: ' + this.state.value);
		event.preventDefault();
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>
					Name:
					<textarea value={this.state.value} onChange={this.handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

ReactDOM.render(
	<EssayForm />,
  document.getElementById('root')
);
