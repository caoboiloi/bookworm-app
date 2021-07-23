import React from 'react';
import './style.scss';

import { connect } from 'react-redux';

import {Navbar, Nav} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { withRouter } from 'react-router';

import qs from 'query-string';

import { actResetDataFilterPage } from '../../actions/index';
import { getQueryVariable } from '../../utils/queryVariable';

const mapDispatchToProps = dispatch => {
    return {
        resetFilterPage: content => dispatch(actResetDataFilterPage(content))
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        search: state.search,
        cartAmount: state.cart.carts.length
    }
}

class Header extends React.Component {
    state = {
        pathname: this.props.location.pathname
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.location.pathname != this.state.pathname) {
            this.setState({
                pathname: nextProps.location.pathname
            })
        }
        return true;
    }

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
                        <Nav className="ml-auto" activeKey={this.state.pathname}>
                            <Nav.Link eventKey={'/'} as={Link} to="/">
                                Home
                            </Nav.Link>
                            <Nav.Link eventKey={'/product/filter'} as={Link} to="/product/filter?show=20&sort=sale" onClick={() => this.props.resetFilterPage()} replace>
                                Shop
                            </Nav.Link>
                            <Nav.Link eventKey={'/about'} as={Link} to="/about">
                                About
                            </Nav.Link>
                            <Nav.Link eventKey={'/cart'} as={Link} to="/cart">
                                Cart <b>(<span>{this.props.cartAmount}</span>)</b>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
