import React from 'react';
import './style.scss';

import BookCardRow from '../../book';

import {Carousel} from 'react-bootstrap';
import {getSaleLimit} from '../../../utils/httpHelper';

import { chunk } from 'lodash';

//Import to connect react-redux
import { connect } from 'react-redux';
//Import action to use dispatch
import { actNewBanner } from '../../../actions/index';

const mapDispatchToProps = dispatch => {
    return {
        addBanner: content => dispatch(actNewBanner(content))
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        banner: state.banner
    }
}

//Gán giá trị của state thành props


class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,  //index which u want to display first
            nextIcon: <i className="fa fa-caret-right"></i>,
            prevIcon: <i className="fa fa-caret-left"></i>,
            bannerBook: []
        }
    }

    componentDidMount() {
        this.fetchBookBanner();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.bannerBook.length != this.state.bannerBook.length;
    }

    fetchBookBanner() {
        getSaleLimit()
        .then((response) => {
            var data = response.data.data;
            // this.props.addBanner(data);
            this.setState({
                bannerBook: response.data.data
            });
        })
        .catch((error) => console.log(error));
    }

    dataBindingGrid() {
        const rows = chunk(this.state.bannerBook, 4);
        return rows.map((arrayBook, index) =>{
            return (
                <Carousel.Item key={index}>
                <div className="mx-6 mt-4">
                    <div className="row">
                        <BookCardRow books = {arrayBook} />
                    </div>
                </div>
                </Carousel.Item>
            );
        })
    }

    render() {
        return(
            <div className="banner mt-4">
                <div className="mx-5 mb-2">
                    <div className="row">
                        <div className="col-auto mr-auto my-auto">
                            <p className="h4"><b>On Sale</b></p>
                        </div>
                        <div className="col-auto my-auto">
                            <button type="button" className="btn btn-secondary btn-view-all">
                                View All <i className="fa fa-caret-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <Carousel className="mx-5"
                nextIcon={this.state.nextIcon}
                prevIcon={this.state.prevIcon}
                index={this.state.index}>
                    {this.dataBindingGrid()}
                </Carousel>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner)
