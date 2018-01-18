import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../components/Auth.jsx';

export default class AuthPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
      redirect: false
    }
    this.isLoggedIn = this.isLoggedIn.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  isLoggedIn(){
    if (localStorage.user){
      this.setState({authenticated: true});
    } else {
      this.setState({authenticated: false});
    }
  }

  goHome(){
    this.setState({redirect: true});
  }

  componentWillMount(){
    this.isLoggedIn();
  }

  render(){
    if (this.state.redirect) return <Redirect to='/' />
    return (
      <div>
        <Auth
          onAuth={this.goHome}
          authenticated={this.state.authenticated}
        />
      </div>
    );
  }
}
