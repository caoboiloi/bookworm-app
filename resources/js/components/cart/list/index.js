import React from 'react';
import "./style.scss";

import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import { actDeleteAllProductCart, actDeleteProductById, actUpdateAmountProductCart } from '../../../actions/index';

import { isNull } from 'lodash';
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
    return {
        deleteAllCart: () => dispatch(actDeleteAllProductCart()),
        deleteProductById: (id) => dispatch(actDeleteProductById(id)),
        updateQuantityProductById: (amount, id) => dispatch(actUpdateAmountProductCart(amount, id))
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart.carts,
        totalAmount : state.cart.totalAmount
    }
}

class CartList extends React.Component {
    state = {
        carts : this.props.cart,
        totalAmount : this.props.totalAmount
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.cart.length != this.props.cart.length) {
            this.setState({
                carts: nextProps.cart
            })
        }
        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.totalAmount != this.props.totalAmount) {
            this.setState({
                carts: this.props.cart
            })
        }
    }

    handleSubAmountProductCart(id) {
        let quantity = document.getElementById('quantity-cart-' + id).innerHTML;
        if (quantity == 1) {
            this.props.deleteProductById(id);
        }
        else {
            quantity = parseInt(quantity) - 1;
            this.props.updateQuantityProductById(quantity,id);
            document.getElementById('quantity-cart-' + id).innerHTML = quantity;
        }
    }

    handleAddAmountProductCart(id) {
        let quantity = document.getElementById('quantity-cart-' + id).innerHTML;
        let btnAdd = document.getElementById('btn-add-quantity-cart-' + id);
        if (quantity == 8) {
            btnAdd.className += ' disabled';
        }
        else {
            quantity = parseInt(quantity) + 1;
            this.props.updateQuantityProductById(quantity,id);
            document.getElementById('quantity-cart-' + id).innerHTML = quantity;
        }
    }

    render() {
        const { carts, totalAmount } = this.state;
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
                            <button type="button" className="btn btn-secondary"
                            id={'btn-sub-quantity-cart-' + book.idBook} onClick={this.handleSubAmountProductCart.bind(this, book.idBook)}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <div className="quantity-number-cart" id={'quantity-cart-' + book.idBook}>{book.amount}</div>
                            <button type="button" className="btn btn-secondary"
                            id={'btn-add-quantity-cart-' + book.idBook} onClick={this.handleAddAmountProductCart.bind(this, book.idBook)}>
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
        carts.map(book => {
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
