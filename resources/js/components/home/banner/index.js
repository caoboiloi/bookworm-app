import React from 'react';
import './style.scss';
import './responsive.scss';

import {Carousel} from 'react-bootstrap';

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,  //index which u want to display first
            nextIcon: <i className="fa fa-caret-right"></i>,
            prevIcon: <i className="fa fa-caret-left"></i>
        }
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
                    <Carousel.Item>
                        <div className="mx-6 mt-4">
                            <div className="row">
                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <img className="card-img-top" src="/assets/bookcover/book1.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">Book title</h5>
                                            <p className="card-text">
                                                Author name
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">Price</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <img className="card-img-top" src="/assets/bookcover/book2.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">Book title</h5>
                                            <p className="card-text">
                                                Author name
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">Price</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <img className="card-img-top" src="/assets/bookcover/book3.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">Book title</h5>
                                            <p className="card-text">
                                                Author name
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">Price</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <img className="card-img-top" src="/assets/bookcover/book4.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">Book title</h5>
                                            <p className="card-text">
                                                Author name
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">Price</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="mx-6 mt-4">
                            <div className="row">
                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <img className="card-img-top" src="/assets/bookcover/book5.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">Book title</h5>
                                            <p className="card-text">
                                                Author name
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">Price</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <img className="card-img-top" src="/assets/bookcover/book6.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">Book title</h5>
                                            <p className="card-text">
                                                Author name
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">Price</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <img className="card-img-top" src="/assets/bookcover/book7.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">Book title</h5>
                                            <p className="card-text">
                                                Author name
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">Price</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-3 col-md-6 col-sm-12 mb-4">
                                    <div className="card">
                                        <img className="card-img-top" src="/assets/bookcover/book8.jpg" alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">Book title</h5>
                                            <p className="card-text">
                                                Author name
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <small className="text-muted">Price</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

export default Banner;
