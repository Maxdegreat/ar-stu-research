import React from 'react'
import {Nav, NavMenue, Bars, NavLink} from './navbarElements'

const Navbar = () => {
  return (
    <>
        <Nav>
            <NavLink to="/">
                <h1> Logo </h1>
            </NavLink>
            <Bars />
            <NavMenue>
                <NavLink to="/poses" activeStyle>
                    Poses
                </NavLink>
                <NavLink to="/about" activeStyle>
                    about
                </NavLink>
            </NavMenue>
            
        </Nav>
    </>
  )
}

export default Navbar