import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ({user}) => (
  <div className='Navbar'>
    <div className='Navbar-container'>
      <NavLink to='/' activeStyle={{cursor: 'default'}}>
        <div className='Navbar-logo'>
          Image<span className='Navbar-logo-em'>Hub</span>
        </div>
      </NavLink>
      <div className='Navbar-search'>
        <input type='text'/>
      </div>
      <div className='Navbar-text'>
        <NavLink
          to='/'
          exact
          className='Navbar-link'
          activeClassName='Navbar-link_active'
        >Home</NavLink>
        {
          user
          ? <NavLink
              className='Navbar-link'
              activeClassName='Navbar-link_active'
              to={`/user/${user.username}`}
            >{user.username}</NavLink>
          : ''
        }
      </div>
    </div>
  </div>
);

export default Nav;
