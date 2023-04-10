import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function CustomNavbar() {
    return (

            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">SDI Laboratory 5:</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Video Games</Nav.Link>
                            <Nav.Link href="/filter">Filter</Nav.Link>


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

    );
}
