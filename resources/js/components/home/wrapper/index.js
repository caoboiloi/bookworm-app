import React from 'react';
import './style.scss';

import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap';
import {getRecommendLimit, getPopularLimit} from '../../../utils/httpHelper';

import { chunk } from 'lodash';

import BookCardRow from '../../book';

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
        getRecommendLimit()
        .then((response) => {
            this.setState({
                books: response.data.data
            });
        })
        .catch((error) => console.log(error));
    }

    fetchBookPopular() {
        getPopularLimit()
        .then((response) => {
            this.setState({
                books: response.data.data
            });
        })
        .catch((error) => console.log(error));
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

export default Wrapper;
