import React, { Component } from "react";
import ReactDOM from "react-dom";
import Loading from "./jsx/Loading.jsx";

class App extends Component {
  render() {
    return (
      <div>
        <Loading />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
