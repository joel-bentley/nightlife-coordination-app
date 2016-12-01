import React from 'react'
import { Jumbotron } from 'react-bootstrap'

import VenueList from './VenueList'

const Intro = ({ venues }) => (
  <div>
    <Jumbotron style={{ paddingTop: '5px', paddingBottom: '30px', backgroundColor: '#eee' }}>
      <h1>Nightlife Coordination App</h1>
      <h3>An app to see where people are planning to be tonight</h3>
    </Jumbotron>

    <div className="text-center">
      <h4>See the list of bars in your area below.</h4>
      <h4>Log in to RSVP to the bar of your choosing.</h4>
    </div>
    <br />
    <VenueList {...{venues}} />

  </div>
)

export default Intro
