import React from 'react';
import "./style.scss";

import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import { actDeleteAllProductCart } from '../../../actions/index';

import { isNull } from 'lodash';
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
    return {
        deleteAllCart: () => dispatch(actDeleteAllProductCart())
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart.carts
    }
}

class CartList extends React.Component {
    state = {
        carts : this.props.cart
    }

    render() {
        const { carts } = this.state;
        const bookCarts = <>{carts.map((book) => {
            if (isNull(book.bookImg)) {
                book.bookImg = 'book5'
            }
            return (
                <tr key={book.idBook}>
                    <td className="book-title-cart pl-4 py-4">
                        <Link to={'/detail/' + book.idBook}>
                            <img src={"./assets/bookcover/" + book.bookImg + ".jpg"} alt={book.bookTitle} width="120rem" height="160rem" />
                        </Link>
                    </td>
                    <td>
                        <div className="h4">
                            {book.bookTitle}
                        </div>
                        <div>
                            {book.bookAuthor}
                        </div>
                    </td>
                    <td>
                        {book.final_price == book.book_price ? (
                            <div className="h5"><b>${book.book_price}</b></div>
                        ) : (
                            <>
                            <div className="h5"><b>${book.final_price}</b></div>
                            <div><del>${book.book_price}</del></div>
                            </>
                        )}

                    </td>
                    <td>
                        <div className="quantity-item-cart">
                            <button type="button" className="btn btn-secondary">
                                <i className="fa fa-minus"></i>
                            </button>
                            <div className="quantity-number-cart">{book.amount}</div>
                            <button type="button" className="btn btn-secondary">
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                    </td>
                    <td>
                        <div className="h5"><b>${(book.final_price * book.amount).toFixed(2)}</b></div>
                    </td>
                </tr>
            )
        })}</>
        let total = 0
        carts.slice(0).reverse().map(book => {
            total += book.final_price * book.amount
        })
        return(
            <div className="mx-5 mb-4">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-12 list-cart">
                        <table className="table table-responsive-lg border">
                            <thead>
                                <tr>
                                    <th scope="col" colSpan="2" className="pl-4">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookCarts}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 place-order">
                        <div className="card">
                            <div className="card-header text-center">
                                <span className="h5"><b>Cart Totals</b></span>
                            </div>
                            <div className="card-body px-5">
                                <h4 className="card-title my-4"><b>${total.toFixed(2)}</b></h4>
                                <button type="button" className="btn btn-secondary btn-place-order mb-3">
                                    <b>Place order</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CartList));
