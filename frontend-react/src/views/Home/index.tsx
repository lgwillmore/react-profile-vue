import React, {Component} from "react";
import PageTemplate from "../../components/PageTemplate";
import {Col, Row} from "react-bootstrap";

export default class Home extends Component {

    render() {
        return (
            <PageTemplate
                title="Home"
            >
                <Row>
                    <Col className="d-flex flex-row">
                        <b className="ml-auto mr-auto">Welcome to the profile app.</b>
                    </Col>
                </Row>
            </PageTemplate>
        );
    }

}