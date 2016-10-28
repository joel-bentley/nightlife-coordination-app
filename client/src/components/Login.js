import React from 'react'
import { Redirect } from 'react-router'
import { Button } from 'react-bootstrap'

import './Login.css'

const Login = (props) => {
    const { referrer } = props.location.state || '/'
    const { handleLogin, isAuthenticated, router } = props

    return (
      isAuthenticated ? (
        <Redirect to="/" />
      ) : (
        <div className="auth-buttons text-center">
          <Button bsStyle="primary" onClick={() => handleLogin('github', () => { router.transitionTo(referrer) })}>
          {/* <Button bsStyle="primary" onClick={() => (window.location.href = '/auth/github')}> */}
          {/* <Button bsStyle="primary" href='/auth/github'> */}
            <img src="/img/github_32px.png" className="auth-logo" role="presentation" /> Sign in with GitHub
          </Button>
        </div>
      )
    )
  }

export default Login
