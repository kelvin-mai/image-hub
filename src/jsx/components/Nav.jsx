import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({user}) => (
  <div>
    <NavLink to="/">Home</NavLink>
    {
      user
      ? <NavLink
        to={`/${user.username}`}
        >Profile</NavLink>
      : ''
    }
  </div>
);

export default Nav;
