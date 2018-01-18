import React, { Component } from 'react';
import Feed from '../components/Feed.jsx';
import CreatePost from '../components/CreatePost.jsx';

export default class HomePage extends Component {
  render(){
    let url = '/api/posts';
    let user = {};
    let button = '';
    if (localStorage.user){
      user = JSON.parse(localStorage.user);
      url = `/api/users/${user.username}/feed`;
      button =
      <div className='Form-buttons'>
        <button
          className='Form-btn'
          onClick={() => this.props.history.push(`/user/${user.username}/post`)}>
          Make Post
        </button>
      </div>;
    }
    return (
      <div>
        {button}
        <Feed url={url}/>
      </div>
    );
  };
}
