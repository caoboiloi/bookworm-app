import React from 'react';
import "./style.scss";

import MainTitle from '../title';
import Describe from '../describe';
import Review from '../review';

class WrapperDetail extends React.Component {
    render() {
        return (
            <div className="wrapper-detail">
                <MainTitle />

                <div className="mx-5">
                    <Describe />
                    <Review />
                </div>
            </div>
        )
    }
}

export default WrapperDetail;
