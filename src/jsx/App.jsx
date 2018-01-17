import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth.jsx';
import CreatePost from './components/CreatePost.jsx';
import Nav from './components/Nav.jsx';
import HomePage from './pages/HomePage.jsx';
import UserPage from './pages/UserPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import PostPage from './pages/PostPage.jsx';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      authenticated: false,
      user: undefined,
      toggle: true
    }
    this.handleAuth = this.handleAuth.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleAuth(){
    if (localStorage.user) {
      const user = JSON.parse(localStorage.user);
      this.setState({authenticated: true, user});
    } else {
      this.setState({authenticated: false, user: null});
    }
  }
  handleToggle(){
    this.setState({toggle: !toggle});
  }
  componentWillMount(){
    this.handleAuth();
  }

  render() {
    return (
      <Router>
        <div>
          <Nav
            user={this.state.user}
            onToggle={this.handleToggle}
          />
          <div className='container'>
            <Auth
              authenticated={this.state.authenticated}
              onAuth={this.handleAuth}
            />
            {this.state.authenticated
              ? <CreatePost
                  authenticated={this.state.authenticated}
                  user={this.state.user}
                />
              : ''}
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/user/:username' component={UserPage} />
              <Route path='/post/:pid' component={PostPage} />
              <Route path='*' component={ErrorPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
