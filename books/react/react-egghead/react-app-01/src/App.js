import React from 'react';

// This is a class component.
class App extends React.Component {
  render() { // We always have a render() method. It returns a window to the DOM.
    //This is JSX
    return (
      <div>
        <h1>Hello JSX Servies</h1>
        <b>Bold</b>
      </div>
    )
    // This is raw JavaScript - the above JSX compiles down to this.
    //return React.createElement('h1', null, "Hello World!")
  }
}

// This is a stateless function.  
// Class component can have state. This can't.
//const App = () => <h1>Hi</h1>

export default App