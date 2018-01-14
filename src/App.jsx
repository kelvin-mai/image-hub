import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Test</h1>
        <div className="loader" />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
