import React from 'react';

import {Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class FilterProduct extends React.Component {
    render() {
        return (
        <div className="col-lg-10 col-md-9 col-sm-12 pr-0 product-show-list">
            <div className="mt-4 mb-3 filter-dropdown">
                <div>
                    Showing 1-12 of 126 of books
                </div>
                <div className="filter-dropdown-button">
                    <DropdownButton
                        as={ButtonGroup}
                        key='sortFilter'
                        id='dropdown-variants-sort'
                        variant='secondary'
                        title='Sort by on sale'
                        className="ml-4">
                        <Dropdown.Item eventKey="1">Sort by on sale</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Sort by popularity</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Sort by price: low to high</Dropdown.Item>
                        <Dropdown.Item eventKey="4">Sort by price: high to low</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        as={ButtonGroup}
                        key='showFilter '
                        id='dropdown-variants-show'
                        variant='secondary'
                        title='Show 20'
                        className="ml-4">
                        <Dropdown.Item eventKey="20">Show 20</Dropdown.Item>
                        <Dropdown.Item eventKey="40">Show 40</Dropdown.Item>
                        <Dropdown.Item eventKey="60">Show 60</Dropdown.Item>
                        <Dropdown.Item eventKey="80">Show 80</Dropdown.Item>
                        <Dropdown.Item eventKey="100">Show 100</Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
            <div className="mt-4 mb-3 product-show-list">
                <div className="row">
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book1.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book2.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book3.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book4.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book5.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book6.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book7.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book8.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book5.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book6.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book7.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                        <div className="card">
                            <img className="card-img-top" src="/assets/bookcover/book8.jpg" alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">Book title</h5>
                                <p className="card-text">
                                    Author name
                                </p>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted">Price</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4 mb-3 pagination">
                <nav aria-label=" Page navigation product">
                <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                        <Link to={{
                            pathname: "/courses",
                            search: "?sort=name",
                            hash: "#the-hash",
                            state: { fromDashboard: true }
                        }} className="page-link">Previous</Link>
                    </li>
                    <li className="page-item">
                        <Link to={{
                            pathname: "/courses",
                            search: "?sort=name",
                            hash: "#the-hash",
                            state: { fromDashboard: true }
                        }} className="page-link">1</Link>
                    </li>
                    <li className="page-item">
                        <Link to={{
                            pathname: "/courses",
                            search: "?sort=name",
                            hash: "#the-hash",
                            state: { fromDashboard: true }
                        }} className="page-link">2</Link>
                    </li>
                    <li className="page-item">
                        <Link to={{
                            pathname: "/courses",
                            search: "?sort=name",
                            hash: "#the-hash",
                            state: { fromDashboard: true }
                        }} className="page-link">3</Link>
                    </li>
                    <li className="page-item">
                        <Link to={{
                            pathname: "/courses",
                            search: "?sort=name",
                            hash: "#the-hash",
                            state: { fromDashboard: true }
                        }} className="page-link">Next</Link>
                    </li>
                </ul>
                </nav>
            </div>
        </div>
        )
    }
}

export default FilterProduct;
