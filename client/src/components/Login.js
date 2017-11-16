import React from 'react';
import { Redirect } from 'react-router';
import { Button } from 'react-bootstrap';

import './Login.css';

const Login = props => {
  const { referrer } = props.location.state || { referrer: '/' };
  const { handleLogin, isAuthenticated, router } = props;

  return isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <div className="auth-buttons text-center">
      <Button
        bsStyle="primary"
        onClick={() => handleLogin().then(() => router.transitionTo(referrer))}
      >
        <img
          src="/img/github_32px.png"
          className="auth-logo"
          role="presentation"
        />{' '}
        Sign in with GitHub
      </Button>
    </div>
  );
};

export default Login;
