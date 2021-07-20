import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

const mapStateToProps = (state, ownProps) => {
    return {
        search: state.search
    }
}

class MainTitle extends React.Component {
// ERROR
    state = {
        mainTitle: this.props.search.mainTitle,
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.mainTitle != this.props.search.mainTitle) {
            this.setState({
                mainTitle: this.props.search.mainTitle
            })
        }
    }

    render() {
        return (
            <div className="main-title mx-5">
                <div className="main-title-information">
                    <b className="main-title-information-1">Books</b>
                    {this.state.mainTitle.length > 0 ? (<span className="ml-3">(Filtered by {this.state.mainTitle} )</span>) : (<span></span>)}
                </div>
                <hr />
            </div>
        )
    }
}

export default connect(mapStateToProps)(withRouter(MainTitle));
