import React, { Component } from 'react';

const Post = ({post}) => {
  return (
    <li>
      <img src={post.image} />
      <p>{post.caption}</p>
      {
        post.uid
        ? <p>{post.uid.username}</p>
        : ''
      }
    </li>
  );
}

export default Post;
