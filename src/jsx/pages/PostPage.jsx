import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Post from '../components/Post.jsx';

export default class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      error: false,
      post: undefined
    }
  }

  componentWillMount(){
    fetch(`/api/posts/${this.props.match.params.pid}`)
      .then(res => res.json())
      .then(post => this.setState({post}))
      .catch(err => this.setState({error: true}));
  }

  render() {
    const {params} = this.props.match;
    const {post} = this.state;
    let display = '';
    if (this.state.error) return <Redirect to='/error' />
    if (post){
      display = <img src={post.image} />;
    }
    return (
      <div>
        {display}
      </div>
    );
  }
}
