import React, { Component } from 'react';
import Post from './Post.jsx';

export default class Feed extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
  }

  componentWillMount(){
    fetch(this.props.url)
      .then(res => res.json())
      .then(posts => {
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
