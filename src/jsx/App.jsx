import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreatePost from './components/CreatePost.jsx';
import Nav from './components/Nav.jsx';
import HomePage from './pages/HomePage.jsx';
import UserPage from './pages/UserPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import PostPage from './pages/PostPage.jsx';
import AuthPage from './pages/AuthPage.jsx';

export default class App extends Component {
  constructor(){
    super();
  }
  
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className='container'>
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/user/:username' component={UserPage} />
              <Route path='/post/:pid' component={PostPage} />
              <Route path='/auth' component={AuthPage} />
              <Route path='*' component={ErrorPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
