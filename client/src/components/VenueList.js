import React from 'react'
// import { Link } from 'react-router'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'

// import './VenueList.css'


const VenueList = ({ venues }) => (
  <ListGroup>
    {
      venues && venues.map((venue, index) => {
        const { name, url, image_url, snippet_text, attending } = venue

        return (
          <div key={`venue-${index}`}>
            <ListGroupItem>
              <span style={{float: 'right'}}>
                <Button bsStyle="primary">RSVP Here</Button>
                <br />
                <br />
                {attending.length} going tonight!
              </span>
              <span>
                <img src={image_url} role="presentation" />
              </span>
              <a href={url} target="_blank">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="h3">{name}</span>
              </a>
              <br />
              <br />
              <span>{snippet_text}</span>
              <br />
            </ListGroupItem>
          </div>
        )
      })
    }
  </ListGroup>
)

export default VenueList
