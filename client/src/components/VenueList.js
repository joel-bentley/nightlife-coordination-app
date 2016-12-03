import React from 'react'
// import { Link } from 'react-router'
import { Button, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap'

// import './VenueList.css'


const VenueList = ({ isAuthenticated, venues, handleRsvpClick }) => (
  <ListGroup>
    {
      venues && venues.map((venue, index) => {
        const { name, id, url, image_url, snippet_text, isAttending, numberAttending } = venue
        const address = venue.address.join(', ')

        return (
          <div key={`venue-${index}`}>
            <ListGroupItem>
              <Row>
                <Col md={2} className="text-center">
                  <img src={image_url} role="presentation" />
                </Col>
                <Col md={8}>

                  <a href={url} target="_blank">
                    <span className="h3">{name}</span>
                  </a>
                  <br />
                  <strong style={{lineHeight: '30px'}}>{address}</strong>
                  <br />
                  <span>{snippet_text}</span>
                  <br />
                </Col>
                <Col md={2} className="text-center">
                  <br />
                  {
                    isAuthenticated ? (
                      isAttending ? (
                        <Button bsStyle="success"
                          onClick={()=>handleRsvpClick(id)}>You are going!</Button>
                      ) : (
                        <Button bsStyle="primary"
                          onClick={()=>handleRsvpClick(id)}>RSVP Here</Button>
                      )
                    ) : (
                      <strong>Log in to RSVP</strong>
                    )
                  }
                  <br />
                  <br />
                  <strong>{numberAttending} going tonight!</strong>
                </Col>
              </Row>
            </ListGroupItem>
            <div style={{ height: '20px' }}></div>
          </div>
        )
      })
    }
  </ListGroup>
)

export default VenueList
