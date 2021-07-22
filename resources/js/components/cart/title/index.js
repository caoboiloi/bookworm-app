import React from 'react';
import "./style.scss";

import { connect } from 'react-redux';

import { withRouter } from 'react-router';

const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart
    }
}

class MainTitle extends React.Component {
    render() {
        return (
            <div className="main-title mx-5 mb-4">
                <div className="main-title-information">
                    <b className="main-title-information-1">
                        Your cart: <span>{this.props.cart.length}</span> items
                    </b>
                </div>
                <hr />
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(withRouter(MainTitle));
