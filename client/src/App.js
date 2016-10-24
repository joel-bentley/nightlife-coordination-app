import React from 'react'
import { Match } from 'react-router'
import MatchWhenAuthorized from './components/MatchWhenAuthorized'

import { ajaxRequest } from './utils/ajax-request'

import NavigationBar from './components/NavigationBar'
import Intro from './components/Intro'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'

import './App.css'

const API = '/api'

class App extends React.Component {
  state = {
      id: '',
      username: '',
      displayName: '',
      publicRepos: '',
      avatar: '',
      clicks: 0
    }

  handleLogin = (method, callback) => {
    ajaxRequest('GET', `/auth/${method}`, () => {
      ajaxRequest('GET', `${API}/profile`, (profileData) => {
        ajaxRequest('GET', `${API}/clicks`, (clickData) => {
          const { id, username, displayName, publicRepos, avatar } = JSON.parse(profileData)
          const { clicks } = JSON.parse(clickData)
          this.setState({
            id,
            username,
            displayName,
            publicRepos,
            avatar,
            clicks
          }, callback)
        })
      })
    })
  }
  handleLogout = (callback) => {
    ajaxRequest('GET', '/logout', () => {
      this.setState({
        id: '',
        username: '',
        displayName: '',
        publicRepos: '',
        avatar: '',
        clicks: 0
      }, callback)
    })
  }
  handleCountClick = () => {
    ajaxRequest('POST', `${API}/clicks`, () => {
       ajaxRequest('GET', `${API}/clicks`, (clickData) => {
         this.setState({
           clicks: JSON.parse(clickData).clicks
         })
       })
    })
  }
  handleResetClick = () => {
    ajaxRequest('DELETE', `${API}/clicks`, () => {
       ajaxRequest('GET', `${API}/clicks`, (clickData) => {
         this.setState({
           clicks: JSON.parse(clickData).clicks
         })
       })
    })
  }
  render() {
    const { router } = this.props
    const { id, username, displayName, publicRepos, avatar, clicks } = this.state

    const isAuthenticated = displayName !== ''

    return (
      <div className="App">
        <NavigationBar {...{ router, isAuthenticated, displayName, avatar }} handleLogout={this.handleLogout}/>

        <div className="container">

          <Match exactly pattern="/" component={() => (
            isAuthenticated ? (
              <Home {...{ displayName, clicks }}
                    handleCountClick={this.handleCountClick}
                    handleResetClick={this.handleResetClick}/>
            ) : (
              <Intro />
            )
          )}/>

          <MatchWhenAuthorized pattern="/profile" isAuthenticated={isAuthenticated} component={() => (
            <Profile  {...{ id, username, displayName, publicRepos }}/>
          )}/>

          <Match pattern="/login" component={(props) => (
            <Login {...props} {...{ router }} handleLogin={this.handleLogin}/>
          )}/>

        </div>
      </div>
    )
  }
}

export default App
