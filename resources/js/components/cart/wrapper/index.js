import React from 'react';
import "./style.scss";

import MainTitle from '../title';
import CartList from '../list';

class WrapperCart extends React.Component {
    render() {
        return (
            <div className="wrapper-cart">
                <MainTitle />

                <CartList />
            </div>
        )
    }
}

export default WrapperCart;
