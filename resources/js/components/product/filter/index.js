import React from 'react';

import ProductFilterList from '../productFilter';

import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import "./style.scss";

import { Link } from 'react-router-dom';

import { withRouter } from 'react-router';

import qs from 'query-string';

import { connect } from 'react-redux';

import { actAddNewSortQueryParam } from '../../../actions/index';
import { getQueryVariable } from '../../../utils/queryVariable';

const mapDispatchToProps = dispatch => {
    return {
        pushSortFilter: content => dispatch(actAddNewSortQueryParam(content))
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        search: state.search
    }
}

class FilterProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort : this.props.search.sortQueryParam.sort,
            show: this.props.search.sortQueryParam.show,
            sortTitle: this.props.search.sortTitle,
            showTitle: this.props.search.showTitle,
            queryDefault: this.props.search.queryDefault
        }
    }

    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.search !== prevProps.location.search) {
            if (this.props.location.search == '?' + this.state.queryDefault) {
                this.setState({
                    sortTitle: this.props.search.sortTitle,
                    showTitle: this.props.search.showTitle
                })
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // Error, re-render the sidebar when start app to this routes and switch the other routes, this routes is re-rendered
        this.props.pushSortFilter({
            sort: {
                sort: nextState.sort,
                show: nextState.show
            },
            sortTitle: nextState.sortTitle,
            showTitle: nextState.showTitle
        })
        return true;
    }

    handleQuerySearch(query) {
        let queryParam = getQueryVariable(this.props);
        if (queryParam.page) {
            delete queryParam.page;
        }
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
                    Showing 1-20 of 126 of books
                </div>
                <div className="filter-dropdown-button">
                    <DropdownButton
                        as={ButtonGroup}
                        key='sortFilter'
                        id='dropdown-variants-sort'
                        variant='secondary'
                        title={this.state.sortTitle}
                        className="ml-4">
                        <Dropdown.Item eventKey="sale" as={Link} to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        sort: 'sale'
                                    }))
                                }} onClick={() => this.setState({
                                    sortTitle: `Sort by on sale`,
                                    sort: 'sale'
                                })} replace >
                                    Sort by on sale
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="popular" as={Link} to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        sort: 'popular'
                                    }))
                                }} onClick={() => this.setState({
                                    sortTitle: `Sort by popularity`,
                                    sort: 'popular'
                                })} replace >
                                    Sort by popularity
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="asc" as={Link} to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        sort: 'asc'
                                    }))
                                }} onClick={() => this.setState({
                                    sortTitle: `Sort by price: low to high`,
                                    sort: 'asc'
                                })} replace >
                                    Sort by price: low to high
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="desc" as={Link} to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        sort: 'desc'
                                    }))
                                }} onClick={() => this.setState({
                                    sortTitle: `Sort by price: high to low`,
                                    sort: 'desc'
                                })} replace >
                                    Sort by price: high to low
                        </Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        as={ButtonGroup}
                        key='showFilter '
                        id='dropdown-variants-show'
                        variant='secondary'
                        title= {this.state.showTitle}
                        className="ml-4">
                        <Dropdown.Item eventKey="20" as={Link} to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        show: 20
                                    }))
                                }} onClick={() => this.setState({
                                    showTitle: `Show 20`,
                                    show: 20
                                })} replace >
                                    Show 20
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="40" as={Link} to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        show: 40
                                    }))
                                }} onClick={() => this.setState({
                                    showTitle: `Show 40`,
                                    show: 40
                                })} replace >
                                    Show 40
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="60" as={Link} to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        show: 60
                                    }))
                                }} onClick={() => this.setState({
                                    showTitle: `Show 60`,
                                    show: 60
                                })} replace >
                                    Show 60
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="80" as={Link} to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        show: 80
                                    }))
                                }} onClick={() => this.setState({
                                    showTitle: `Show 80`,
                                    show: 80
                                })} replace >
                                    Show 80
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="100" as={Link} to={{
                                pathname: '/product/filter',
                                search: qs.stringify(this.handleQuerySearch({
                                        show: 100
                                    }))
                                }} onClick={() => this.setState({
                                    showTitle: `Show 100`,
                                    show: 100
                                })} replace >
                                    Show 100
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            <ProductFilterList />
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterProduct));
