import React from 'react';
import "./style.scss";

import { DropdownButton, Dropdown, ButtonGroup } from 'react-bootstrap';

import { getQueryVariable } from '../../../utils/queryVariable';
import { getReviewFilterByBook, getCountReviewByBook } from '../../../utils/httpHelper';

import { withRouter } from 'react-router';

import qs from 'query-string';

import { Link } from 'react-router-dom';

import ReviewCard from '../card';
import SubmitForm from '../submit';

class Review extends React.Component {
    state = {
        sortTitle : 'Default',
        showTitle : 'Show 20',
        starTitle : null,
        sort : 'none',
        show : 20,
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
            avg_star: 0
        },
        queryDefault : 'show=20',
        reviews : []
    }
    async componentDidMount() {
        var codeCount = await this.fetchDataCountReview();
        var codeData = await this.fetchDataReview(this.state.queryDefault);
        this.setState({
            codeCount,
            codeData
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.location.search !== prevProps.location.search) {
            console.log('ROUTER CHANGE REVIEW')
            if (prevState.sort != this.state.sort ||
                prevState.show != this.state.show ||
                prevState.star != this.state.star)
            {
                let query_params = {
                    sort: this.state.sort,
                    show: this.state.show,
                    star: this.state.star
                };
                let query = qs.stringify(query_params)
                this.fetchDataReview(query);
            }
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
                reviews: res.data.reviews.data
            })
            return await res.status;
        }).catch(async error => {
            return await error.response.status;
        })
        return data;
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
        const { star, starTitle, sortTitle, showTitle, starCount, reviews } = this.state
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
                                Show 1-12 of 3134 reviews
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
                                            showTitle : 'Show 20',
                                            starTitle : null,
                                            sort : 'none',
                                            show : 20,
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
                                        <Dropdown.Item eventKey="40" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                show: 40
                                            }))
                                        }}
                                        onClick={() => this.setState({
                                            showTitle: `Show 40`,
                                            show: 40
                                        })} replace >Show 40</Dropdown.Item>
                                        <Dropdown.Item eventKey="60" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                show: 60
                                            }))
                                        }}
                                        onClick={() => this.setState({
                                            showTitle: `Show 60`,
                                            show: 60
                                        })} replace >Show 60</Dropdown.Item>
                                        <Dropdown.Item eventKey="80" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                show: 80
                                            }))
                                        }}
                                        onClick={() => this.setState({
                                            showTitle: `Show 80`,
                                            show: 80
                                        })} replace >Show 80</Dropdown.Item>
                                        <Dropdown.Item eventKey="100" as={Link} to={{
                                        pathname: '/detail/' + this.props.idBook,
                                        search: qs.stringify(this.handleQuerySearch({
                                                show: 100
                                            }))
                                        }}
                                        onClick={() => this.setState({
                                            showTitle: `Show 100`,
                                            show: 100
                                        })} replace >Show 100</Dropdown.Item>
                                    </DropdownButton>
                                </div>
                            </div>
                        </div>
                        <div className="list-card-review">
                            {reviewsElement}
                        </div>
                        <div className="pagination-review mb-3">
                            <nav aria-label=" Page navigation review">
                                <ul className="pagination justify-content-start">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <SubmitForm />
            </div>
        )
    }
}

export default withRouter(Review);
