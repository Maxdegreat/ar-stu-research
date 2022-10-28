import React from 'react' 
import {Nav, NavBtnLink, NavMenue, NavBtn, Bars, NavLink} from './navbarElements'

const Navbar = () => {
  return (
    <>
        <Nav>
            <NavLink to="/ar-stu-research">
                <h1> PVAMU Computer Vision </h1>
            </NavLink>
        </Nav>
    </>
  )
}

export default Navbar