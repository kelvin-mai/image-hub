import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
  constructor(){
    super()
    this.state = {
      names: []
    }
  }
  componentDidMount(){
    fetch('/api')
    .then(res => res.json())
    .then(names => {
      this.setState({names})
      console.log(this.state);
    });
  }

  render() {
    const names = this.state.names.map(name => (
      <li key={name.id}>{name.name}</li>
    ));
    return <div>{names}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
