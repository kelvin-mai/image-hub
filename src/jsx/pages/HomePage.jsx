import React, { Component } from 'react';
import Feed from '../components/Feed.jsx';

const HomePage = () => {
  let url = '/api/posts';
  let user = {};
  if (localStorage.user){
    user = JSON.parse(localStorage.user);
    url = `/api/users/${user.username}/feed`;
  }
  return (
    <div>
      <Feed url={url}/>
    </div>
  );
};

export default HomePage;
