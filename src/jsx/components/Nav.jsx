import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  let user = undefined;
  if (localStorage.user){
    user = JSON.parse(localStorage.user);
  }

  return (
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
        <NavLink
          className='Navbar-link'
          activeClassName='Navbar-link_active'
          to={'/auth'}
        >{user ? 'Logout' : 'Login'}</NavLink>
      </div>
    </div>
  </div>
);}

export default Nav;
