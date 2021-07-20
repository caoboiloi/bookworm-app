import React from 'react';
import { Link } from 'react-router-dom';

import { getBookFilter } from './../../../utils/httpHelper';

import BookCardRow from './../../book';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { chunk } from 'lodash';

import qs from 'query-string';

import { actResetDataFilterPage } from '../../../actions/index';
import { getQueryVariable } from '../../../utils/queryVariable';

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

class ProductFilterList extends React.Component {

    state = {
        books : [],
        sort : this.props.search.sortTitle,
        show : this.props.search.showTitle,
        filter : this.props.search.mainTitle,
        queryDefault : this.props.search.queryDefault,
        prevUrlPaginate: '#',
        nextUrlPaginate: '#',
        lastUrlPaginate: '#',
        firstUrlPaginate: '#',
        totalProduct: 0,
        currentPage: 0,
        lastPage: 0,
        perPage: 0
    }

    componentDidMount() {
        this.fetchBookFilter(this.state.queryDefault);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.search !== prevProps.location.search) {
            console.log('ROUTER CHANGE - productFilter')
            if (prevProps.search.mainTitle != this.state.filter ||
                prevProps.search.sortTitle != this.state.sort ||
                prevProps.search.showTitle != this.state.show) {
                    let query = this.parseQueryString()
                    this.fetchBookFilter(query);
            }
            if (prevProps.search.mainTitle == this.state.filter &&
                prevProps.search.sortTitle == this.state.sort &&
                prevProps.search.showTitle == this.state.show) {
                    console.log('pagination')
                    let query = this.parseQueryString()
                    this.fetchBookFilter(query);
                }
            if (this.props.location.search == '?' + this.state.queryDefault) {
                this.props.resetFilterPage();
                this.fetchBookFilter(this.state.queryDefault);
            }
        }
    }
    parseQueryString() {
        let query_params = this.handleQuerySearch()
        query_params[query_params.filter] = query_params.id;
        delete query_params.filter;
        delete query_params.id;
        let query_string = qs.stringify(query_params);
        this.setState({
            sort : this.props.search.sortTitle,
            show : this.props.search.showTitle,
            filter : this.props.search.mainTitle,
        });
        return query_string;
    }
    parseQueryPaginate(url) {
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
    handleQuerySearch() {
        const queryParam = getQueryVariable(this.props);
        const newQueryParam = {
           ...queryParam,
        }
        return newQueryParam;
    }

    fetchBookFilter(query) {
        getBookFilter(query)
        .then((response) => {
            var data = response.data.data;
            this.setState({
                books: data,
                prevUrlPaginate: this.parseQueryPaginate(response.data.link.prev_url),
                nextUrlPaginate: this.parseQueryPaginate(response.data.link.next_url),
                lastUrlPaginate: this.parseQueryPaginate(response.data.link.last_url),
                firstUrlPaginate: this.parseQueryPaginate(response.data.link.first_url),
                totalProduct: response.data.meta.total,
                currentPage: response.data.meta.current_page,
                lastPage: response.data.meta.last_page,
                perPage: response.data.meta.per_page
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

    render() {
        return (
            <>
                {this.dataBindingGrid()}
                <div className="mt-4 mb-3 pagination">
                    <nav aria-label=" Page navigation product">
                    <ul className="pagination justify-content-end">
                        <li className="page-item">
                            <Link to={{
                                pathname: "/product/filter",
                                search: this.state.prevUrlPaginate,
                            }} className="page-link" replace>Previous</Link>
                        </li>
                        <li className="page-item disabled">
                            <Link to={{
                                pathname: "/product/filter",
                                search: "?sort=name",
                            }} className="page-link">1</Link>
                        </li>
                        <li className="page-item">
                            <Link to={{
                                pathname: "/product/filter",
                                search: "?sort=name",
                            }} className="page-link">2</Link>
                        </li>
                        <li className="page-item">
                            <Link to={{
                                pathname: "/product/filter",
                                search: "?sort=name",
                            }} className="page-link">3</Link>
                        </li>
                        <li className="page-item">
                            <Link to={{
                                pathname: "/product/filter",
                                search: this.state.nextUrlPaginate,
                            }} className="page-link" replace>Next</Link>
                        </li>
                    </ul>
                    </nav>
                </div>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductFilterList))
