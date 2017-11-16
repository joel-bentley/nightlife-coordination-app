import url from 'url';
import qs from 'querystring';
import moment from 'moment';
import cookie from 'react-cookie';

// Sign in with Github
export function githubLogin() {
  const githubConfig = {
    url: process.env.REACT_APP_URL + '/auth/github',
    clientId: process.env.REACT_APP_GITHUB_KEY,
    redirectUri: process.env.REACT_APP_URL + '/auth/github/callback',
    authorizationUrl: 'https://github.com/login/oauth/authorize',
    scope: 'user:email profile repo',
    width: 452,
    height: 633,
  };

  return oauth2(githubConfig)
    .then(openPopup)
    .then(pollPopup)
    .then(exchangeCodeForToken)
    .then(signIn)
    .then(closePopup);
}

function oauth2(config) {
  return new Promise((resolve, reject) => {
    const params = {
      client_id: config.clientId,
      redirect_uri: config.redirectUri,
      scope: config.scope,
      display: 'popup',
      response_type: 'code',
    };
    const url = config.authorizationUrl + '?' + qs.stringify(params);
    resolve({ url: url, config: config });
  });
}

function openPopup({ url, config }) {
  return new Promise((resolve, reject) => {
    const width = config.width || 500;
    const height = config.height || 500;
    const options = {
      width: width,
      height: height,
      top: window.screenY + (window.outerHeight - height) / 2.5,
      left: window.screenX + (window.outerWidth - width) / 2,
    };
    const popup = window.open(url, '_blank', qs.stringify(options, ','));

    resolve({ window: popup, config: config });
  });
}

function pollPopup({ window, config }) {
  return new Promise((resolve, reject) => {
    const redirectUri = url.parse(config.redirectUri);
    const redirectUriPath = redirectUri.host + redirectUri.pathname;

    const polling = setInterval(() => {
      if (!window || window.closed) {
        clearInterval(polling);
      }
      try {
        const popupUrlPath = window.location.host + window.location.pathname;
        if (popupUrlPath === redirectUriPath) {
          if (window.location.search || window.location.hash) {
            const query = qs.parse(
              window.location.search.substring(1).replace(/\/$/, '')
            );
            const hash = qs.parse(
              window.location.hash.substring(1).replace(/[\/$]/, '')
            );
            const params = Object.assign({}, query, hash);

            if (params.error) {
              console.log('OAUTH_FAILURE: ', params.error);
            } else {
              resolve({
                oauthData: params,
                config: config,
                window: window,
                interval: polling,
              });
            }
          } else {
            console.log(
              'OAUTH_FAILURE: ',
              'OAuth redirect has occurred but no query or hash parameters were found.'
            );
          }
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // A hack to get around same-origin security policy errors in Internet Explorer.
      }
    }, 500);
  });
}

function exchangeCodeForToken({ oauthData, config, window, interval }) {
  return new Promise((resolve, reject) => {
    const data = Object.assign({}, oauthData, config);

    return fetch(config.url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin', // By default, fetch won't send any cookies to the server
      body: JSON.stringify(data),
    }).then(response => {
      if (response.ok) {
        return response.json().then(json => {
          resolve({
            token: json.token,
            user: json.user,
            window: window,
            interval: interval,
          });
        });
      } else {
        return response.json().then(json => {
          console.log('OAUTH_FAILURE: ', Array.isArray(json) ? json : [json]);
          closePopup({ window: window, interval: interval });
        });
      }
    });
  });
}

function signIn({ token, user, window, interval }) {
  return new Promise((resolve, reject) => {
    console.log('OAUTH_SUCCESS');
    cookie.save('token', token, {
      expires: moment()
        .add(1, 'hour')
        .toDate(),
    });

    resolve({ window: window, interval: interval });
  });
}

function closePopup({ window, interval }) {
  return new Promise((resolve, reject) => {
    clearInterval(interval);
    window.close();
    resolve();
  });
}

export function logout() {
  return new Promise((resolve, reject) => {
    cookie.remove('token');
    console.log('LOGOUT_SUCCESS');
    resolve();
  });
}
