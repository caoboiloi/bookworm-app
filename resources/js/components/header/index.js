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
        search: state.search
    }
}

class Header extends React.Component {

    componentDidMount() {

    }

    handleQuerySearch(query) {
        const queryParam = getQueryVariable(this.props);
        const newQueryParam = {
           ...queryParam,
           ...query
        }
        return newQueryParam;
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
                        <Nav className="ml-auto">
                            <Nav.Link eventKey={1} href="#/">
                                Home
                            </Nav.Link>
                            <Nav.Link eventKey={2} as={Link} to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        sort: 'sale',
                                        show: 20
                                    }))
                                }} onClick={() => this.props.resetFilterPage()} replace>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
