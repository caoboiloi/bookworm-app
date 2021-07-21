import React from 'react';
import "./style.scss";

import { withRouter } from 'react-router';

class Describe extends React.Component {
    state = {
        book : this.props.book
    }

    handleSelectAdd() {
        let number = document.getElementById('number-order').innerHTML;
        const btnAdd = document.getElementById('add-number-order');
        if (number == 8) {
            btnAdd.className += ' disabled';
        }
        else {
            number = parseInt(number) + 1;
            document.getElementById('number-order').innerHTML = number;
        }
    }

    handleSelectSub() {
        let number = document.getElementById('number-order').innerHTML;
        const btnSub = document.getElementById('sub-number-order');
        if (number == 1) {
            btnSub.className += ' disabled';
        }
        else {
            number = parseInt(number) - 1;
            document.getElementById('number-order').innerHTML = number;
        }
    }

    render() {
        const { book } = this.state;

        return(
        <>
            {book ? (
                <div className="row detail-book">
                    <div className="col-lg-8 col-md-8 col-sm-12">
                        <div className="card mb-3">
                            <div className="row no-gutters">
                                <div className="col-md-3 d-flex align-items-end flex-column mb-4">
                                    <img src={'/assets/bookcover/' + book.book_cover_photo + '.jpg'} alt="book" width="100%" />
                                    <div className="card-text mt-4 author-detail-book">
                                        By (author) <b>{book.author.author_name}</b>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body ml-2">
                                        <h3 className="card-title"><b>{book.book_title}</b></h3>
                                        <div className="card-text">Book Description</div>
                                        <p className="card-text">{book.book_summary}</p>
                                        <p className="card-text">{book.author.author_bio}</p>
                                        <p className="card-text">{book.category.category_desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center mx-4">
                                    {book.sub_price != 0 ? (
                                        <>
                                            <span><del>${book.book_price}</del></span>
                                            <span className="h2 my-0 pl-2"><b>${book.final_price}</b></span>
                                        </>
                                    ) : (
                                        <span className="h2 my-0 pl-2"><b>${book.book_price}</b></span>
                                    )}
                                </div>
                            </div>
                            <div className="mx-5 mt-5">Quantity</div>
                            <div className="quantity-item mx-5 mb-4">
                                <button type="button" className="btn btn-secondary" id='sub-number-order' onClick={this.handleSelectSub}>
                                    <i className="fa fa-minus"></i>
                                </button>
                                <div id="number-order">1</div>
                                <button type="button" className="btn btn-secondary" id='add-number-order' onClick={this.handleSelectAdd}>
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                            <button type="button" className="btn btn-secondary btn-order mx-5 mb-5">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            ) : (<></>)}
        </>
            // Detail Book
        )
    }
}

export default withRouter(Describe);
