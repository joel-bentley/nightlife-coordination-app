import React from 'react'
import { Link } from 'react-router'
import { Glyphicon, Navbar, NavDropdown, MenuItem, Nav, NavItem } from 'react-bootstrap'

const NavigationBar = ({ router, isAuthenticated, displayName, avatar, handleClearRsvps, handleLogout }) => {

  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <Glyphicon glyph="glass" aria-hidden="true" />
            Nightlife Coordination App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        {/* <Nav pullRight>
          <Link to="/">{({ href, onClick }) => (
              <NavItem href={href} onClick={onClick} > Home </NavItem>
            )
          }</Link>
        </Nav> */}

        <Nav pullRight>
          {isAuthenticated ? (
            [
              <NavItem onClick={handleClearRsvps} eventKey={1} key={1}>Clear My RSVPs</NavItem>,
              <NavDropdown title={<span><img src={avatar} role="presentation" />{displayName}</span>} eventKey={3} key={2} id="basic-nav-dropdown">
                <MenuItem onSelect={() => { handleLogout().then( () => { router.transitionTo('/') }) }} eventKey={3.2}> Logout </MenuItem>
              </NavDropdown>
            ]
          ) : (
            <Link to="/login">{({ href, onClick }) => (
                <NavItem href={href} onClick={onClick} eventKey={3}> Login </NavItem>
              )
            }</Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
