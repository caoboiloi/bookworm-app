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
        queryDefault : this.props.search.queryDefault
    }

    componentDidMount() {
        this.fetchBookFilter(this.state.queryDefault);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.search !== prevProps.location.search) {
            if (prevProps.search.mainTitle != this.state.filter ||
                prevProps.search.sortTitle != this.state.sort ||
                prevProps.search.showTitle != this.state.show) {
                let query = this.onRouteChanged()
                this.fetchBookFilter(query);
            }
            if (this.props.location.search == '?' + this.state.queryDefault) {
                this.props.resetFilterPage();
                this.fetchBookFilter(this.state.queryDefault);
            }
        }
    }
    onRouteChanged() {
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
                books: data
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
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductFilterList))
