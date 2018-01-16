import React, { Component } from 'react';

const Post = ({post}) => {
  return (
    <li className='Post'>
      <div className='Post-content'>
        <img src={post.image} />
        <p>{post.caption}</p>
        {
          post.uid
          ? <p>{post.uid.username}</p>
          : ''
        }
      </div>
    </li>
  );
}

export default Post;
