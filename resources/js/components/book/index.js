import React from 'react';

import { isNull } from 'lodash';

import { Link } from 'react-router-dom';

class BookCardRow extends React.Component {

    checkFinalPrice(book) {
        var original = "";
        if (book.sub_price != 0) {
            original = (
                <><span>
                    <del>
                        ${book.book_price}
                    </del>
                </span>
                <small className="text-muted">
                    <span className="h2 my-0 pl-2"><b>${book.final_price}</b></span>
                </small></>
            )
        }
        else {
            original = (
                <span>
                    ${book.book_price}
                </span>
            )
        }
        return original;
    }

    render() {
        return (
            <>{this.props.books.map((book) => {
                if (isNull(book.book_cover_photo)) {
                    book.book_cover_photo = 'book5';
                }
                return (
                    <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4" key = {"book_" + book.book_id}>
                        <div className="card h-100">
                            <Link to={'/detail/' + book.book_id}>
                                <img className="card-img-top" src={'/assets/bookcover/' + book.book_cover_photo + '.jpg'} alt={book.book_cover_photo} />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">{book.book_title}</h5>
                                <p className="card-text">
                                    {book.author.author_name}
                                </p>
                            </div>
                            <div className="card-footer d-flex align-items-center flex-wrap">
                                {this.checkFinalPrice(book)}
                            </div>
                        </div>
                    </div>
                );
            })}</>
        );
    }
}

export default BookCardRow;
