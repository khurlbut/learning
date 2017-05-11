import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
/*
This example demonstrates how to work with multiple 
"children" or "holes".

If you need a generic Component and a single children
element won't work you can create your own props, like
this...

Note the props.left and props.right in the SplitPane 
function.

Also note that React elements like <Contacts /> and 
<Chat /> are just objects, so you can pass them as 
props like any other data.
*/

function Contacts() {
  return <div className="Contacts" />;
}

function Chat() {
  return <div className="Chat" />;
}

function SplitPane(props) {
	return (
		<div className="SplitPane">
			<div className="SplitPane-left">
				{props.left}
			</div>
			<div className="SplitPane-right">
				{props.right}
			</div>
		</div>
	);
}

function App() {
	return (
		<SplitPane
			left={
				<Contacts />
			}
			right={
				<Chat />
			}
		/>
	);
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
