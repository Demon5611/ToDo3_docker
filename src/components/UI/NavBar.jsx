import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function AppNavBar({ user }) {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/account">Hello, {user ? user.name : 'guest (only autorization user can do)'}</Navbar.Brand>
        <Nav className="me-auto flex-grow-0">
          <Nav.Link href="/">Main</Nav.Link>
        </Nav>
        <Nav className="me-auto flex-grow-0">
          {user ? (
            <>              
              <Nav.Link href="/account">Account</Nav.Link>
              <Nav.Link
                href="/logout"
                onClick={(e) => {
                  e.preventDefault();
                  axios('/api/auth/logout')
                    .then(() => (window.location.href = '/login'))
                    .catch(console.log);
                }}
              >
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/login">Sign in</Nav.Link>
              <Nav.Link href="/logout">Log Out</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
