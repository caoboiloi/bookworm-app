import React from 'react';
import './style.scss';

import MainTitle from '../title';
import LeftSidebar from '../sidebar';
import FilterProduct from '../filter';

class WrapperProduct extends React.Component {
    render() {
        return (
            // WRAPPER - SHOP
            <div className="wrapper-shop">
                {/* Main Title */}
                <MainTitle />

                <div className="row mx-5">
                    <LeftSidebar />

                    <FilterProduct />
                </div>
            </div>
        )
    }
}

export default WrapperProduct;
