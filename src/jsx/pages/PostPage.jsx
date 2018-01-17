import React, { Component } from 'react';
import Post from '../components/Post.jsx';

export default class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      post: undefined
    }
  }

  componentWillMount(){
    fetch(`api/posts/${this.props.match.params.pid}`)
      .then(res => {
        console.log(res.json());
        return res.json();
      })
      .then(posts => {
        this.setState({post});
        console.log(this.state.post)
      })
      .catch(err => this.setState({error: true}));
  }

  render() {
    const {params} = this.props.match;
    const {post} = this.state;
    return (
      <div>
        <h1>{params.pid}</h1>
        {/* <Post post={post} history={this.props.history}/> */}
      </div>
    );
  }
}
