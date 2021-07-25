import React from 'react';

import { withRouter } from 'react-router';

import { Alert } from 'react-bootstrap';

import { postDataReview } from '../../../utils/httpHelper';

import { connect } from 'react-redux';

import { actReloadReviewList } from '../../../actions';

const mapDispatchToProps = dispatch => {
    return {
        reloadReviewList: () => dispatch(actReloadReviewList()),
    };
};
class SubmitForm extends React.Component {
    state = {
        data : [],
        seconds: 5,
        review_title : '',
        review_details : '',
        rating_start : 0,
        errorTitle : '',
        errorDetails : '',
        errorStart : '',
        code : -1,
        showAlert : false,
        showError : false
    }

    handleChangeReviewTitle(event) {
        let review_title = event.target.value;
        this.setState({review_title: review_title});
    }

    handleChangeReviewDetail(event) {
        let review_details = event.target.value;
        this.setState({review_details: review_details});
    }

    handleSelectStar(event) {
        let rating_start = event.target.value;
        this.setState({rating_start: rating_start});
    }

    startTimer = () => {
        let interval = setInterval(this.timer.bind(this), 1000);
        this.setState({
            interval
        })
    };

    timer() {
        let seconds = this.state.seconds - 1;
        this.setState({
            seconds: seconds,
        });

        if (seconds == 0) {
            clearInterval(this.state.interval);
            this.setState({
                seconds: 5,
                showAlert: false
            })
            this.props.reloadReviewList();
        }
    }

    async submitFormReview() {
        let {review_title, review_details, rating_start} = this.state;
        if (review_title.length == 0) {
            this.setState({
                errorTitle: 'Please enter the review title'
            })
        }
        else if (review_title.length >= 150) {
            this.setState({
                errorTitle: 'Review title no longer than 150 characters'
            })
        }
        else if (review_details.length == 0) {
            this.setState({
                errorDetails: 'Please enter the detail'
            })
        }
        else if (rating_start == 0) {
            this.setState({
                errorStart: 'Please rate the product'
            })
        }
        else {
            let review = {
                review_title,
                review_details,
                rating_start
            }
            let code = await this.fetchPostDataReview(review);
            this.setState({
                errorTitle : '',
                errorDetails : '',
                errorStart : '',
                review_title : '',
                review_details : '',
                rating_start : 0,
            })
            if (code == 201) {
                this.startTimer();
                this.setState({
                    showAlert: true
                })
            }
            else if (code == 500) {
                this.setState({
                    showError: true
                })
            }
        }
    }

    async fetchPostDataReview(body) {
        let code = await postDataReview(this.props.idBook, body)
        .then(async res => {
            return await res.status;
        }).catch(async error => {
            return await error.response.status;
        })
        return code;
    }

    render() {
        const {review_title, review_details, rating_start, errorTitle, errorDetails, errorStart, showAlert, showError, seconds} = this.state;

        const errorTitleElement = (
            <small className="form-text text-muted">{errorTitle}</small>
        )

        const errorDetailElement = (
            <small className="form-text text-muted">{errorDetails}</small>
        )

        const errorStartElement = (
            <small className="form-text text-muted">{errorStart}</small>
        )
        return(
            <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="write-a-review py-4">
                    <div className="card">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item ml-2">
                                <span className="h4">
                                    <b>Write a review</b>
                                </span>
                            </li>
                            <li className="list-group-item">
                                <div>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="reviewTitle">Add a title</label>
                                            <input type="text"
                                                className="form-control"
                                                value={review_title}
                                                id="reviewTitle"
                                                onChange={this.handleChangeReviewTitle.bind(this)}/>
                                            {errorTitleElement}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="detailBook">
                                                Details please! Your review helps other shoppers
                                            </label>
                                            <textarea className="form-control"
                                                value={review_details}
                                                id="detailBook"
                                                rows="3"
                                                onChange={this.handleChangeReviewDetail.bind(this)}></textarea>
                                            {errorDetailElement}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="ratingStar">Select a rating star</label>
                                            <select className="custom-select my-1 mr-sm-2"
                                            id="ratingStar"
                                            value={rating_start}
                                            onChange={this.handleSelectStar.bind(this)}>
                                                <option value="0">None</option>
                                                <option value="1">1 Star</option>
                                                <option value="2">2 Star</option>
                                                <option value="3">3 Star</option>
                                                <option value="4">4 Star</option>
                                                <option value="5">5 Star</option>
                                            </select>
                                            {errorStartElement}
                                        </div>
                                    </form>
                                </div>
                            </li>
                            <li className="list-group-item mx-5">
                                <button type="submit" className="btn btn-secondary btn-submit-review" onClick={this.submitFormReview.bind(this)}>
                                    Submit Review
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                {showAlert ? (
                <Alert variant="success" onClose={() => this.setState({showAlert:false})} dismissible>
                    <Alert.Heading>Added new review successfully</Alert.Heading>
                    <p>
                        Reload review list of product after {seconds} seconds
                    </p>
                </Alert>
                ) : (<></>)}
                {showError ? (
                    <Alert variant="danger" onClose={() => this.setState({showError:false})} dismissible>
                        <Alert.Heading>Error</Alert.Heading>
                        <p>
                            Server error
                        </p>
                    </Alert>
                ) : (<></>)}
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(withRouter(SubmitForm));
