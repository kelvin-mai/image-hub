import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import HomePage from './pages/HomePage.jsx';
import UserPage from './pages/UserPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import PostPage from './pages/PostPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import EditPage from './pages/EditPage.jsx';

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
              <Route exact path='/' component={HomePage} />
              <Route exact path='/user/:username/post' component={EditPage} />
              <Route exact path='/user/:username' component={UserPage} />
              <Route exact path='/post/:pid' component={PostPage} />
              <Route exact path='/auth' component={AuthPage} />
              <Route path='*' component={ErrorPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
