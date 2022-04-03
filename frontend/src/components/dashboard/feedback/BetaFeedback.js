import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Container, Form, Button, Table, FloatingLabel } from "react-bootstrap";
import { MdOutlineFeedback } from "react-icons/md"
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

class BetaFeedback extends Component {

    constructor(props) {
        super(props);
        this.state = {
            student_id: this.props.auth.user.id,
            course_id: this.props.location.state.course_id,
            test_id: this.props.match.params.id,
            tester_id: this.props.location.state.tester_id,
            tester_number: this.props.location.state.tester_id.length,
            feedback_scores: [],
            detailed_feedback: ''
        };
    }

    onChange = e => {
        switch(e.target.name){
            case 'detailed_feedback':
                this.setState({[e.target.name]: e.target.value});
                break;
            case 'q1-feedback':{
                let items = [...this.state.feedback_scores];
                let item = {...items[0]};
                item.feedback_scores = e.target.value;
                items[0] = item.feedback_scores;

                this.setState({feedback_scores: items});
                break;
            }
            case 'q2-feedback':{
                let items = [...this.state.feedback_scores];
                let item = {...items[1]};
                item.feedback_scores = e.target.value;
                items[1] = item.feedback_scores;

                this.setState({feedback_scores: items});
                break;
            }
            case 'q3-feedback':{
                let items = [...this.state.feedback_scores];
                let item = {...items[2]};
                item.feedback_scores = e.target.value;
                items[2] = item.feedback_scores;

                this.setState({feedback_scores: items});
                break;
            }
            case 'q5-feedback':{
                if(e.target.value === "agree"){
                    let items = [...this.state.tester_id];
                    let item = {...items[this.state.tester_number]};
                    item.tester_id = this.state.student_id;
                    items[this.state.tester_number] = item.tester_id;

                    this.setState({tester_id: items});
                    break;
                }else{
                    let items = [...this.state.tester_id];
                    delete items[this.state.tester_number];

                    this.setState({tester_id: items});
                    break;
                }
            }
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            student_id: this.state.student_id,
            course_id: this.state.course_id,
            test_id: this.state.test_id,
            feedback_scores: this.state.feedback_scores,
            detailed_feedback: this.state.detailed_feedback
        };

        axios
            .post('/api/feedback/', data)
            .then(res => {
                axios
                    .put('/api/tests/'+this.state.test_id, {tester_id: this.state.tester_id})
                    .then(res => {
                        this.setState({
                            student_id: this.props.auth.user.id,
                            course_id: this.props.location.state.course_id,
                            test_id: this.props.match.params.id,
                            feedback_scores: [],
                            detailed_feedback: ''
                        })
                        this.props.history.push('/dashboard');
                    })
                    .catch(err => {
                        console.log("Error in UpdateTests");
                    })
            })
            .catch(err => {
                console.log("Error in Feedback!");
            })
    };

