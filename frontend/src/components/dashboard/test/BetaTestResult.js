import React, { useState } from "react";
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

    const [percentage, setPercentage] = useState((score / answer.length) * 100);

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
                <Col className="dashboard">
                    <br></br>
                    <h3 style={{color:'#1d8177'}}>{test.test_name}</h3>
                    <Container className="dash-cards" style={{width:'80%'}}>
                        <div style={{margin:'20px'}}>
                            <h4 className={percentage > 66 ? "test-result-green" : percentage > 33 ? "test-result-yellow" : "test-result-red"}>You scored {score}/{answer.length}!</h4>
                            <br></br>
                            {questionList}
                            <hr></hr>
                            <Link
                                to={{
                                pathname: `/betafeedback/${test._id}`,
                                    state: {course_id: test.course_id, tester_id: test.tester_id}
                                }}
                                className="btn btn-large waves-effect waves-light accent-3">
                                Provide Feedback
                            </Link>
                        </div>
                    </Container>
                    <br></br>
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