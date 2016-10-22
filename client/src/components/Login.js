import React from 'react'
import { Button } from 'react-bootstrap'

import './Login.css'

const Login = ({ handleLogin, router }) => (
  <div className="auth-buttons text-center">
    <Button bsStyle="primary" onClick={() => handleLogin('github', () => { router.transitionTo('/') })}>
      <img src="/img/github_32px.png" className="auth-logo" role="presentation" /> Sign in with GitHub
    </Button>
  </div>
)

export default Login
