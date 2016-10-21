import React from 'react'
import { Link } from 'react-router'
import { Glyphicon, Navbar, NavDropdown, MenuItem, Nav, NavItem } from 'react-bootstrap'

const NavigationBar = ({ displayName, avatar }) => {

  const isAuthenticated = displayName !== ''
  return (
    <Navbar fixedTop>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <Glyphicon glyph="fire"/>
            FCC Starter Boilerplate
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <Link to="/">{({ href, onClick }) => (
              <NavItem href={href} onClick={onClick} eventKey={1}> Home </NavItem>
            )
          }</Link>
        </Nav>

        <Nav pullRight>

          {isAuthenticated ? (
              <NavDropdown title={<span><img src={avatar} role="presentation"/>{displayName}</span>} eventKey={3} id="basic-nav-dropdown">

                <Link to="/profile">{({ href, onClick }) => (
                    <MenuItem href={href} onSelect={onClick} eventKey={3.1}> Profile </MenuItem>
                  )
                }</Link>
                <Link to="/logout">{({ href, onClick }) => (
                    <MenuItem href={href} onSelect={onClick} eventKey={3.2}> Logout </MenuItem>
                  )
                }</Link>
              </NavDropdown>
          ) : (
            <Link to="/login">{({ href, onClick }) => (
                <NavItem href={href} onClick={onClick} eventKey={3}>
                  Login
                </NavItem>
              )
            }</Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
