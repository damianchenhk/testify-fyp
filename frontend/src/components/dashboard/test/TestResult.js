import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Container, Form } from "react-bootstrap";

import Sidebar from "../../layout/Sidebar";
import ViewTestQuestions from "../test/ViewTestQuestions";
import "../../../App.css";

const TestResult = (props) => {

    const test = props.location.state.test;
    const answer = props.location.state.answer;
    var score = 0;
    
    for(let i = 0; i < props.location.state.score.length; i++){
        score = score + props.location.state.score[i];
    }

    let questionList;
    questionList = test.questions.map((question, k) =>
      <ViewTestQuestions
        question={question}
        options={test.options}
        answer={test.answers}
        answer_selected={answer}
        key={k}
        indexValue={k}/>
    );

    return (
        <>
            <div className="web-page">
                <Col xs={2}>
                    <Sidebar/>
                </Col>
                <Col xs={10} className="align-items-center dashboard">
                    <Container>
                        <br></br>
                        <h3>You scored {score}/{answer.length}</h3>
                        <br></br>
                        {questionList}
                        <Link
                            to={{
                            pathname: `/feedback/${test._id}`,
                                state: {course_id: test.course_id}
                            }}
                            className="btn btn-large waves-effect waves-light accent-3">
                            Provide Feedback
                        </Link>
                    </Container>
                </Col>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(TestResult);