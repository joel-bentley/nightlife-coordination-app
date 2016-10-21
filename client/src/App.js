import React from 'react'
import { Match } from 'react-router'

import { ajaxRequest } from './utils/ajax-request'

import NavigationBar from './components/NavigationBar'
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

  componentDidMount() {
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
        })
      })
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

    return (
      <div className="App">
        <NavigationBar {...{ displayName, avatar, router }}/>

        <div className="container">

          <Match exactly pattern="/" component={() => (
            <Home {...{ displayName, clicks }}
                  handleCountClick={this.handleCountClick}
                  handleResetClick={this.handleResetClick}/>
          )}/>
          <Match pattern="/profile" component={() => (
              <Profile  {...{ id, username, displayName, publicRepos }}/>
          )}/>

        </div>
      </div>
    )
  }
}

export default App
