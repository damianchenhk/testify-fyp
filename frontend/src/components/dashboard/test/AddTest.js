import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, FloatingLabel, Form, Button } from "react-bootstrap";
import axios from 'axios';

import Sidebar from "../../layout/Sidebar";
import AddQuestion from "./AddQuestion";

class AddTest extends Component {

    constructor(props) {
        super(props);
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.state = {
            inputList: [],
            creator_id: this.props.auth.user.id,
            course_id: this.props.match.params.id, 
            test_name: '',
            test_description: '',
            questions: [],
            options: [],
            answers: [],
            concept_tested: [],
            tester_id: [],
            students_completed_id: [],
            student_scores: [],
            course: {}
        };
    }

    componentDidMount() {
        //console.log("Print id: " + this.props.match.params.id);
        axios
            .get('/api/courses/'+this.props.match.params.id)
            .then(res => {
            // console.log("Print-showBookDetails-API-response: " + res.data);
                this.setState({
                    course: res.data
                })
            })
            .catch(err => {
                console.log("Error from ViewCourse");
            })
        };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            creator_id: this.state.creator_id,
            course_id: this.state.course_id, 
            test_name: this.state.test_name,
            test_description: this.state.test_description,
            questions: this.state.questions,
            options: this.state.options,
            answers: this.state.answers,
            concept_tested: this.state.concept_tested,
            tester_id: this.state.tester_id,
            students_completed_id: this.state.students_completed_id,
            student_scores: this.state.student_scores,
        };

        axios
            .post('/api/tests/', data)
            .then(res => {
                this.setState({
                    inputList: [],
                    creator_id: this.props.auth.user.id,
                    course_id: this.props.match.params.id, 
                    test_name: '',
                    test_description: '',
                    questions: [],
                    options: [],
                    answers: [],
                    concept_tested: [],
                    tester_id: [],
                    students_completed_id: [],
                    student_scores: [],
                })
                this.props.history.push('/dashboard');
            })
            .catch(err => {
                console.log("Error in AddTest!");
            })
    };


    onAddBtnClick(event) {
        const inputList = this.state.inputList;
        this.setState({
            inputList: inputList.concat(
                <AddQuestion
                    onChange={(value, name) => {this.setNameState(value, name, inputList.length)}}
                    key={inputList.length}
                    indexValue={inputList.length} 
                    courseLessons={this.state.course.lesson_names}
                />)
        });
    }

    setNameState(value, name, index){
        switch(name){
            case 'questions':{
                let items = [...this.state.questions];
                let item = {...items[index]};
                item.questions = value;
                items[index] = item.questions;

                this.setState({questions: items});
                break;
            }
            case 'options-a':{
                let items = [...this.state.options];
                let item = {...items[index + (index * 2)]};
                item.options = value;
                items[index + (index * 2)] = item.options;

                this.setState({options: items});
                break;
            }
            case 'options-b':{
                let items = [...this.state.options];
                let item = {...items[index + (index * 2) + 1]};
                item.options = value;
                items[index + (index * 2) + 1] = item.options;

                this.setState({options: items});
                break;
            }
            case 'options-c':{
                let items = [...this.state.options];
                let item = {...items[index + (index * 2) + 2]};
                item.options = value;
                items[index + (index * 2) + 2] = item.options;

                this.setState({options: items});
                break;
            }
            case 'answer-options':{
                let items = [...this.state.answers];
                let item = {...items[index]};
                item.answers = value;
                items[index] = item.answers;

                this.setState({answers: items});
                break;
            }
            case 'concept_tested':{
                let items = [...this.state.concept_tested];
                let item = {...items[index]};
                item.concept_tested = value;
                items[index] = item.concept_tested;

                this.setState({concept_tested: items});
                break;
            }
        }
    }

    render() {
        const { user } = this.props.auth;

        return (
            <>
                <div className="row">
                    <Col xs={2}>
                        <Sidebar/>
                    </Col>
                    <Col xs={10} className="dashboard">
                        <h4><b>Add Test Here</b></h4>
                        <Form onSubmit={this.onSubmit}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Test Title"
                                className="mb-3"
                                style={{
                                    width: '60%',
                                    margin: 'auto'
                                }}
                            >
                                <Form.Control
                                    type="text"
                                    name="test_name"
                                    placeholder="My Test Title"
                                    style={{
                                        marginBottom: '30px'
                                    }}
                                    value={this.state.test_name}
                                    onChange={this.onChange}
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label="Description"
                                style={{
                                    width: '60%',
                                    margin: 'auto'
                                }}
                            >
                                <Form.Control
                                as="textarea"
                                name="test_description"
                                placeholder="Leave a description here"
                                style={{ 
                                    height: '100px',
                                    marginBottom: '30px'
                                }}
                                value={this.state.test_description}
                                onChange={this.onChange}
                                />
                            </FloatingLabel>
                            {this.state.inputList}
                            <Button type="button" onClick={this.onAddBtnClick} style={{marginBottom: '30px'}}>
                                Add Question
                            </Button>
                            <hr></hr>
                            <Button variant="primary" type="submit" style={{marginBottom: '30px'}}>
                                Submit
                            </Button>
                        </Form>
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
    mapStateToProps,
)(AddTest);