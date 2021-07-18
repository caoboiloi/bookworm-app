import React from 'react';
import './style.scss';

import {Navbar, Nav} from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return (
            <header className="my-0">
                <Navbar collapseOnSelect expand="md" bg="light">
                    <Navbar.Brand href="#/">
                        <img src="/assets/bookworm_icon.svg" width="32" height="32" className="d-inline-block align-top my-auto" />
                        <b className="ml-2">BOOKWORM</b>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link eventKey={1} href="#/">
                                Home
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="#/product">
                                Shop
                            </Nav.Link>
                            <Nav.Link eventKey={3} href="#/about">
                                About
                            </Nav.Link>
                            <Nav.Link eventKey={4} href="#/cart">
                                Cart (<span>0</span>)
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

export default Header;
