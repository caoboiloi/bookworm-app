import React from 'react';

import { Dropdown, DropdownButton, ButtonGroup, ResponsiveEmbed } from 'react-bootstrap';
import "./style.scss";

import BookCardRow from './../../book';

import { getBookFilter } from './../../../utils/httpHelper';

import { chunk, isUndefined } from 'lodash';

import { Link } from 'react-router-dom';

import { withRouter } from 'react-router';

import qs from 'query-string';

import { connect } from 'react-redux';

import { actAddNewSortQueryParam, actResetDataFilterPage } from '../../../actions/index';
import { getQueryVariable } from '../../../utils/queryVariable';

const mapDispatchToProps = dispatch => {
    return {
        pushSortFilter: content => dispatch(actAddNewSortQueryParam(content)),
        resetFilterPage: () => dispatch(actResetDataFilterPage())
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
            books : [],
            sortTitle: this.props.search.sortTitle,
            showTitle: this.props.search.showTitle,
            mainTitle : this.props.search.mainTitle,
            queryDefault: this.props.search.queryDefault,
            queryPagination : this.parseQueryPaginate(),
            prevUrlPaginate: '#',
            nextUrlPaginate: '#',
            lastUrlPaginate: '#',
            firstUrlPaginate: '#',
            totalProduct: 0,
            currentPage: 0,
            lastPage: 0,
            perPage: 0,
            from: 0,
            to: 0,
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        let dataPush = {
            sortTitle: nextState.sortTitle,
            showTitle: nextState.showTitle
        }
        if (this.state.sortTitle != nextState.sortTitle) {
            console.log('sort: ',nextState.sortTitle)
            this.props.pushSortFilter(dataPush)
        }
        if (this.state.showTitle != nextState.showTitle) {
            console.log('show: ',nextState.showTitle)
            this.props.pushSortFilter(dataPush)
        }
        return true;
    }

    componentDidMount() {
        let query = this.parseQueryString();
        this.fetchBookFilter(query);
        console.log('-----------\nRefresh product page with ' + query + '\n-----------');
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.search !== prevProps.location.search) {
            let query = this.parseQueryString();
            let temp = this.parseQueryPaginate();
            this.setState({
                queryPagination: temp
            });
            this.fetchBookFilter(query);
            console.log('----\nquery string: ' + query + '\n----');
            if (this.props.location.search == '?' + this.state.queryDefault) {
                this.props.resetFilterPage();
                this.setState({
                    sortTitle: this.props.search.sortTitle,
                    showTitle: this.props.search.showTitle
                })
            }
        }
    }
    parseQueryString() {
        let query_params = this.handleQueryNotChange()
        query_params[query_params.filter] = query_params.id;
        delete query_params.filter;
        delete query_params.id;
        let query_string = qs.stringify(query_params);
        return query_string;
    }

    parseQueryPaginate() {
        let query_params = this.handleQueryNotChange();
        if (!isUndefined(query_params.page)) {
            delete query_params.page
        }
        let query_string = qs.stringify(query_params);
        return query_string;
    }

    parseQueryPaginateUrl(url) {
        if (url != null) {
            let query = qs.parseUrl(url).query
            if (query.category) {
                query.filter = 'category';
                query.id = query.category;
                delete query.category;
            }
            if (query.star) {
                query.filter = 'star';
                query.id = query.star;
                delete query.star;
            }
            if (query.author) {
                query.filter = 'author';
                query.id = query.author;
                delete query.author;
            }
            let query_string = qs.stringify(query)
            return query_string
        }
        return "#";
    }
    fetchBookFilter(query) {
        getBookFilter(query)
        .then((response) => {
            var data = response.data.data;
            this.setState({
                books: data,
                prevUrlPaginate: this.parseQueryPaginateUrl(response.data.link.prev_url),
                nextUrlPaginate: this.parseQueryPaginateUrl(response.data.link.next_url),
                lastUrlPaginate: this.parseQueryPaginateUrl(response.data.link.last_url),
                firstUrlPaginate: this.parseQueryPaginateUrl(response.data.link.first_url),
                totalProduct: response.data.meta.total,
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                perPage: response.data.meta.per_page,
                from: response.data.meta.from,
                to: response.data.meta.to
            });
        })
        .catch((error) => console.log(error));
    }
    dataBindingGrid() {
        const rows = chunk(this.state.books, 4);
        return rows.map((arrayBook, index) =>{
            return (
                <div className="mt-4 mb-3 product-show-list" key={index}>
                    <div className="row">
                        <BookCardRow books = {arrayBook} />
                    </div>
                </div>
            );
        })
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
    handleQueryNotChange() {
        const queryParam = getQueryVariable(this.props);
        const newQueryParam = {
           ...queryParam,
        }
        return newQueryParam;
    }

    render() {

        const {lastPage, queryPagination, nextUrlPaginate, prevUrlPaginate, currentPage, perPage, totalProduct, to, from } = this.state;

        const pageNumbers = [];
        for (let i = 1; i <= lastPage; i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if (number == currentPage) {
                return (
                    <li className='page-item active' key={number} id={number}>
                        <Link to={{
                            pathname: "/product/filter",
                            search: queryPagination + '&page=' + number,
                        }} className="page-link"
                        data-page={number} replace>{number}</Link>
                    </li>
                )
            }
            else {
                return (
                    <li className='page-item' key={number} id={number}>
                        <Link to={{
                            pathname: "/product/filter",
                            search: queryPagination + '&page=' + number,
                        }} className="page-link"
                        data-page={number} replace>{number}</Link>
                    </li>
                );
            }
        });

        const prevButton = (
            <Link to={{
                pathname: "/product/filter",
                search: prevUrlPaginate,
            }} className="page-link" replace>Previous</Link>
        )

        const nextButton = (
            <Link to={{
                pathname: "/product/filter",
                search: nextUrlPaginate,
            }} className="page-link" replace>Next</Link>
        )

        return (
        <div className="col-lg-10 col-md-9 col-sm-12 pr-0 product-show-list">
            <div className="mt-4 mb-3 filter-dropdown">
                <div>
                    Showing {from}-{to} of {totalProduct} of books
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
                                })} replace >
                                    Show 100
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>

            <>
                {this.dataBindingGrid()}
                <div className="mt-4 mb-3 pagination">
                    <nav aria-label=" Page navigation product">
                    <ul className="pagination justify-content-end" id='pagination-ul'>
                        {currentPage == 1 ? (
                            <li className="page-item disabled">
                                {prevButton}
                            </li>
                        ) : (
                            <li className="page-item">
                                {prevButton}
                            </li>
                        )}

                        {renderPageNumbers}
                        {currentPage == lastPage ? (
                            <li className="page-item disabled">
                                {nextButton}
                            </li>
                        ) : (
                            <li className="page-item">
                                {nextButton}
                            </li>
                        )}
                    </ul>
                    </nav>
                </div>
            </>
        </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterProduct));
