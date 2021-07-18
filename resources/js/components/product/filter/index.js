import React from 'react';

import {Dropdown, DropdownButton, ButtonGroup} from 'react-bootstrap';
import "./style.scss";

import { Link } from 'react-router-dom';

import { withRouter } from 'react-router';

import qs from 'query-string';

import { connect } from 'react-redux';

import { actAddNewQuerySearch } from '../../../actions/index';

const mapDispatchToProps = dispatch => {
    return {
        pushQuery: content => dispatch(actAddNewQuerySearch(content))
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        query: state.query
    }
}

class FilterProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort : {
                title: 'Sort by on sale',
                code: 'sale'
            },
            show : {
                title: 'Show 20',
                code: 20
            },
            query: ''
        }
    }

    componentDidMount() {
        this.getQueryVariable();
    }

    getQueryVariable() {
        let params = qs.parse(this.props.location.search);
        return params;
    }

    handleSelectSort(event) {
        var sort = null;
        switch (event) {
            case 'popular':
                sort = {
                    title: 'Sort by popularity',
                    code: 'popular'
                }
                break;
            case 'asc':
                sort = {
                    title: 'Sort by price: low to high',
                    code: 'asc'
                }
                break;
            case 'desc':
                sort = {
                    title: 'Sort by price: high to low',
                    code: 'desc'
                }
                break;
            default:
                sort = {
                    title: 'Sort by on sale',
                    code: 'sale'
                }
        }
        this.setState({
            sort: sort,
            query: this.props.query
        })
        this.props.pushQuery({sort: this.state.sort.code});
    }
    handleSelectShow(event) {
        var show = 20;
        switch (event) {
            case '100':
                show = {
                    title: 'Show 100',
                    code: 100
                }
                break;
            case '80':
                show = {
                    title: 'Show 80',
                    code: 100
                }
                break;
            case '60':
                show = {
                    title: 'Show 60',
                    code: 100
                }
                break;
            case '40':
                show = {
                    title: 'Show 40',
                    code: 100
                }
                break;
            default:
                show = {
                    title: 'Show 20',
                    code: 100
                }
        }
        this.setState({
            show: show
        })
        this.props.pushQuery({show: this.state.show.code});
    }

    handleQuerySearch(query) {
        const queryParam = this.getQueryVariable();
        const newQueryParam = {
           ...queryParam,
           ...query
        }
        return newQueryParam;
    }

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
                        title={this.state.sort.title}
                        className="ml-4"
                        onSelect={this.handleSelectSort.bind(this)}>
                        <Dropdown.Item eventKey="sale">
                            <Link to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        sort: 'sale'
                                    }))
                                }}>
                                    <button type="button" className="btn btn-secondary btn-view-all">
                                    View All <i className="fa fa-caret-right"></i>
                                    </button>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="popular">
                            Sort by popularity
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="asc">
                            Sort by price: low to high
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="desc">
                            Sort by price: high to low
                        </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        as={ButtonGroup}
                        key='showFilter '
                        id='dropdown-variants-show'
                        variant='secondary'
                        title= {this.state.show.title}
                        className="ml-4"
                        onSelect={this.handleSelectShow.bind(this)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterProduct));
