import React from 'react';
import './style.scss';

import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import {getRecommendLimit, getPopularLimit} from '../../../utils/httpHelper';

import { chunk } from 'lodash';

import BookCardRow from '../../book';

//Import to connect react-redux
import { connect } from 'react-redux';
//Import action to use dispatch
import { actNewRecommend, actNewPopular } from '../../../actions/index';

const mapDispatchToProps = dispatch => {
    return {
        addRecommend: content => dispatch(actNewRecommend(content)),
        addPopular: content => dispatch(actNewPopular(content))
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        filter: state.filter,
    }
}

class Wrapper extends React.Component {

    state = {
        books: [],
        isClicked: 'recommend'
    };

    componentDidMount() {
        this.fetchBookRecommend();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    fetchBookRecommend() {
        if (this.props.filter.recommend != undefined) {
            console.log('check true recommend\n-------------')
            this.setState({
                books: this.props.filter.recommend
            })
        }
        else {
            console.log('check false recommend\n-------------')
            getRecommendLimit()
            .then((response) => {
                var data = response.data.data;
                this.props.addRecommend(data);
                this.setState({
                    books: response.data.data
                });
            })
            .catch((error) => console.log(error));
        }
    }

    fetchBookPopular() {
        if (this.props.filter.popular != undefined) {
            console.log('check true popular\n-------------')
            this.setState({
                books: this.props.filter.popular
            })
        }
        else {
            console.log('check false popular\n-------------')
            getPopularLimit()
            .then((response) => {
                var data = response.data.data;
                this.props.addPopular(data);
                this.setState({
                    books: response.data.data
                });
            })
            .catch((error) => console.log(error));
        }
    }

    dataBindingGrid() {
        const rows = chunk(this.state.books, 4);
        return rows.map((arrayBook, index) =>{
            return (
                <div className="row" key={index}>
                    <BookCardRow books = {arrayBook} />
                </div>
            );
        })
    }

    handleSelectChange(event) {
        var val = event;
        if (val == 'popular') {
            this.fetchBookPopular();
        }
        else {
            this.fetchBookRecommend();
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="container-fluid select-home-bar mb-4">
                    <div className="row">
                        <div className="col-lg-12">
                            <h3 className="text-center mt-5">Featured Books</h3>
                        </div>
                        <div className="col-lg-12">
                            <div className="text-center">
                            <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.isClicked} onChange={this.handleSelectChange.bind(this)}>
                                <ToggleButton id="tbg-radio-1" value='recommend' >
                                    Recommended
                                </ToggleButton>
                                <ToggleButton id="tbg-radio-2" value='popular' >
                                    Popular
                                </ToggleButton>
                            </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-home-list mx-5">
                    <div className="mx-6 mt-4">
                        {this.dataBindingGrid()}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper)
