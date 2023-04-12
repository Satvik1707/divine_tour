import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Navbar, Container, Nav, Offcanvas, Image} from 'react-bootstrap';
// load auth file
import { useAuth } from '../context/AuthContext';

// images
import logo from '../assets/img/logo.png';

export default function Header() {

  // state
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [isMobile] = useState(window.innerWidth < 992);

  let location = useLocation();

  // hook
  useEffect(() => {
    // goto top when route change
    window.scrollTo(0, 0);
  }, [location]);

  // hide offCanvas on click link
  const toggleOffCanvas = () => {
    setShowOffCanvas( (showOffCanvas) => !showOffCanvas );
  }


  // define context variable which i need
  const { currentUser, logout } = useAuth();

  return (
    <header className="white-variant">
      <Navbar expand="lg" variant="dark">
        <Container>
          <Link to="" className='navbar-brand'>
            <Image src={logo} className='logo' />
          </Link>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" onClick={toggleOffCanvas} />
          <Navbar.Offcanvas id="offcanvasNavbar-expand-lg" placement="end"
            show={ isMobile ? showOffCanvas : '' } onHide={toggleOffCanvas}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
              Divine Tour and Travels
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="ms-auto">
                {
                  currentUser ? (
                    <>
                      <span className='nav-link' onClick={toggleOffCanvas}>Hello, { currentUser && currentUser.displayName }</span>
                      <Link to="/login" className='nav-link' onClick={() => { toggleOffCanvas(); logout(); }}>Logout</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard" className='nav-link' onClick={toggleOffCanvas}>Dashboard</Link>
                      <Link to="/login" className='nav-link' onClick={toggleOffCanvas}>Login</Link>
                      {/* <Link to="/signup" className='nav-link' onClick={toggleOffCanvas}>Signup</Link> */}
                    </>
                  )
                }
                <a href="https://divine-website.netlify.app" className='nav-link' target="_blank" rel='noreferrer' onClick={toggleOffCanvas}>Goto Site</a>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </header>
  )
}
