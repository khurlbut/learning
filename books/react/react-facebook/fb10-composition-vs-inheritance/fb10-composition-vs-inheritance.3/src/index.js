import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
Specialization

Consider a <WelcomDialog /> which is a special case of <Dialog />.

The <WelcomeDialog /> "has a" more generic <Dialog /> and it
injects the attributes which make it "welcoming".

This is Composition.
*/

// Generic Dialog
function Dialog(props) {
	return (
		<FancyBorder color="blue">
			<h1 className="Dialog-title">
				{props.title}
			</h1>
			<p className="Dialog-message">
				{props.message}
			</p>
		</FancyBorder>
	);
}

// Specialized Dialog
function WelcomeDialog() {
	return (
		<Dialog
			title="Welcome"
			message="Thank you for visiting our spacecraft!" />
	);
}

function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

ReactDOM.render(
	<WelcomeDialog />,
  	document.getElementById('root')
);
