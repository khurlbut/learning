import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
Specialization 2

Using Composition with components defined as classes (spoiler 
alert...this works too!)

Here's the bottom line from FaceBook (React developers): 

	 ----------------------------------------------------------
	| Never use Inheritance. Composition is sufficient for all |
	| your Web UI requirements.                                |
	 ----------------------------------------------------------

*/

function Dialog(props) {
	return (
		<FancyBorder color="green">
			<h1 className="Dialog-title">
				{props.title}
			</h1>
			<p className="Dialog-message">
				{props.message}
			</p>
			{props.children}
		</FancyBorder>
	);
}

/*
Here we are using a React Component class to inject values
into the <Dialog /> generic function, which in turn injects
values into the <FancyBorder /> generic function.

Note that Dialog is passing children for the input and button!
*/
class SignUpDialog extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
		this.state = {login: ''};
	}

	render() {
		return (
			<Dialog title="Mars Exploration Program"
				message="How should we refer to you?">
				<input value={this.state.login}
					onChange={this.handleChange} />
				<button onClick={this.handleSignup}>
					Sign Me Up!
				</button>
			</Dialog>
		);
	}

	handleChange(e) {
		this.setState({login: e.target.value});
	}

	// Note that we embed the string with the "`" (back tick)!
	handleSignup(e) {
		alert(`Welcome aboard, ${this.state.login}!`);
	}
}

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

ReactDOM.render(
	<SignUpDialog />,
  	document.getElementById('root')
);
