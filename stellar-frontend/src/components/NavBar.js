import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, Col, Row, Container } from 'react-bootstrap'
const NavBar = (props) =>
  <Navbar scrolling dark fixed="top">
    <Container align='center'>
        <Col md={4}>
          <NavLink
            to="/"
            className="nav-button"
            exact
          >Home</NavLink>
        </Col>
        <Col md={4}>
          <NavLink
            to="/project"
            exact
            className="nav-button"
          >Project</NavLink>
        </Col>
        <Col md={4}>
          <NavLink
            to="/login"
            exact
            className="nav-button"
            onClick={props.logout}
          >Logout</NavLink>
        </Col>
    </Container>
  </Navbar>

export default NavBar
