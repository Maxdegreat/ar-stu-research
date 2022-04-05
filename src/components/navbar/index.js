import React from 'react'
import {Nav, NavBtnLink, NavMenue, NavBtn, Bars, NavLink} from './navbarElements'

const Navbar = () => {
  return (
    <>
        <Nav>
            <NavLink to="/">
                <h1> PVAMU Computer Vision </h1>
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