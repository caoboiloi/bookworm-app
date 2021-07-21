import React from 'react';
import "./style.scss";

class Review extends React.Component {
    render() {
        return (
            // Review List
            <div className="row review-list">
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="border px-5 my-4 pt-5">
                        <div className="d-flex flex-row justify-content-start align-items-center">
                            <h4><b>Customer Reviews</b></h4>
                            <span className="ml-2">(Filtered by 5 star)</span>
                        </div>
                        <div className="d-flex flex-row justify-content-start align-items-center mt-3">
                            <p className="h2 font-weight-bold">4.6</p>
                            <p className="h2 font-weight-bold ml-3">Star</p>
                        </div>
                        <div className="d-flex flex-row justify-content-start align-items-center">
                            <div>
                                <a href="#" className="filter-all-star-review">(3,123)</a>
                            </div>
                            <div className="ml-3">
                                <a className="filter-star-review" href="#">5 star (<span>200</span>)</a> |
                                <a className="filter-star-review" href="#">4 star (<span>200</span>)</a> |
                                <a className="filter-star-review" href="#">3 star (<span>200</span>)</a> |
                                <a className="filter-star-review" href="#">2 star (<span>200</span>)</a> |
                                <a className="filter-star-review" href="#">1 star (<span>200</span>)</a>
                            </div>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center mt-4 filter-date-review">
                            <div>
                                Show 1-12 of 3134 reviews
                            </div>
                            <div className="d-flex flex-row justify-content-start align-items-center">
                                <div className="input-group mx-4">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort by
                                            date</button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Sort by date: newest to oldest</a>
                                            <a className="dropdown-item" href="#">Sort by date: oldest to newest</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Show
                                            20</button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Show 40</a>
                                            <a className="dropdown-item" href="#">Show 60</a>
                                            <a className="dropdown-item" href="#">Show 80</a>
                                            <a className="dropdown-item" href="#">Show All</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="list-card-review">
                            <div className="card-review my-4">
                                <div className="review-title">
                                    <span className="review-content-title">
                                        <span className="h5"><b>Review title</b></span>
                                    </span>
                                    <span className="review-star-title">
                                        | 5 star
                                    </span>
                                </div>
                                <div className="review-body my-4">
                                    review content - Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                    1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen
                                    book. It has survived not only five centuries,
                                </div>
                                <div className="review-date">
                                    April 12, 2021
                                </div>
                                <hr />
                            </div>
                            <div className="card-review my-4">
                                <div className="review-title">
                                    <span className="review-content-title">
                                        <span className="h5"><b>Review title</b></span>
                                    </span>
                                    <span className="review-star-title">
                                        | 5 star
                                    </span>
                                </div>
                                <div className="review-body my-4">
                                    review content - Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                    1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen
                                    book. It has survived not only five centuries,
                                </div>
                                <div className="review-date">
                                    April 12, 2021
                                </div>
                                <hr />
                            </div>
                            <div className="card-review my-4">
                                <div className="review-title">
                                    <span className="review-content-title">
                                        <span className="h5"><b>Review title</b></span>
                                    </span>
                                    <span className="review-star-title">
                                        | 5 star
                                    </span>
                                </div>
                                <div className="review-body my-4">
                                    review content - Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                    1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen
                                    book. It has survived not only five centuries,
                                </div>
                                <div className="review-date">
                                    April 12, 2021
                                </div>
                                <hr />
                            </div>
                            <div className="card-review my-4">
                                <div className="review-title">
                                    <span className="review-content-title">
                                        <span className="h5"><b>Review title</b></span>
                                    </span>
                                    <span className="review-star-title">
                                        | 5 star
                                    </span>
                                </div>
                                <div className="review-body my-4">
                                    review content - Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                                    1500s,
                                    when an unknown printer took a galley of type and scrambled it to make a type
                                    specimen
                                    book. It has survived not only five centuries,
                                </div>
                                <div className="review-date">
                                    April 12, 2021
                                </div>
                                <hr />
                            </div>
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
                                                <input type="text" className="form-control" id="reviewTitle" />
                                                <small className="form-text text-muted">
                                                    Please enter the review title.
                                                </small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="detailBook">
                                                    Details please! Your review helps other shoppers
                                                </label>
                                                <textarea className="form-control" id="detailBook" rows="3"></textarea>
                                                <small className="form-text text-muted">Please enter the detail.</small>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="ratingStar">Select a rating star</label>
                                                <select className="custom-select my-1 mr-sm-2" id="ratingStar">
                                                    <option value="1" defaultValue='1'>1 Star</option>
                                                    <option value="2">2 Star</option>
                                                    <option value="3">3 Star</option>
                                                    <option value="4">4 Star</option>
                                                    <option value="5">5 Star</option>
                                                </select>
                                                <small className="form-text text-muted">Please rate the product.</small>
                                            </div>
                                        </form>
                                    </div>
                                </li>
                                <li className="list-group-item mx-5">
                                    <button type="button" className="btn btn-secondary btn-submit-review">
                                        Submit Review
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Review;
