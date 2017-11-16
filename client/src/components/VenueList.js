import React from 'react';
import { Button, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';

const VenueList = ({ isAuthenticated, venues, handleRsvpClick }) => (
  <ListGroup>
    {venues &&
      venues.map((venue, index) => {
        const {
          name,
          id,
          url,
          image_url,
          snippet_text,
          isAttending,
          numberAttending,
        } = venue;
        const address = venue.address.join(', ');

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
                  <strong style={{ lineHeight: '30px' }}>{address}</strong>
                  <br />
                  <span>{snippet_text}</span>
                  <br />
                </Col>
                <Col md={2} className="text-center">
                  <br />
                  {isAuthenticated ? (
                    isAttending ? (
                      <div>
                        <Button
                          bsStyle="success"
                          onClick={() => handleRsvpClick(id)}
                        >
                          You are going!
                        </Button>
                        <div>Click again to remove RSVP</div>
                      </div>
                    ) : (
                      <div>
                        <Button
                          bsStyle="primary"
                          onClick={() => handleRsvpClick(id)}
                        >
                          RSVP Here
                        </Button>
                        <br />
                      </div>
                    )
                  ) : (
                    <div>
                      <strong>Log in to RSVP</strong>
                      <br />
                    </div>
                  )}
                  <br />
                  <strong>{numberAttending} going tonight!</strong>
                </Col>
              </Row>
            </ListGroupItem>
            <div style={{ height: '20px' }} />
          </div>
        );
      })}
  </ListGroup>
);

export default VenueList;
