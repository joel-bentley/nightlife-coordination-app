import React from 'react'
import { Button } from 'react-bootstrap'

const Home = ({ displayName, clicks, handleCountClick, handleResetClick }) => (
  <div>
    <p>Welcome, {displayName}!</p>
    <p>You have clicked the button {clicks} times.</p>
    <Button bsStyle="success" onClick={handleCountClick}>Click Me!</Button>
    <Button bsStyle="danger" onClick={handleResetClick}>Reset</Button>
    <br/>
  </div>
)

export default Home
