import React from 'react';
import ReactDOM from 'react-dom';

function formatDate(date) {
	return date.toLocaleDateString();
}

/*
Components can be declared as functions or as classes.

Components must never attempt to modify their own props. From
the Component point of view they are "input only" (or read
only). This is by convention, and is not enforced, just like
Strings in 'C'. In 'C' there is nothing to prevent you from
writing into memory that is beyond the memory allocated for
the String, resulting in havoc. Modifying the props in a 
Component should be thought of the same way.

Rule: All React Components must act like "pure functions" with 
respect to their props.

Pure Functions are:
	1. Idempotent
	2. Never modify thier input parameters
*/

/*
Here is a big, overly complex Component. Always use common sense
coding practices to break things like this down into smaller pieces.
*/
function ComplexComment(props) {
	return (
		<div className="Comment">
			<div className="UserInfo">
				<img className="Avatar"
					src={props.author.avatarUrl}
					alt={props.author.name}
				/>
				<div className="UserInfo-name">
					{props.author.name}
				</div>
			</div>
			<div className="Comment-text">
				{props.text}
			</div>
			<div className="Comment-date">
				{formatDate(props.date)}
			</div>
		</div>
	);
}

/*
To break down the above "ComplexComment" a bit pull out
the Avatar section into it's own function.

In order to generalize the Avatar function we can change the
prop name to 'user' rather than 'author' (see the line that
invokes the Avatar in LessComplexComment). 

It is a good idea to name properties from the components point 
of view rather than the context of components that use it. 
*/
function Avatar(props) {
	return (
		<img className="Avatar"
			src={props.user.avatarUrl}
			alt={props.user.name}
		/>
	);
}

function LessComplexComment(props) {
	return (
		<div className="Comment">
			<div className="UserInfo">
				<Avatar user={props.author} />
				<div className="UserInfo-name">
					{props.author.name}
				</div>
			</div>
			<div className="Comment-text">
				{props.text}
			</div>
			<div className="Comment-date">
				{formatDate(props.date)}
			</div>
		</div>
	);
}

/*
Next we pull out the UserInfo section to create the 
LeastComplextComment
*/
function UserInfo(props) {
	return (
		<div className="UserInfo">
			<Avatar user={props.user} />
			<div className="UserInfo-name">
				{props.user.name}
			</div>
		</div>
	)
}

/*
Notice in the invocation of UserInfo we pull the 'props.author'
into the 'user' property. This allows UserInfo to reference it's
properties in the more generic sense of 'user'. Just like we did
with Avatar.
*/
function LeastComplexComment(props) {
	return (
		<div className="Comment">
			<UserInfo user={props.author} />
			<div className="Comment-text">
				{props.text}
			</div>
			<div className="Comment-date">
				{formatDate(props.date)}
			</div>
		</div>
	);

}
const comment = {
	date: new Date(),
	text: 'I hope you enjoy learning React!',
	author: {
		name: 'Hello Kitty',
		avatarUrl: 'http://placekitten.com/g/64/64'
	}
};

/*
Notice that each of the Components share the property references. They
are not bound to the LeastComplexComment only.
*/
ReactDOM.render(
	<ComplexComment 
	// <LessComplexComment
	// <LeastComplexComment
		date={comment.date}
		text={comment.text}
		author={comment.author}
	/>,
  document.getElementById('root')
);
