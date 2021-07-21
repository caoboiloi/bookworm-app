import React from 'react';
import "./style.scss";

class Describe extends React.Component {
    render() {
        return(
            // Detail Book
            <div className="row detail-book">
                <div className="col-lg-8 col-md-8 col-sm-12">
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-md-3 d-flex align-items-end flex-column mb-4">
                                <img src="./assets/bookcover/book3.jpg" alt="book" width="100%" />
                                <div className="card-text mt-4 author-detail-book">
                                    By (author) <b>Anna Banks</b>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="card-body ml-2">
                                    <h3 className="card-title"><b>Book title</b></h3>
                                    <div className="card-text">Book Description</div>
                                    <p className="card-text">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the industry's
                                        standard dummy text ever since the 1500s, when an unknown
                                        printer took a galley of type and scrambled it to make a
                                        type specimen book.
                                    </p>
                                    <p className="card-text">It is a long established fact that a reader will be distracted
                                        by the readable content of a page when looking at its layout. The point of using
                                        Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                                        opposed to using 'Content here, content here', making it look like readable
                                        English.
                                    </p>
                                    <p className="card-text">It is a long established fact that a reader will be distracted
                                        by the readable content of a page when looking at its layout. The point of using
                                        Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
                                        opposed to using 'Content here, content here', making it look like readable
                                        English.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex align-items-center mx-4">
                                <span><del>$49.99</del></span>
                                <span className="h2 my-0 pl-2"><b>$29.99</b></span>
                            </div>
                        </div>
                        <div className="mx-5 mt-5">Quantity</div>
                        <div className="quantity-item mx-5 mb-4">
                            <button type="button" className="btn btn-secondary">
                                <i className="fa fa-minus"></i>
                            </button>
                            <div>1</div>
                            <button type="button" className="btn btn-secondary">
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                        <button type="button" className="btn btn-secondary btn-order mx-5 mb-5">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Describe;
