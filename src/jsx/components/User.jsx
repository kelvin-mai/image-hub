import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {
        username: '',
        avatar: '/placeholder-avatar.png',
        followers: [],
        follows: []
      },
      me: false,
      error: false
    }
    this.follow = this.follow.bind(this);
  }
  follow(){
    this.setState({followed: true})
    if (localStorage.user){
      const currentUser = JSON.parse(localStorage.user);
      fetch(`/api/users/${currentUser.username}/follow/${this.state.user._id}`,{
        method: 'PUT',
        data: '',
        headers: new Headers({
          'Content-Type':'application/json',
          'Authorization':`Bearer ${currentUser.token}`
        })
      }).then(data => this.componentWillMount())
      .catch(err => this.setState({error: true}));
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.componentWillMount();
  }

  componentWillMount(){
    let me = false;
    if (localStorage.user && JSON.parse(localStorage.user).username == this.props.match.params.username){
      me = true;
    }
    fetch(`/api/users/${this.props.match.params.username}`)
      .then(res => {
        if (res.status >= 400) return Promise.reject(res);
        return res.json();
      }).then(user => this.setState({user, me}))
      .catch(err => this.setState({error: true}));
  }

  render() {
    if (this.state.error) return <Redirect to='/error' />
    const {user, me} = this.state;
    let followed = false;
    return (
      <div className='User'>
        <div className='User-avatar'>
          <img src={user.avatar} />
        </div>
        <div className='User-info'>
          <h1 className='User-info_name'>{user.username}</h1>
          <p>Followers: {user.followers.length}</p>
          <p>Follows: {user.follows.length}</p>
          {
            !me || !followed ? <button className='User-btn' onClick={this.follow}>Follow</button> : ''
          }
        </div>
      </div>
    );
  }
}
