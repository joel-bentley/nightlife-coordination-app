import React from 'react'
import { Match } from 'react-router'
//import MatchWhenAuthorized from './components/MatchWhenAuthorized'
import axios from 'axios'

import { githubLogin, logout } from './utils/oauth';

import NavigationBar from './components/NavigationBar'
import Intro from './components/Intro'
import Login from './components/Login'

import './App.css'

const API = '/api'
const getProfile = () => axios.get(`${API}/profile`)
const getVenues = () => axios.get(`${API}/venues`)


class App extends React.Component {
  state = {
      userId: '',
      username: '',
      displayName: '',
      avatar: '',
      venues: []
  }

  getData = () => {
    return axios.all([ getProfile(), getVenues() ])
      .then(res => {
        const { userId, username, displayName, avatar } = res[0].data
        const venues = res[1].data

        console.dir(venues)

        this.setState({ userId, username, displayName, avatar, venues })
      })
      .catch(err => console.log('error:', err))
  }

  componentDidMount() {
    this.getData()
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
          userId: '',
          username: '',
          displayName: '',
          avatar: '',
        })
      }).catch(err => console.log('error:', err))
  }


  render() {
    const { router } = this.props
    const { displayName, avatar, venues } = this.state

    const isAuthenticated = displayName !== ''

    return (
      <div className="App">
        <NavigationBar {...{ router, isAuthenticated, displayName, avatar }} handleLogout={this.handleLogout}/>

        <div className="container">

          <Match exactly pattern="/" component={() => (
              <Intro {...{venues}} />
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
