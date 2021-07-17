import React from 'react';
import { Accordion,Card } from 'react-bootstrap';

class LeftSidebar extends React.Component {
    render() {
        return (
            <div className="col-lg-2 col-md-3 col-sm-12 px-0 filter-left-sidebar">
                <div className="row mt-4 mb-3">
                    <div className="col-lg-12">
                        <b>Filter By</b>
                    </div>
                </div>
                <div className="row filter-category-sidebar">
                    <div className="col-lg-12">
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                TAB 1
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0">
                                <Card.Body>This is first tab body</Card.Body>
                            </Accordion.Collapse>
                        </Card>

                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                TAB 2
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="1">
                                <Card.Body>This is second tab body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    </div>
                </div>
                <div className="row filter-author-sidebar">
                    <div className="col-lg-12">

                    </div>
                </div>
                <div className="row filter-rating-sidebar">
                    <div className="col-lg-12">

                    </div>
                </div>
            </div>

        )
    }
}

export default LeftSidebar;
