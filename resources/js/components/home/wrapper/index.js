import React from 'react';
import './style.scss';

import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap';

class Wrapper extends React.Component {
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
                            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                                <ToggleButton id="tbg-radio-1" value={1}>
                                    Recommended
                                </ToggleButton>
                                <ToggleButton id="tbg-radio-2" value={2}>
                                    Popular
                                </ToggleButton>
                            </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-home-list mx-5">
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
                </div>
            </div>
        )
    }
}

export default Wrapper;
