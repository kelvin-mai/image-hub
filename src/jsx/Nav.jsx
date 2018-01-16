import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {

  render(){
    return (
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    );
  }
}
