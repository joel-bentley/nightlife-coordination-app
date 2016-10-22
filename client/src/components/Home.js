import React from 'react'
import { Button, Jumbotron } from 'react-bootstrap'

const Home = ({ displayName, clicks, handleCountClick, handleResetClick }) => (
  <div>
    <Jumbotron>
      <h3>Welcome, {displayName}!</h3>
      <h4>You have clicked the button {clicks} times.</h4><br/>
      <Button bsStyle="success" onClick={handleCountClick}>Click Me!</Button>
      {' '}
      <Button bsStyle="danger" onClick={handleResetClick}>Reset</Button>
    </Jumbotron>
  </div>
)

export default Home
