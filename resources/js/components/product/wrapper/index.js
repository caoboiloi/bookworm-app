import React from 'react';
import './style.scss';

import { withRouter } from 'react-router';

import MainTitle from '../title';
import LeftSidebar from '../sidebar';
import FilterProduct from '../filter';

import qs from 'query-string';

class WrapperProduct extends React.Component {

    componentDidMount() {
        this.getQueryVariable();
    }

    getQueryVariable() {
        let params = qs.parse(this.props.location.search);
        console.log(params);
    }

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

export default withRouter(WrapperProduct);
