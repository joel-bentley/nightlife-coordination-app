import React from 'react'
// import { Link } from 'react-router'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

// import './VenueList.css'


const VenueList = ({ venues }) => (
  <ListGroup>
    {
      venues && venues.map((venue, index) => {
        return (
          <div key={`venue-${index}`}>
            <ListGroupItem header={venue.name}>

            </ListGroupItem>
          </div>
        )
      })
    }
  </ListGroup>
)

export default VenueList
