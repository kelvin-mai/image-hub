import React, { Component } from 'react';
import Feed from '../components/Feed.jsx';

const HomePage = () => (
  <div>
    <Feed url={'/api/posts'}/>
  </div>
);

export default HomePage;
