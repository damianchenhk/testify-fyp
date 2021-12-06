import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Container, Form } from "react-bootstrap";
import axios from "axios";

import Sidebar from "../../layout/Sidebar";

class TestResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
          test: this.props.location.state.test,
          answer_selected: this.props.location.state.answer_selected,
          score: this.props.location.state.score
        };
      }

    render() {

        return (
            <>
                <Row>
                    <Col xs={2}>
                        <Sidebar/>
                    </Col>
                    <Col xs={10} className="align-items-center dashboard">
                        <Container>
                            <Form>
                                <h2>You scored {this.state.score}/{this.state.test.questions.length}</h2>
                                <br></br>
                                <Link
                                  to={{
                                    pathname: `/feedback/${this.state.test._id}`,
                                    state: {course_id: this.state.test.course_id}
                                  }}
                                  className="btn btn-large waves-effect waves-light hoverable accent-3">
                                  Provide Feedback
                                </Link>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(TestResult);