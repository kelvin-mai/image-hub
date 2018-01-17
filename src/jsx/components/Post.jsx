import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const Post = ({post, history}) => {
  return (
    <li
      className='Post'
      onClick={() => history.push(`/post/${post._id}`)}>
      <div className='Post-content'>
        {
          post.uid
          ? <p>{post.uid.username}</p>
          : ''
        }
        <img src={post.image} />
        <p>{post.caption}</p>
      </div>
    </li>
  );
}

export default withRouter(Post);
