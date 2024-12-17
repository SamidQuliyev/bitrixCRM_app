import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';  // CSS faylını import et

function MyNavbar() {
  const location = useLocation();  // Hal-hazırda hansı səhifədə olduğunu tapırıq

  return (
    <Navbar style={{ backgroundColor: '#007bff' }} expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <img 
            src= "/assets/butagrupaz_logo.png"
            alt="BitrixApp Logo" 
            style={{ width: '40px', height: '40px', marginRight: '10px' }} 
          />
          BitrixApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}  // Aktiv səhifəni yoxlayırıq
            >
              Ana Səhifə
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/lead-list" 
              className={location.pathname === '/lead-list' ? 'nav-link active' : 'nav-link'}  // Aktiv səhifəni yoxlayırıq
            >
              Lead List
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
