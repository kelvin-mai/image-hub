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
          ? <p className='Post-author'>{post.uid.username}</p>
          : ''
        }
        <img src={post.image} />
      </div>
    </li>
  );
}

export default withRouter(Post);
