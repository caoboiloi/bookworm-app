import React from 'react';

class SubmitForm extends React.Component {
    render() {
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
        )
    }
}

export default SubmitForm;
