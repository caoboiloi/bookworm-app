import React from 'react';

class MainTitle extends React.Component {
    render() {
        return (
            <div className="main-title mx-5">
                <div className="main-title-information">
                    <b className="main-title-information-1">Books</b>
                    <span className="ml-3">(Filtered by Category #1)</span>
                </div>
                <hr />
            </div>
        )
    }
}

export default MainTitle;
