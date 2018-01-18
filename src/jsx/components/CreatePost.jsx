import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class CreatePost extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: '',
      caption: '',
      error: '',
      redirect: false,
      user: {
        username: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
  handleCreate(e){
    e.preventDefault();
    const {image, caption, user} = this.state;
    const data = JSON.stringify({image, caption});
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
      this.setState({image: '', caption: '', error: '', redirect: true});
    }).catch(err => {
      this.setState({error: err.message});
    });
  }

  handleError(e){
    e.target.src = '/placeholder.png';
  }

  componentWillMount(){
    this.setState({user: JSON.parse(localStorage.user), redirect: false});
  }

  render(){
    const {image, caption, redirect, user} = this.state;
    let error = '';
    if (redirect) return <Redirect to={`/user/${user.username}`} />;
    if (this.state.error) {
      error = <p className='Error-message'>{this.state.error}</p>
    }

    const createPost =
      <form className='Form' onSubmit={this.handleCreate}>
        <input
          className='Form-input'
          type='text'
          name='image'
          placeholder='image'
          value={image}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <input
          className='Form-input'
          type='text'
          name='caption'
          placeholder='caption'
          value={caption}
          autoComplete='off'
          onChange={this.handleChange}
        />
        <div className='Form-buttons'>
          <button className='Form-btn' type='submit'>Submit</button>
        </div>
      </form>;

    const preview =
      <ul className='Preview'>
        <li className='Post'>
          <div className='Post-content'>
            <p className='Post-author'>{user.username}</p>
            <img src={image} onError={this.handleError}/>
            <p className='Post-text'>{caption}</p>
          </div>
        </li>
      </ul>
    return (
      <div>
        {preview}
        {error}
        {createPost}
      </div>
    );
  }
}
