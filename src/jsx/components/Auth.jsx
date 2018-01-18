import React, { Component } from 'react';

export default class Auth extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  handleAuth(e){
    e.preventDefault();
    this.setState({error: ''});
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
        if (user.message) return Promise.reject(user);
        localStorage.user = JSON.stringify(user);
        this.props.onAuth();
      })
      .catch(err => {
        this.setState({error: err.message});
      });
    } else {
      localStorage.clear();
      this.props.onAuth();
    }
  }

  handleRegister(){
    this.setState({error: ''});
    const {username, password} = this.state;
    const data = JSON.stringify({username, password});
    fetch('/auth/register', {
      method: 'POST',
      body: data,
      headers: new Headers({'Content-Type':'application/json'})
    }).then(res => res.json())
    .then(user => {
      if (user.message) return Promise.reject(user);
      localStorage.user = JSON.stringify(user);
      this.props.onAuth();
    })
    .catch(err => {
      this.setState({error: err.message});
    });
  }

  render(){
    const {username, password, error} = this.state;
    const {authenticated} = this.props;
    const login =
      <div className='Auth'>
        <form onSubmit={this.handleAuth}>
          <input
            className='Auth-input'
            type='text'
            name='username'
            placeholder='username'
            value={username}
            autoComplete='off'
            onChange={this.handleChange}
          />
          <input
            className='Auth-input'
            type='password'
            name='password'
            placeholder='password'
            value={password}
            autoComplete='off'
            onChange={this.handleChange}
          />
        </form>
      </div>;
    const btn =
    <button className='Auth-btn' onClick={this.handleAuth}>
      {!authenticated ? 'Login' : 'Logout'}
    </button>

    return (
      <div>
        {!authenticated ? login : ''}
        <div className='Auth-buttons'>
          {btn}
          <button className='Auth-btn' onClick={this.handleRegister}>Register</button>
        </div>
        {error}
      </div>
    );
  }
}
