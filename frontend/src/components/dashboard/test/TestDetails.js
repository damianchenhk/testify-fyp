import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Table, Container } from "react-bootstrap";
import { BsBarChartLine } from "react-icons/bs";
import { MdOutlineFeedback } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import FeedbackList from "../feedback/FeedbackList";
import "../../../App.css";

const TestDetails = ({ auth }) => {

    const { id } = useParams()

    const [test, setTest] = useState({});
    const [reports, setReports] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        axios
            .get('/api/tests/'+id)
            .then(res => {
                setTest(res.data)
                let course_id = res.data.course_id
                axios
                    .post('/api/reports/studentTestReports/', {test_id: id})
                    .then(res => {
                        setReports(res.data)
                        axios
                            .post('/api/reports/getCourseStudentsCount/', {course_id: course_id})
                            .then(res => {
                                setStudentCount(res.data)
                                axios
                                    .post('/api/feedback/getTestFeedback/', {test_id: id})
                                    .then(res => {
                                        setFeedbacks(res.data)
                                    })
                                    .catch(err => {
                                        console.log("Error from getTestFeedback" + err);
                                    })
                            })
                            .catch(err => {
                                console.log("Error from getCourseStudentsCount" + err);
                            })
                    })
                    .catch(err => {
                        console.log("Error from studentTestReports: " + err);
                    })
            })
            .catch(err => {
                console.log("Error from TestDetails");
            })
    }, [])

    const testSummary = () => {
        if(reports.length){
            let testBreakdown = [];
            let answer = '';
            for(let questionIndex = 0; questionIndex < test.questions?.length; questionIndex++){
                switch(test.answers[questionIndex]){
                    case 'A':
                        answer = test.options[questionIndex + (questionIndex * 2)]
                        break;
                    case 'B': 
                        answer = test.options[questionIndex + (questionIndex * 2) + 1]
                        break;
                    case 'C': 
                        answer = test.options[questionIndex + (questionIndex * 2) + 2]
                        break;
                    default:
                        answer = ''
                        break;
                }
                testBreakdown.push({correct: [], wrong: [], question: test.questions[questionIndex], answer: answer})
                for(let reportIndex = 0; reportIndex < reports?.length; reportIndex++){
                    let testResult = reports[reportIndex]?.tests_taken.filter(report => report.test_id.includes(id))[0]
                    if(testResult?.result[questionIndex] === 0){
                        testBreakdown[questionIndex].wrong.push(reports[reportIndex].student_name)
                    } else {
                        testBreakdown[questionIndex].correct.push(reports[reportIndex].student_name)
                    }
                }
            }
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center', width:'5%'}}>Question No.</th>
                            <th style={{textAlign:'center'}}>Question</th>
                            <th style={{textAlign:'center'}}>Answer</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. Students Correct</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. Students Wrong</th>
                            <th style={{textAlign:'center', width:'10%'}}>% of Students Correct</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testBreakdown.map((test, index) => (
                            <tr key={index}>
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6', borderLeft:'none'}}>{index + 1}</td>
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{test.question}</td>
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{test.answer}</td>
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{test.correct.length}</td>
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{test.wrong.length}</td>
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6', borderRight:'none'}}>{((test.correct.length / reports.length) * 100).toFixed(0)}%</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        }else{
            return(
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center', width:'5%'}}>Question No.</th>
                            <th style={{textAlign:'center'}}>Question</th>
                            <th style={{textAlign:'center'}}>Answer</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. Students Correct</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. Students Wrong</th>
                            <th style={{textAlign:'center', width:'10%'}}>% of Students Correct</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={0}>
                            <td colSpan={6} style={{textAlign:'center', border:'solid 1px #dee2e6', borderLeft:'none', borderRight:'none'}}>No students have attempted your test</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    const testStats = () => {
        if(feedbacks.length){
            let effective = 0;
            let tempDifficulty = 0;
            let popularity = 0;
            let difficulty = "";
            for(let feedbackIndex = 0; feedbackIndex < feedbacks?.length; feedbackIndex++){
                effective += Number(feedbacks[feedbackIndex].feedback_scores[0]);
                tempDifficulty += Number(feedbacks[feedbackIndex].feedback_scores[1]);
                popularity += Number(feedbacks[feedbackIndex].feedback_scores[2]);
            }

            if(tempDifficulty / reports?.length < 2){
                difficulty = "Too Difficult"
            } else if(tempDifficulty / reports?.length < 3){
                difficulty = "Difficult"
            } else if(tempDifficulty / reports?.length < 4){
                difficulty = "Just Right"
            } else if(tempDifficulty / reports?.length < 5){
                difficulty = "Easy"
            } else{
                difficulty = "Too Easy"
            }

            return(
                <>
                    <div className="test-stats">
                        <div className="test-checked">
                            <h6 className="test-checked-color"><strong>No. Students Checked</strong></h6>
                        </div>
                        <h5 className="test-checked-color"><strong>{test.tester_id?.length}</strong></h5>
                        <div className="test-attempt">
                            <h6 className="test-attempt-color"><strong>No. Students Attempted</strong></h6>
                        </div>
                        <h5 className="test-attempt-color"><strong>{reports?.length}</strong></h5>
                        <div className="test-effective">
                            <h6 className="test-effective-color"><strong>Test Effectiveness</strong></h6>
                        </div>
                        <h5 className="test-effective-color"><strong>{((effective / reports?.length) / 6 * 100).toFixed(0)}%</strong></h5>
                        <div className="test-diff">
                            <h6 className="test-diff-color"><strong>Test Difficulty</strong></h6>
                        </div>
                        <h5 className="test-diff-color"><strong>{difficulty}</strong></h5>
                        <div className="test-pop">
                            <h6 className="test-pop-color"><strong>Test Popularity</strong></h6>
                        </div>
                        <h5 className="test-pop-color"><strong>{(((popularity / reports?.length) / 6 * 50) + ((reports?.length / (studentCount - 1)) * 50)).toFixed(0)}%</strong></h5>
                    </div>
                </>
            )
        } else {
            return(
                <>
                    <div className="test-stats">
                        <div className="test-checked">
                            <h6 className="test-checked-color"><strong>No. Students Checked</strong></h6>
                        </div>
                        <h5 className="test-checked-color"><strong>-</strong></h5>
                        <div className="test-attempt">
                            <h6 className="test-attempt-color"><strong>No. Students Attempted</strong></h6>
                        </div>
                        <h5 className="test-attempt-color"><strong>-</strong></h5>
                        <div className="test-effective">
                            <h6 className="test-effective-color"><strong>Test Effectiveness</strong></h6>
                        </div>
                        <h5 className="test-effective-color"><strong>-</strong></h5>
                        <div className="test-diff">
                            <h6 className="test-diff-color"><strong>Test Difficulty</strong></h6>
                        </div>
                        <h5 className="test-diff-color"><strong>-</strong></h5>
                        <div className="test-pop">
                            <h6 className="test-pop-color"><strong>Test Popularity</strong></h6>
                        </div>
                        <h5 className="test-pop-color"><strong>-</strong></h5>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className="web-page">
                <Col>
                    <Sidebar/>
                </Col>
                <Col className="dashboard test-details">
                    <br></br>
                    <h3>{test.test_name}</h3>
                    <h6>{test.test_description}</h6>
                    <Row>
                        <Container className="dash-cards" style={{width:'90%'}}>
                            <br></br>
                            <h4><BsBarChartLine style={{marginBottom:'10px'}}/> Test Statistics</h4>
                            <hr></hr>
                            {testStats()}
                            <br></br>
                        </Container>
                    </Row>
                    <Row>
                        <Container className="dash-cards" style={{width:'90%'}}>
                            <br></br>
                            <h4><BsBarChartLine style={{marginBottom:'5px'}}/> Question Statistics</h4>
                            {testSummary()}
                            <br></br>
                        </Container>
                    </Row>
                    <Row>
                        <Container className="dash-cards" style={{width:'90%'}}>
                            <br></br>
                            <h4><MdOutlineFeedback style={{marginBottom:'5px'}}/> Feedback</h4>
                            <FeedbackList feedbacks={feedbacks}/>
                        </Container>
                    </Row>
                </Col>
            </div>
        </>
    );
}

TestDetails.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(TestDetails);