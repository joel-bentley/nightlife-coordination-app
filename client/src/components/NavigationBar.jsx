import React from 'react'
import { Link } from 'react-router'
import { Glyphicon, Navbar, Nav, NavItem } from 'react-bootstrap'

const NavigationBar = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Glyphicon glyph="fire"/>
        FCC Starter Boilerplate
      </Navbar.Brand>
      <Navbar.Toggle/>
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <Link to="/">{({ href, onClick }) => <NavItem href={href} onClick={onClick}>
            <Glyphicon glyph="home"/>
            Home
          </NavItem>
        }</Link>
        <Link to="/profile">{({ href, onClick }) => <NavItem href={href} onClick={onClick}>
            <Glyphicon glyph="user"/>
            Profile
          </NavItem>
        }</Link>
        <NavItem href="/logout">
          <Glyphicon glyph="log-out"/>
          Logout
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default NavigationBar