    render() {

        return (
            <>
                <div className="web-page">
                    <Col>
                        <Sidebar/>
                    </Col>
                    <Col className="dashboard">
                        <div className="hero">
                            <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/feedbackHero.png"/>
                            <h3 className="hero-text"><MdOutlineFeedback style={{marginBottom:'5px'}}/> Feedback</h3>
                        </div>
                        <Container className="dash-cards" style={{width:'80%'}}>
                            <div style={{margin:'20px'}}>
                                <Form onSubmit={this.onSubmit}>
                                    <p
                                        style={{
                                            fontSize: '20px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        1.  The test was effective in testing the concepts taught in the course.
                                    </p>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th style={{textAlign: 'center', width: '16%'}}>Strongly Disagree</th>
                                                <th style={{textAlign: 'center', width: '16%'}}>Disagree</th>
                                                <th style={{textAlign: 'center', width: '16%'}}>Slightly Disagree</th>
                                                <th style={{textAlign: 'center', width: '16%'}}>Slightly Agree</th>
                                                <th style={{textAlign: 'center', width: '16%'}}>Agree</th>
                                                <th style={{textAlign: 'center', width: '16%'}}>Strongly Agree</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-1"
                                                        name="q1-feedback"
                                                        id="q1-feedback"
                                                        value="1"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-2"
                                                        name="q1-feedback"
                                                        id="q1-feedback"
                                                        value="2"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-3"
                                                        name="q1-feedback"
                                                        id="q1-feedback"
                                                        value="3"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-4"
                                                        name="q1-feedback"
                                                        id="q1-feedback"
                                                        value="4"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-5"
                                                        name="q1-feedback"
                                                        id="q1-feedback"
                                                        value="5"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-6"
                                                        name="q1-feedback"
                                                        id="q1-feedback"
                                                        value="6"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <br></br>
                                    <p
                                        style={{
                                            fontSize: '20px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        2.  How difficult was the test?
                                    </p>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th style={{textAlign: 'center', width: '20%'}}>Very Difficult</th>
                                                <th style={{textAlign: 'center', width: '20%'}}>Difficult</th>
                                                <th style={{textAlign: 'center', width: '20%'}}>Just Right</th>
                                                <th style={{textAlign: 'center', width: '20%'}}>Easy</th>
                                                <th style={{textAlign: 'center', width: '20%'}}>Very Easy</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-1"
                                                        name="q2-feedback"
                                                        id="q2-feedback"
                                                        value="1"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-2"
                                                        name="q2-feedback"
                                                        id="q2-feedback"
                                                        value="2"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-3"
                                                        name="q2-feedback"
                                                        id="q2-feedback"
                                                        value="3"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-4"
                                                        name="q2-feedback"
                                                        id="q2-feedback"
                                                        value="4"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-5"
                                                        name="q2-feedback"
                                                        id="q2-feedback"
                                                        value="5"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <br></br>
                                    <p
                                        style={{
                                            fontSize: '20px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        3.  I would recommend this test to my fellow students in the cohort.
                                    </p>
                                    <Table responsive>
                                        <thead>
                                            <tr>
                                                <th style={{textAlign: 'center', width: '16%'}}>Strongly Disagree</th>
                                                <th style={{textAlign: 'center', width: '16%'}}>Disagree</th>
                                                <th style={{textAlign: 'center', width: '16%'}}>Slightly Disagree</th>
                                                <th style={{textAlign: 'center', width: '16%'}}>Slightly Agree</th>
                                                <th style={{textAlign: 'center', width: '16%'}}>Agree</th>
                                                <th style={{textAlign: 'center', width: '16%'}}>Strongly Agree</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-1"
                                                        name="q3-feedback"
                                                        id="q3-feedback"
                                                        value="1"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-2"
                                                        name="q3-feedback"
                                                        id="q3-feedback"
                                                        value="2"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-3"
                                                        name="q3-feedback"
                                                        id="q3-feedback"
                                                        value="3"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-4"
                                                        name="q3-feedback"
                                                        id="q3-feedback"
                                                        value="4"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-5"
                                                        name="q3-feedback"
                                                        id="q3-feedback"
                                                        value="5"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                                <td>
                                                    <Form.Check
                                                        type="radio"
                                                        aria-label="answer-6"
                                                        name="q3-feedback"
                                                        id="q3-feedback"
                                                        value="6"
                                                        style={{
                                                            textAlign: 'center'
                                                        }}
                                                        onChange={this.onChange}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <br></br>
                                    <p
                                        style={{
                                            fontSize: '20px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        4.  Do you have anymore feedback for this test?
                                    </p>
                                    <FloatingLabel
                                        controlId="floatingTextarea"
                                        label="Feedback"
                                        style={{
                                            margin: 'auto'
                                        }}
                                    >
                                        <Form.Control
                                            as="textarea"
                                            name="detailed_feedback"
                                            placeholder="Leave a description here"
                                            style={{ 
                                                height: '100px',
                                                marginBottom: '30px'
                                            }}
                                            value={this.state.detailed_feedback}
                                            onChange={this.onChange}
                                        />
                                    </FloatingLabel>
                                    <p
                                        style={{
                                            fontSize: '20px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        5.  This test should be shared with my fellow students in the cohort.
                                    </p>
                                        <Form.Check
                                            type="radio"
                                            label="Agree"
                                            name="q5-feedback"
                                            id="q5-feedback"
                                            value="agree"
                                            style={{
                                                textAlign: 'left'
                                            }}
                                            onChange={this.onChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Disagree"
                                            name="q5-feedback"
                                            id="q5-feedback"
                                            value="disagree"
                                            style={{
                                                textAlign: 'left',
                                                marginBottom: '30px'
                                            }}
                                            onChange={this.onChange}
                                        />
                                        <hr></hr>
                                    <Button className="btn btn-large waves-effect waves-light accent-3" type="submit">Submit</Button>
                                </Form>
                            </div>
                        </Container>
                        <br></br>
                    </Col>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(BetaFeedback);