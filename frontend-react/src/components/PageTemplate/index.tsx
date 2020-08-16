import React, {Component} from "react";
import {Col, Container, Row} from "react-bootstrap";

interface PageTemplateProps {
    title: string
}

export default class PageTemplate extends Component<PageTemplateProps> {

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={{span: 8, offset: 2}} className="d-flex flex-row">
                        <h2 className="ml-auto mr-auto">{this.props.title}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={{span: 8, offset: 2}}>
                        {this.props.children}
                    </Col>
                </Row>
            </Container>
        )
            ;
    }

}