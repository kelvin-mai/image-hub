import React, { Component } from 'react';
import Feed from '../components/Feed.jsx';

export default class UserPage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const {params} = this.props.match;
    return (
      <div>
        <Feed
          url={`/api/users/${params.username}/post`}
        />
      </div>
    );
  }
}
