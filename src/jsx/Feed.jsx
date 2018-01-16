import React, { Component } from 'react';
import Post from './Post.jsx';

export default class Feed extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount(){
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => {
        console.log(posts)
        this.setState({posts})
      }).catch(err => console.log(err));
  }

  render(){
    const posts = this.state.posts.map((post, i) =>
          <Post key={i} post={post} />
        );
    return (
      <ul>{posts}</ul>
    )
  }
}
