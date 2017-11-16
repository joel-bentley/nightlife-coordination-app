import React from 'react';
import { Link } from 'react-router';
import {
  Glyphicon,
  Navbar,
  NavDropdown,
  MenuItem,
  Nav,
  NavItem,
} from 'react-bootstrap';

class NavigationBar extends React.Component {
  state = { expanded: false };

  toggle = () => {
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  close = () => {
    this.setState({ expanded: false });
  };

  render() {
    const {
      router,
      isAuthenticated,
      displayName,
      avatar,
      handleClearRsvps,
      handleLogout,
    } = this.props;
    return (
      <Navbar
        fixedTop
        onToggle={this.toggle}
        expanded={this.state.expanded}
        collapseOnSelect
      >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">
              <Glyphicon glyph="glass" aria-hidden="true" />
              Nightlife Coordination App
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {}
          <Nav pullRight>
            {isAuthenticated ? (
              [
                <NavItem
                  onClick={handleClearRsvps}
                  onSelect={this.close}
                  eventKey={1}
                  key={1}
                >
                  Clear My RSVPs
                </NavItem>,
                <NavDropdown
                  title={
                    <span>
                      <img src={avatar} role="presentation" />
                      {displayName}
                    </span>
                  }
                  eventKey={3}
                  key={2}
                  id="basic-nav-dropdown"
                >
                  <MenuItem
                    onSelect={() => {
                      handleLogout().then(() => {
                        router.transitionTo('/');
                      });
                    }}
                    eventKey={3.2}
                  >
                    {' '}
                    Logout{' '}
                  </MenuItem>
                </NavDropdown>,
              ]
            ) : (
              <Link to="/login">
                {({ href, onClick }) => (
                  <NavItem
                    href={href}
                    onClick={onClick}
                    onSelect={this.close}
                    eventKey={3}
                  >
                    Login
                  </NavItem>
                )}
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
