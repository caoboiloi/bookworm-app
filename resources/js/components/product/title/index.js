import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        search: state.search
    }
}

class MainTitle extends React.Component {
// ERROR
    render() {
        return (
            <div className="main-title mx-5">
                <div className="main-title-information">
                    <b className="main-title-information-1">Books</b>
                    {/* {this.props.search.title.main.length > 0 ? (<span className="ml-3">(Filtered by {this.props.search.title.main} )</span>) : (<span></span>)} */}
                    <span className="ml-3">(Filtered by {this.props.search.title.main} )</span>
                </div>
                <hr />
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(MainTitle);
