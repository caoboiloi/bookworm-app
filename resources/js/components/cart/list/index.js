import React from 'react';
import "./style.scss";

import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import { actDeleteAllProductCart } from '../../../actions/index';

const mapDispatchToProps = dispatch => {
    return {
        deleteAllCart: () => dispatch(actDeleteAllProductCart())
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart
    }
}

class CartList extends React.Component {

    componentDidMount() {
        console.log('hello')
        console.log(this.props.cart)
        // this.props.deleteAllCart();
    }

    render() {
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
                                <tr>
                                    <td className="book-title-cart pl-4 py-4">
                                        <img src="./assets/bookcover/book1.jpg" alt="" width="120rem" height="160rem" />
                                    </td>
                                    <td>
                                        <div className="h4">
                                            Book title
                                        </div>
                                        <div>
                                            Author name
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h5"><b>$29.99</b></div>
                                        <div><del>$49.99</del></div>
                                    </td>
                                    <td>
                                        <div className="quantity-item-cart">
                                            <button type="button" className="btn btn-secondary">
                                                <i className="fa fa-minus"></i>
                                            </button>
                                            <div className="quantity-number-cart">1</div>
                                            <button type="button" className="btn btn-secondary">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h5"><b>$29.99</b></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="book-title-cart pl-4 py-4">
                                        <img src="./assets/bookcover/book2.jpg" alt="" width="120rem" height="160rem" />
                                    </td>
                                    <td>
                                        <div className="h4">
                                            Book title
                                        </div>
                                        <div>
                                            Author name
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h5"><b>$29.99</b></div>
                                        <div><del>$49.99</del></div>
                                    </td>
                                    <td>
                                        <div className="quantity-item-cart">
                                            <button type="button" className="btn btn-secondary">
                                                <i className="fa fa-minus"></i>
                                            </button>
                                            <div className="quantity-number-cart">1</div>
                                            <button type="button" className="btn btn-secondary">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h5"><b>$29.99</b></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="book-title-cart pl-4 py-4">
                                        <img src="./assets/bookcover/book3.jpg" alt="" width="120rem" height="160rem" />
                                    </td>
                                    <td>
                                        <div className="h4">
                                            Book title
                                        </div>
                                        <div>
                                            Author name
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h5"><b>$29.99</b></div>
                                        <div><del>$49.99</del></div>
                                    </td>
                                    <td>
                                        <div className="quantity-item-cart">
                                            <button type="button" className="btn btn-secondary">
                                                <i className="fa fa-minus"></i>
                                            </button>
                                            <div className="quantity-number-cart">1</div>
                                            <button type="button" className="btn btn-secondary">
                                                <i className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="h5"><b>$29.99</b></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 place-order">
                        <div className="card">
                            <div className="card-header text-center">
                                <span className="h5"><b>Cart Totals</b></span>
                            </div>
                            <div className="card-body px-5">
                                <h4 className="card-title my-4"><b>$99.99</b></h4>
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
