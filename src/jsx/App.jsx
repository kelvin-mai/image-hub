import React, { Component } from 'react';
import Loading from './Loading.jsx';
import Post from './Post.jsx';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      loading: true,
      posts: []
    }
  }

  componentDidMount(){
    fetch('/api/posts')
      .then(res => res.json())
      .then(posts => {
        console.log(posts)
        this.setState({loading: false, posts})
      }).catch(err => console.log(err));
  }

  render() {

    const post = this.state.posts.map((post, i) =>
          <Post key={i} post={post} />
        );

    return (
      <div>
        {this.state.loading ? <Loading /> : ''}
        {post}
      </div>
    );
  }
}
