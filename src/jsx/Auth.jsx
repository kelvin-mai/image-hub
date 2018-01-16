import React, { Component } from 'react';

export default class Auth extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  handleAuth(e){
    e.preventDefault();
    const {username, password} = this.state;
    const {authenticated} = this.props;
    if (!authenticated){
      const data = JSON.stringify({username, password});
      fetch('/auth/login', {
        method: 'POST',
        body: data,
        headers: new Headers({'Content-Type':'application/json'})
      }).then(res => res.json())
      .then(user => {
        localStorage.user = JSON.stringify(user);
        this.props.onAuth();
      })
      .catch(err => console.log(err));
    } else {
      localStorage.clear();
      this.props.onAuth();
    }
  }

  render(){
    const {username, password} = this.state;
    const {authenticated} = this.props;
    const login =
      <form onSubmit={this.handleAuth}>
        <input
          type='text'
          name='username'
          placeholder='username'
          value={username}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          value={password}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button type='submit'>Log in</button>
      </form>;
    const logout = <button onClick={this.handleAuth}>Log out</button>

    return (
      <div>
        {!authenticated ? login : logout}
      </div>
    );
  }
}
