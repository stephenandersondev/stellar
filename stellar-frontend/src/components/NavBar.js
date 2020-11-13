import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) =>
  <div>
        <NavLink
        to="/"
        exact
        >Home</NavLink>
        <NavLink
        to="/project"
        exact
        >Project</NavLink>
        <NavLink
        to="/login"
        exact
        onClick={props.logout}
        >Logout</NavLink>
  </div>;

export default Navbar
