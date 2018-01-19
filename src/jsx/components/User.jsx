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
      followed: false,
      me: false,
      error: false,
      toggle: false,
      avatar: ''
    }
    this.follow = this.follow.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.toggleUpdate = this.toggleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  updateUser(e){
    e.preventDefault();
    const {user} = this.state;
    user.avatar = this.state.avatar;
    const data = JSON.stringify({avatar: user.avatar});
    console.log(data);
    this.setState({user});
    const currentUser = JSON.parse(localStorage.user);
    fetch(`/api/users/${currentUser.username}`,{
      method: 'PUT',
      body: data,
      headers: new Headers({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${currentUser.token}`
      })
    }).catch(err => this.setState({error: true}));

  }
  toggleUpdate(){
    this.setState({toggle: !this.state.toggle});
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this.componentWillMount();
  }

  componentWillMount(){
    let currentUser, me, followed = false;
    if (localStorage.user){
      currentUser = JSON.parse(localStorage.user);
      if (currentUser.username == this.props.match.params.username){
        me = true;
    }}
    fetch(`/api/users/${this.props.match.params.username}`)
      .then(res => {
        if (res.status >= 400) return Promise.reject(res);
        return res.json();
      }).then(user => {
        if (user.followers.filter(follower => follower.username == currentUser.username).length > 0){
          followed = true;
        }
        this.setState({user, me, followed});
      })
      .catch(err => this.setState({error: true}));
  }

  render() {
    if (this.state.error) return <Redirect to='/error' />
    const {user, me, followed, toggle, avatar} = this.state;

    return (
      <div className='User'>
        <div className='User-avatar'>
          <img src={user.avatar} />
          { me
            ? <button
              className='Button Button_blue'
              onClick={this.toggleUpdate}>Change avatar</button>
            : '' }
          { toggle
            ? <form onSubmit={this.updateUser}>
                <input
                  type='text'
                  name='avatar'
                  placeholder='avatar'
                  value={avatar}
                  autoComplete='off'
                  onChange={this.handleChange}
                />
                <input type='submit' style={{display:'none'}} />
              </form>
            : ''}
        </div>
        <div className='User-info'>
          <h1 className='User-info_name'>{user.username}</h1>
          <p>Followers: {user.followers.length}</p>
          <p>Follows: {user.follows.length}</p>
          {
            !me && !followed
              ? <button className='Button Button_blue' onClick={this.follow}>Follow</button>
              : ''
          }
        </div>
      </div>
    );
  }
}
