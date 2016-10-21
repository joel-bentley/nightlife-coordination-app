import React from 'react'
import { Button, Jumbotron, Row, Col } from 'react-bootstrap'

const Home = ({ displayName, clicks, handleCountClick, handleResetClick }) => (
  <div>
    <Jumbotron>
      <h3>Welcome, {displayName}!</h3>
      <h4>You have clicked the button {clicks} times.</h4><br/>
      <Button bsStyle="success" onClick={handleCountClick}>Click Me!</Button>
      {' '}
      <Button bsStyle="danger" onClick={handleResetClick}>Reset</Button>
    </Jumbotron>
    
    <Row>
      <Col sm={6}>
        <h2>Heading</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
        <p><Button href="#">View details »</Button></p>
      </Col>
      <Col sm={6}>
        <h2>Heading</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
        <p><Button href="#">View details »</Button></p>
      </Col>
      <Col sm={6}>
        <h2>Heading</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
        <p><Button href="#">View details »</Button></p>
      </Col>
      <Col sm={6}>
        <h2>Heading</h2>
        <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>
        <p><Button href="#">View details »</Button></p>
      </Col>
    </Row>
  </div>
)

export default Home
