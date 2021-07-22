import React from 'react';
import "./style.scss";

class MainTitle extends React.Component {
    render() {
        return (
            <div className="main-title mx-5 mb-4">
                <div className="main-title-information">
                    <b className="main-title-information-1">
                        Your cart: <span>3</span> items
                    </b>
                </div>
                <hr />
            </div>
        )
    }
}

export default MainTitle;
