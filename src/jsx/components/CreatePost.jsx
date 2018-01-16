import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class CreatePost extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: '',
      caption: '',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  handleCreate(e){
    e.preventDefault();
    this.setState({error: ''});
    const {user} = this.props;
    const {image, caption} = this.state;
    const data = JSON.stringify({image, caption});
    console.log(user);
    fetch(`/api/users/${user.username}/post`,{
      method: 'POST',
      body: data,
      headers: new Headers({
        'Content-Type':'application/json',
        'Authorization':`Bearer ${user.token}`
      })
    }).then(res => res.json())
    .then(resp => {
      if (resp.message) return Promise.reject(resp);
      this.forceUpdate();
    }).catch(err => {
      this.setState({error: err.message});
    });
  }

  render(){
    const {image, caption, error, redirect} = this.state;

    const createPost =
      <form onSubmit={this.handleCreate}>
        <input
          type='text'
          name='image'
          placeholder='image'
          value={image}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='caption'
          placeholder='caption'
          value={caption}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <button type='submit'>Submit</button>
      </form>;
    return (
      <div>
        {createPost}
        {error}
      </div>
    );
  }
}
