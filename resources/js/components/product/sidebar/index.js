import React from 'react';
import { Accordion,Card,Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import "./style.scss";

import { getSidebarFilter } from '../../../utils/httpHelper';
import { getQueryVariable } from '../../../utils/queryVariable';

import { actAddNewDataSidebar, actAddNewFilterQueryParam } from '../../../actions';

import qs from 'query-string';

import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        pushDataSidebar: content => dispatch(actAddNewDataSidebar(content)),
        pushQueryFilter: content => dispatch(actAddNewFilterQueryParam(content))
    };
};

const mapStateToProps = (state, ownProps) => {
    return {
        search: state.search
    }
}

class LeftSidebar extends React.Component {
    state = {
        categories: this.props.search.sidebar.categories,
        authors: this.props.search.sidebar.authors,
        stars: this.props.search.sidebar.stars,
        mainTitle: this.props.search.title.main,
        filter: this.props.search.filterQueryParam
    };

    componentDidMount() {
        this.fetchDataFilter();
    }

    fetchDataFilter() {
        if (this.props.search.sidebar.categories.length == 0) {
            console.log('check false data sidebar\n-------------')
            getSidebarFilter()
            .then((response) => {
                var data = response.data;
                this.props.pushDataSidebar({
                    categories: data.categories,
                    authors: data.authors,
                    stars: data.star
                });
                this.setState({
                    categories: data.categories,
                    authors: data.authors,
                    stars: data.star
                });
            })
            .catch((error) => console.log(error));
        }
        else {
            console.log('check true data sidebar\n-------------')
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        // Error, re-render the sidebar when start app to this routes and switch the other routes, this routes is re-rendered
        // if (nextState.filter != undefined) {
        //     if (nextState.mainTitle != this.state.mainTitle) {
        //         this.props.pushQueryFilter({
        //             filter: nextState.filter,
        //             titleMain: nextState.mainTitle
        //         })
        //         return true;
        //     }
        //     return false;
        // }

        // Temporary
        this.props.pushQueryFilter({
            filter: nextState.filter,
            titleMain: nextState.mainTitle
        })
        return true;
    }

    handleQuerySearch(query) {
        const queryParam = getQueryVariable(this.props);
        const newQueryParam = {
           ...queryParam,
           ...query
        }
        return newQueryParam;
    }

    render() {
        return (
            <div className="col-lg-2 col-md-3 col-sm-12 px-0 filter-left-sidebar">
                <div className="row mt-4 mb-3">
                    <div className="col-lg-12">
                        <b>Filter By</b>
                    </div>
                </div>
                <div className="row filter-data-sidebar">
                    <div className="col-lg-12">
                    <Accordion defaultActiveKey="0" className="mb-4">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <h4>Category</h4>
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body className="px-0 my-1">
                                    {this.state.categories.length != 0 ?
                                        this.state.categories.map((category, index) => (
                                            <Dropdown.Item eventKey={index} key={category.id} as={Link} to={{
                                                pathname: '/product/filter',
                                                search: qs.stringify(this.handleQuerySearch({
                                                        filter: 'category',
                                                        id: category.id
                                                    }))
                                                }} onClick={() => this.setState({
                                                    mainTitle: `Category: ${category.category_name}`,
                                                    filter: {category: category.id}
                                                })}>
                                                    {category.category_name}
                                            </Dropdown.Item>
                                        )) : (<span></span>)
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Accordion defaultActiveKey="1" className="mb-4">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                <h4>Author</h4>
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="1">
                                <Card.Body className="px-0 my-1">
                                    {this.state.authors.length != 0 ?
                                        this.state.authors.map((author, index) => (
                                            <Dropdown.Item eventKey={index} key={author.id} as={Link} to={{
                                                pathname: '/product/filter',
                                                search: qs.stringify(this.handleQuerySearch({
                                                        filter: 'author',
                                                        id: author.id
                                                    }))
                                                }} onClick={() => this.setState({
                                                    mainTitle: `Author: ${author.author_name}`,
                                                    filter: {author: author.id}
                                                })}>
                                                    {author.author_name}
                                            </Dropdown.Item>
                                        )) : (<span></span>)
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Accordion defaultActiveKey="2" className="mb-4">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                <h4>Rating Review</h4>
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="2">
                                <Card.Body className="px-0 my-1">
                                    {this.state.stars.length != 0 ?
                                        this.state.stars.map((star, index) => (
                                            <Dropdown.Item eventKey={index} key={star} as={Link} to={{
                                                pathname: '/product/filter',
                                                search: qs.stringify(this.handleQuerySearch({
                                                        filter: 'star',
                                                        id: star
                                                    }))
                                                }} onClick={() => this.setState({
                                                    mainTitle: `Star: ${star} Star`,
                                                    filter: {star: star}
                                                })}>
                                                    {star} Star
                                            </Dropdown.Item>
                                        )) : (<span></span>)
                                    }
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    </div>
                </div>
            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftSidebar));
