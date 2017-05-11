import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
/*
This is an example of Containment.

The FancyBorder dialoge does not know what it's children will
be. This is common for generic components like headers, footers
or sidebars.

React provides a special prop called 'children' that can be
passed to components.

Any other component can pass children to FancyBorder
*/
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}

/*
Note: In the tutorial you get a pretty blue border around the
children, but I don't get that. Not even when I copy/paste
the example code into this file. Don't know why...

AHA! Silly me! The border is drawn by CSS!  Add in the CSS file
and the Border appears. Yeah!

Those "className={}" things are hooks for CSS. Duh!
*/
ReactDOM.render(
	<WelcomeDialog />,
  	document.getElementById('root')
);
