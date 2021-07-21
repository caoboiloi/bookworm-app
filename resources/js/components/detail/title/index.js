import React from 'react';
import "./style.scss";

class MainTitle extends React.Component {
    render() {
        return (
            // Main Title
            <div className="main-title mx-5 mb-4">
                <div className="main-title-information">
                    <b className="main-title-information-1">Category Name</b>
                </div>
                <hr />
            </div>
        )
    }
}

export default MainTitle;
