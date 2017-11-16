import React from 'react';
import { Jumbotron } from 'react-bootstrap';

import VenueList from './VenueList';
import ControlledInput from './ControlledInput';

const Intro = ({
  isAuthenticated,
  venues,
  searchLocation,
  handleLocationSubmit,
  handleRsvpClick,
}) => (
  <div>
    <Jumbotron
      style={{
        paddingTop: '5px',
        paddingBottom: '30px',
        backgroundColor: '#eee',
      }}
    >
      <h1>Nightlife Coordination App</h1>
      <h3>An app to see where people are planning to be tonight</h3>
    </Jumbotron>
    <br />
    <div className="text-center">
      <h4>See the list of bars in your area below.</h4>
      <h4>Log in to RSVP to the bar of your choosing.</h4>
    </div>
    <br />
    <br />
    <ControlledInput
      placeholder="Please enter your location to search for venues around you"
      onSubmit={handleLocationSubmit}
      inputValue={searchLocation}
      buttonText="Search"
    />
    <br />
    <br />
    <VenueList {...{ isAuthenticated, venues, handleRsvpClick }} />
  </div>
);

export default Intro;
