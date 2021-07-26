import React from 'react';
import "./style.scss";

import { connect } from 'react-redux';

import { withRouter } from 'react-router';

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart.carts
    }
}

class MainTitle extends React.Component {
    render() {
        var countCart = this.props.cart.length + ' items';
        if (this.props.cart.length == 0) {
            countCart = '0 item';
        }
        return (
            <div className="main-title mx-5 mb-4">
                <div className="main-title-information">
                    <b className="main-title-information-1">
                        Your cart: <span>{countCart}</span>
                    </b>
                </div>
                <hr />
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(withRouter(MainTitle));
