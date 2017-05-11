import React from 'react';
import ReactDOM from 'react-dom';

/*
We will create a "stateful component" to control (manage) the login 
state.
*/

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    
    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

function UserGreeting(props) {
	return <h1>Welcome Back</h1>;
}

function GuestGreeting(props) {
	return <h1>Please sign in</h1>;
}

function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
	if (isLoggedIn) {
		return <UserGreeting />
	}
	return <GuestGreeting />
}

function LoginButton(props) {
	return (
		<button onClick={props.onClick}>
			Login
		</button>
	);
}

function LogoutButton(props) {
	return (
		<button onClick={props.onClick}>
			Logout
		</button>
	);
}

/*
Alternatives to If/Then/Else

Example: && operator.

Not sure I understand how &&'ing with an <h2> element evaluates
to true...I suppose any non-null element is true?
*/

function Mailbox(props) {
	const unreadMessages = props.unreadMessages;
	return (
		<div>
			<h1>Hello!</h1>
			{unreadMessages.length > 0 &&
				<h2>
					You have {unreadMessages.length} unread messages.
				</h2>
			}
		</div>
	);
}

/*
Example: Conditional Operator

<div>
	"The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in."
</div>

or...

<div>
 {isLoggedIn ? (
 	<logoutbutton onClick={this.handleLogoutClick} />
 ) : (
 	<loginButton onClick={this.handleLoginClick} />
 )}
</div>
*/

/* 
Preventing Component from Rendering.

If you don't want a component to Render have the render()
method return null.
*/

function WarningBanner(props) {
	if (!props.warn) {
		return null;
	}

	return (
		<div className="warning">
			Warning!
		</div>
	);
}

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showWarning: true}
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}

	handleToggleClick() {
		this.setState(prevState => ({
			showWarning: !prevState.showWarning
		}));
	}

	render() {
		return (
			<div>
				<WarningBanner warn={this.state.showWarning} />
				<button onClick={this.handleToggleClick}>
					{this.state.showWarning ? 'Hide' : 'Show'}
				</button>
			</div>
		);
	}
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
	// <LoginControl />,
	// <Mailbox unreadMessages={messages} />,
	<Page />,
  	document.getElementById('root')
);
