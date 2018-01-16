import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './Auth.jsx';
import Loading from './Loading.jsx';
import Feed from './Feed.jsx';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null
    }
    this.handleAuth = this.handleAuth.bind(this);
  }
  handleAuth(){
    if (localStorage.user) {
      const user = JSON.parse(localStorage.user);
      this.setState({authenticated: true, user});
    } else {
      this.setState({authenticated: false, user: null});
    }
  }

  componentWillMount(){
    this.handleAuth();
  }

  render() {
    return (
      <div>
        <Auth
          authenticated={this.state.authenticated}
          onAuth={this.handleAuth}
        />
        {this.state.loading ? <Loading /> : ''}
        <Feed />
      </div>
    );
  }
}
