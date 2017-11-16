import React from 'react';
import { Match } from 'react-router';
import axios from 'axios';

import { githubLogin, logout } from './utils/oauth';

import NavigationBar from './components/NavigationBar';
import Intro from './components/Intro';
import Login from './components/Login';

const API = '/api';
const getProfile = () => axios.get(`${API}/profile`);
const getVenues = searchLocation =>
  axios.get(`${API}/venues?loc=${searchLocation}`);
const postRsvp = (venueId, date, isAttending) =>
  axios.post(`${API}/rsvp`, { venueId, date, isAttending });
const deleteRsvps = () => axios.delete(`${API}/rsvp`);

class App extends React.Component {
  state = {
    userId: '',
    username: '',
    displayName: '',
    avatar: '',
    searchLocation: '',
    venues: [],
  };

  getData = () => {
    return getProfile()
      .then(res => {
        const { userId, username, displayName, avatar } = res.data.github;
        const { searchLocation } = res.data;

        this.setState({
          userId,
          username,
          displayName,
          avatar,
          searchLocation,
        });

        if (searchLocation !== '') {
          return getVenues(searchLocation).then(res => {
            const venues = res.data;

            this.setState({ venues });
          });
        }
      })
      .catch(err => console.log('error:', err));
  };

  componentDidMount() {
    this.getData();
  }

  handleLogin = () => {
    return githubLogin()
      .then(this.getData)
      .catch(err => console.log('error:', err));
  };

  handleLogout = () => {
    return logout()
      .then(() => {
        this.setState({
          userId: '',
          username: '',
          displayName: '',
          avatar: '',
        });
      })
      .catch(err => console.log('error:', err));
  };

  handleLocationSubmit = searchLocation => {
    if (searchLocation !== '') {
      return getVenues(searchLocation).then(res => {
        const venues = res.data;

        this.setState({ searchLocation, venues });
      });
    }
  };

  handleRsvpClick = venueId => {
    const index = this.state.venues.findIndex(venue => venue.id === venueId);

    if (index !== -1) {
      let newVenues = JSON.parse(JSON.stringify(this.state.venues));
      const date = new Date().toString();

      if (newVenues[index].isAttending) {
        newVenues[index].isAttending = false;
        newVenues[index].numberAttending--;
      } else {
        newVenues[index].isAttending = true;
        newVenues[index].numberAttending++;
      }

      this.setState({ venues: newVenues });

      postRsvp(venueId, date, newVenues[index].isAttending);
    }
  };

  handleClearRsvps = () => {
    const newVenues = this.state.venues.map(venue => {
      if (venue.isAttending) {
        venue.numberAttending--;
      }
      venue.isAttending = false;
      return venue;
    });

    this.setState({ venues: newVenues });

    deleteRsvps();
  };

  render() {
    const { router } = this.props;
    const { displayName, avatar, venues, searchLocation } = this.state;

    const isAuthenticated = displayName !== '';

    return (
      <div className="App">
        <NavigationBar
          {...{ router, isAuthenticated, displayName, avatar }}
          handleLogout={this.handleLogout}
          handleClearRsvps={this.handleClearRsvps}
        />
        <div className="container">
          <Match
            exactly
            pattern="/"
            component={() => (
              <Intro
                {...{ isAuthenticated, venues, searchLocation }}
                handleLocationSubmit={this.handleLocationSubmit}
                handleRsvpClick={this.handleRsvpClick}
              />
            )}
          />
          <Match
            pattern="/login"
            component={props => (
              <Login
                {...props}
                {...{ isAuthenticated, router }}
                handleLogin={this.handleLogin}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
