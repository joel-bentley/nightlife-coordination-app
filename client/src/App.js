import React from 'react'
import { Match } from 'react-router'
import MatchWhenAuthorized from './components/MatchWhenAuthorized'
import axios from 'axios'

import { githubLogin, logout } from './utils/oauth';

import NavigationBar from './components/NavigationBar'
import Intro from './components/Intro'
import Login from './components/Login'
import Home from './components/Home'
import Profile from './components/Profile'

import './App.css'

const API = '/api'
const getProfile = () => axios.get(`${API}/profile`)
const getClicks = () => axios.get(`${API}/clicks`)
const addClicks = () => axios.post(`${API}/clicks`)
const resetClicks = () => axios.delete(`${API}/clicks`)

class App extends React.Component {
  state = {
      id: '',
      username: '',
      displayName: '',
      publicRepos: '',
      avatar: '',
      clicks: 0
  }

  getData = () => {
    return axios.all([ getProfile(), getClicks() ])
      .then(res => {
        const { id, username, displayName, publicRepos, avatar } = res[0].data
        const { clicks } = res[1].data
        this.setState({ id, username, displayName, publicRepos, avatar, clicks })
      })
  }

  handleLogin = () => {
    return githubLogin()
      .then( this.getData )
      .catch(err => console.log('error:', err))
  }

  handleLogout = () => {
    return logout()
      .then( () => {
        this.setState({
          id: '',
          username: '',
          displayName: '',
          publicRepos: '',
          avatar: '',
          clicks: 0
        })
      }).catch(err => console.log('error:', err))
  }

  handleCountClick = () => {
    addClicks()
      .then(getClicks)
      .then( res => {
        const { clicks } = res.data
        this.setState({ clicks })
      }).catch(err => console.log('error:', err))
  }

  handleResetClick = () => {
    resetClicks()
      .then(getClicks)
      .then( res => {
        const { clicks } = res.data
        this.setState({ clicks })
      }).catch(err => console.log('error:', err))
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
            <Login {...props} {...{ isAuthenticated, router }} handleLogin={this.handleLogin}/>
          )}/>

        </div>
      </div>
    )
  }
}

export default App
