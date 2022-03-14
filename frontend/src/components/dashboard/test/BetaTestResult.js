import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Container, Form } from "react-bootstrap";

import Sidebar from "../../layout/Sidebar";
import ViewTestQuestions from "../test/ViewTestQuestions";
import "../../../App.css";

const BetaTestResult = (props) => {

    const test = props.location.state.test;
    const answer = props.location.state.answer;
    var score = 0;
    
    for(let i = 0; i < props.location.state.score.length; i++){
        if(props.location.state.score[i] !== 0){
            score = score + 1;
        }
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
                <Col>
                    <Sidebar/>
                </Col>
                <Col className="align-items-center dashboard">
                    <Container>
                        <br></br>
                        <h3>You scored {score}/{answer.length}</h3>
                        <br></br>
                        {questionList}
                        <Link
                            to={{
                            pathname: `/betafeedback/${test._id}`,
                                state: {course_id: test.course_id, tester_id: test.tester_id}
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
)(BetaTestResult);