import React, { Component } from 'react';
import Feed from '../components/Feed.jsx';
import User from '../components/User.jsx';

export default class UserPage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const {match} = this.props;
    return (
      <div>
        <User match={match}/>
        <Feed
          url={`/api/users/${match.params.username}/post`}
        />
      </div>
    );
  }
}
