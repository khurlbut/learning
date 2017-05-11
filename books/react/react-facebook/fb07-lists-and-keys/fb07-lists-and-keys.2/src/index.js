import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
This exercise is demonstrating that keys don't need to be globally
unique. We can use the same keys ('post.id' in this example) when
we produce two different arrays.

Note that keys serve as 'hints' for React, but the don't get passed
to my componenets. So...I don't get to use them!
*/
function Blog(props) {
	const sidebar = (
		<ul>
			{props.posts.map((post) =>
				<li key={post.id}>
					{post.title}
				</li>
			)}
		</ul>
	);
	const content = props.posts.map((post) =>
		<div key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content}</p>
		</div>
	);
	return (
		<div>
			{sidebar}
			<hr/>
			{content}
		</div>
	)
}

const posts = [
	{id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
	{id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

ReactDOM.render(
	// Why must the 'posts' parameter be named 'posts'? any other name 
	// fails...
	// Duh! Because the posts are referenced as 'props.posts' in the
	// Blog Component. See lines 16 and 23.
	<Blog posts={posts} />,
  	document.getElementById('root')
);
