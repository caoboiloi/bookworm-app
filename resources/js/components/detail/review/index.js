import React from 'react';
import "./style.scss";

import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';

import { getQueryVariable } from '../../../utils/queryVariable';
import { getReviewFilterByBook, getCountReviewByBook } from '../../../utils/httpHelper';

import { withRouter } from 'react-router';

import qs from 'query-string';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { isUndefined } from 'lodash';

import ReviewCard from '../card';
import SubmitForm from '../submit';

import { actSetDefaultReloadReviewList } from '../../../actions';

const mapStateToProps = (state, ownProps) => {
    return {
        review: state.review
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDefaultReloadReviewList: () => dispatch(actSetDefaultReloadReviewList()),
    };
};

class Review extends React.Component {
    state = {
        sortTitle : 'Default',
        showTitle : 'Show 5',
        starTitle : null,
        sort : 'none',
        show : 5,
        star : 0,
        codeCount : -1,
        codeData : -1,
        starCount : {
            one_star: 0,
            two_star: 0,
            three_star: 0,
            four_star: 0,
            five_star: 0,
            count_star: 0,
            avg_star: 0,
        },
        queryDefault : 'show=5',
        reviews : [],
        prevUrlPaginate: '#',
        nextUrlPaginate: '#',
        totalProduct: 0,
        currentPage: 0,
        lastPage: 0,
        perPage: 0,
        from: 0,
        to: 0,
        queryPagination : this.parseQuery(),
    }
    async componentDidMount() {
        var codeCount = await this.fetchDataCountReview();
        var query = this.parseQuery();
        console.log('-----------\nRefresh detail page with ' + query + '\n-----------');
        var codeData = await this.fetchDataReview(query);
        this.setState({
            codeCount,
            codeData
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.review.isReload != prevProps.review.isReload && this.props.review.isReload) {
            let query_params = {
                sort: this.state.sort,
                show: this.state.show,
                star: this.state.star
            };
            let queryPagination = qs.stringify(query_params);
            let query = this.parseQuery();
            this.setState({
                queryPagination
            });
            this.fetchDataReview(query);
            this.fetchDataCountReview();
            this.props.setDefaultReloadReviewList();
        }
        if (this.props.location.search !== prevProps.location.search) {
            let query_params = {
                sort: this.state.sort,
                show: this.state.show,
                star: this.state.star
            };
            let queryPagination = qs.stringify(query_params);
            let query = this.parseQuery();
            this.setState({
                queryPagination
            });
            this.fetchDataReview(query);
            console.log('filter with ' + query);
            console.log('pagination query: ', queryPagination);
        }
    }

    async fetchDataCountReview() {
        let data = await getCountReviewByBook(this.props.idBook)
        .then(async res => {
            this.setState({
                starCount: res.data.count
            })
            return await res.status;
        }).catch(async error => {
            return await error.response.status;
        })
        return data;
    }
    async fetchDataReview(query) {
        let data = await getReviewFilterByBook(this.props.idBook, query)
        .then(async res => {
            this.setState({
                reviews: res.data.reviews.data,
                prevUrlPaginate: this.parseQueryPaginateUrl(res.data.reviews.link.prev_url),
                nextUrlPaginate: this.parseQueryPaginateUrl(res.data.reviews.link.next_url),
                totalProduct: res.data.reviews.meta.total,
                currentPage: res.data.reviews.meta.current_page,
                lastPage: res.data.reviews.meta.last_page,
                perPage: res.data.reviews.meta.per_page,
                from: res.data.reviews.meta.from,
                to: res.data.reviews.meta.to
            })
            return await res.status;
        }).catch(async error => {
            return await error.response.status;
        })
        return data;
    }

    parseQuery() {
        const queryParam = getQueryVariable(this.props);
        const newQueryParam = {
           ...queryParam,
        }
        let query_params = newQueryParam;
        if (isUndefined(query_params.show) && isUndefined(query_params.sort) && isUndefined(query_params.star)) {
            query_params.star = 0;
            query_params.show = 5;
        }
        else if (isUndefined(query_params.show)) {
            query_params.show = 5;
        }
        let query_string = qs.stringify(query_params);
        return query_string;
    }

    parseQueryPaginateUrl(url) {
        if (url != null) {
            let query = qs.parseUrl(url).query
            let query_string = qs.stringify(query)
            return query_string
        }
        return "#";
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
        const { star,
                starTitle,
                sortTitle,
                showTitle,
                starCount,
                reviews,
                prevUrlPaginate,
                nextUrlPaginate,
                lastPage,
                currentPage,
                queryPagination,
                totalProduct,
                from,
                to } = this.state

        const starArr = [5, 4, 3, 2, 1];

        const starElement = starArr.map(s => {
            let temp = 0;
            switch (s) {
                case 1:
                    temp = starCount.one_star;
                    break;
                case 2:
                    temp = starCount.two_star;
                    break;
                case 3:
                    temp = starCount.three_star;
                    break;
                case 4:
                    temp = starCount.four_star;
                    break;
                case 5:
                    temp = starCount.five_star;
                    break;
                default:
                    temp = 0;
                    break;
            }
            return (
                <span key={s}>
                    <Link className="filter-star-review" to={{
                        pathname: '/detail/' + this.props.idBook,
                        search: qs.stringify(this.handleQuerySearch({
                                star: s
                            }))
                        }} onClick={() => this.setState({
                            starTitle: s + ' star',
                            star: s
                        })} replace >
                            {s} star (<span>{temp}</span>)
                    </Link> |
                </span>
            )
        })
        const reviewsElement = reviews.map(re => {
            return <ReviewCard review={re} key={re.id}/>
        })

        const pageNumbers = [];
        for (let i = 1; i <= lastPage; i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            if (number == currentPage) {
                return (
                    <li className='page-item active' key={number} id={number}>
                        <Link to={{
                            pathname: '/detail/' + this.props.idBook,
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
                            pathname: '/detail/' + this.props.idBook,
                            search: queryPagination + '&page=' + number,
                        }} className="page-link"
                        data-page={number} replace>{number}</Link>
                    </li>
                );
            }
        })

        const prevButton = (
            <Link to={{
                pathname: '/detail/' + this.props.idBook,
                search: prevUrlPaginate,
            }} className="page-link" replace>Previous</Link>
        )

        const nextButton = (
            <Link to={{
                pathname: '/detail/' + this.props.idBook,
                search: nextUrlPaginate,
            }} className="page-link" replace>Next</Link>
        )

        return (
            // Review List
            <div className="row review-list">
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="border px-5 my-4 pt-5">
                        <div className="d-flex flex-row justify-content-start align-items-center">
                            <h4><b>Customer Reviews</b></h4>
                            {star != 0 ? (
                                <span className="ml-2">(Filtered by {starTitle})</span>
                            ) : (<></>)}
                        </div>
                        <div className="d-flex flex-row justify-content-start align-items-center mt-3">
                            <p className="h2 font-weight-bold">{starCount.avg_star}</p>
                            <p className="h2 font-weight-bold ml-3">Star</p>
                        </div>
                        <div className="d-flex flex-row justify-content-start align-items-center">
                            <div>
                                <Link className="filter-all-star-review" to={{
                                    pathname: '/detail/' + this.props.idBook,
                                    search: qs.stringify(this.handleQuerySearch({
                                            star: 0
                                        }))
                                    }} onClick={() => this.setState({
                                        starTitle: null,
                                        star: 0
                                    })} replace >Total ({starCount.count_star})</Link>
                            </div>
                            <div className="ml-3">
                                    {starElement}
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center mt-4 filter-date-review">
                            <div>
                                Showing {from}-{to} of {totalProduct} of reviews
                            </div>
                            <div className="d-flex flex-row justify-content-start align-items-center">
                                <div className="input-group mx-4">
                                    <DropdownButton
                                        as={ButtonGroup}
                                        key='sort'
                                        id='dropdown-variants-sort-review'
                                        variant='secondary'
                                        title={sortTitle}>
                                        <Dropdown.Item eventKey="none" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook
                                        }}
                                        onClick={() => this.setState({
                                            sortTitle : 'Default',
                                            showTitle : 'Show 5',
                                            starTitle : null,
                                            sort : 'none',
                                            show : 5,
                                            star : 0
                                        })} replace >Default</Dropdown.Item>
                                        <Dropdown.Item eventKey="desc" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                sort: 'desc'
                                            }))
                                        }} onClick={() => this.setState({
                                            sortTitle: `Sort by date: newest to oldest`,
                                            sort: 'desc'
                                        })} replace >Sort by date: newest to oldest</Dropdown.Item>
                                        <Dropdown.Item eventKey="asc" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                sort: 'asc'
                                            }))
                                        }} onClick={() => this.setState({
                                            sortTitle: `Sort by date: oldest to newest`,
                                            sort: 'asc'
                                        })} replace >Sort by date: oldest to newest</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                                <div className="input-group">
                                    <DropdownButton
                                        as={ButtonGroup}
                                        key='show'
                                        id='dropdown-variants-show-review'
                                        variant='secondary'
                                        title={showTitle}>
                                        <Dropdown.Item eventKey="5" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                show: 5
                                            }))
                                        }}
                                        onClick={() => this.setState({
                                            showTitle: `Show 5`,
                                            show: 5
                                        })} replace >Show 5</Dropdown.Item>
                                        <Dropdown.Item eventKey="10" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                show: 10
                                            }))
                                        }}
                                        onClick={() => this.setState({
                                            showTitle: `Show 10`,
                                            show: 10
                                        })} replace >Show 10</Dropdown.Item>
                                        <Dropdown.Item eventKey="15" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                show: 15
                                            }))
                                        }}
                                        onClick={() => this.setState({
                                            showTitle: `Show 15`,
                                            show: 15
                                        })} replace >Show 15</Dropdown.Item>
                                        <Dropdown.Item eventKey="20" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                show: 20
                                            }))
                                        }}
                                        onClick={() => this.setState({
                                            showTitle: `Show 20`,
                                            show: 20
                                        })} replace >Show 20</Dropdown.Item>
                                        <Dropdown.Item eventKey="25" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                show: 25
                                            }))
                                        }}
                                        onClick={() => this.setState({
                                            showTitle: `Show 25`,
                                            show: 25
                                        })} replace >Show 25</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </div>
                        </div>
                        <div className="list-card-review">
                            {reviewsElement}
                        </div>
                        <div className="pagination-review mb-3">
                            <nav aria-label=" Page navigation review">
                                <ul className="pagination justify-content-start" id='pagination-ul'>
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
                    </div>
                </div>
                <SubmitForm idBook={this.props.idBook}/>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Review));
