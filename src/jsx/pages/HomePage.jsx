import React, { Component } from 'react';
import Feed from '../components/Feed.jsx';

const HomePage = () => {
  let url = '/api/posts';
  return (
    <div>
      <Feed url={url}/>
    </div>
  );
};

export default HomePage;
