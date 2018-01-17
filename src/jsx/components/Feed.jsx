import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Post from './Post.jsx';

export default class Feed extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      error: false
    }
  }

  componentWillMount(){
    fetch(this.props.url)
      .then(res => {
        if (res.status > 400) return Promise.reject(res);
        return res.json()
      })
      .then(posts => {
        this.setState({posts})
      }).catch(err => this.setState({error: true}));
  }

  render(){
    if (this.state.error) return <Redirect to='/error' />
    const posts = this.state.posts.length > 0
      ? this.state.posts.map((post, i) =>
          <Post key={i} post={post} history={history}/>
        )
      : '';
    return (
      <ul className='Feed'>{posts}</ul>
    )
  }
}
