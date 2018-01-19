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
      display =
        <ul className='Preview'>
         <li className='Post Post_details'>
           <div className='Post-content'>
             <p className='Post-author'>{post.uid.username}</p>
             <img src={post.image}/>
             <p className='Post-text'>{post.caption}</p>
           </div>
         </li>
       </ul>;
    }
    return (
      <div>
        {display}
      </div>
    );
  }
}

// const preview =
//   <ul className='Preview'>
//     <li className='Post Post_details'>
//       <div className='Post-content'>
//         <p className='Post-author'>{user.username}</p>
//         <img src={image} onError={this.handleError}/>
//         <p className='Post-text'>{caption}</p>
//       </div>
//     </li>
//   </ul>;
