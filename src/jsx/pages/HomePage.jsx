import React, { Component } from 'react';
import Feed from '../components/Feed.jsx';

export default class HomePage extends Component {
  render(){
    let url = '/api/posts';
    let user = {};
    let button = '';
    if (localStorage.user){
      user = JSON.parse(localStorage.user);
      url = `/api/users/${user.username}/feed`;
      button =
      <div className='Button-container'>
        <button
          className='Button Button_orange'
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
