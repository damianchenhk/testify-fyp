import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, FloatingLabel, Form, Button } from "react-bootstrap";
import axios from 'axios';

import Sidebar from "../layout/Sidebar";
import AddLesson from "./AddLesson";

class AddCourse extends Component {

    constructor(props) {
        super(props);
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.state = {
            inputList: [],
            course_name: '',
            instructor_id: this.props.auth.user.id,
            course_description: '',
            lesson_names: [],
            lesson_urls: ["Example", "Test"],
            lesson_descriptions: [],
            lesson_weightage: [],
            exam_weightage: '',
            participation_weightage: ''
        };
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            course_name: this.state.course_name,
            instructor_id: this.state.instructor_id,
            course_description: this.state.course_description,
            lesson_names: this.state.lesson_names,
            lesson_urls: this.state.lesson_urls,
            lesson_descriptions: this.state.lesson_descriptions,
            lesson_weightage: this.state.lesson_weightage,
            exam_weightage: this.state.exam_weightage,
            participation_weightage: this.state.participation_weightage
        };

        axios
            .post('/api/courses/', data)
            .then(res => {
                this.setState({
                    course_name: '',
                    instructor_id: this.props.auth.user.id,
                    course_description: '',
                    lesson_names: [],
                    lesson_urls: ["Example", "Test"],
                    lesson_descriptions: [],
                    lesson_weightage: [],
                    exam_weightage: '',
                    participation_weightage: ''
                })
                this.props.history.push('/dashboard');
            })
            .catch(err => {
                console.log("Error in AddCourse!");
            })
    };

    setNameState(value, name, index){
        switch(name){
            case 'lesson_names':{
                let items = [...this.state.lesson_names];
                let item = {...items[index]};
                item.lesson_names = value;
                items[index] = item.lesson_names;

                this.setState({lesson_names: items});
                break;
            }
            case 'lesson_descriptions':{
                let items = [...this.state.lesson_descriptions];
                let item = {...items[index]};
                item.lesson_descriptions = value;
                items[index] = item.lesson_descriptions;

                this.setState({lesson_descriptions: items});
                break;
            }
            case 'lesson_weightage':{
                let items = [...this.state.lesson_weightage];
                let item = {...items[index]};
                item.lesson_weightage = value;
                items[index] = item.lesson_weightage;

                this.setState({lesson_weightage: items});
                break;
            }
            case 'lesson_urls':{
                let items = [...this.state.lesson_urls];
                let item = {...items[index]};
                item.lesson_urls = value;
                items[index] = item.lesson_urls;

                this.setState({lesson_urls: items});
                break;
            }
        }
    }

    onAddBtnClick(event) {
        const inputList = this.state.inputList;
        this.setState({
            inputList: inputList.concat(<AddLesson uploadPercentageChange={(value) => {this.uploadPercentageChange(value)}} onChange={(value, name) => {this.setNameState(value, name, inputList.length)}} key={inputList.length}/>)
        });
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
                        <h4><b>Add Courses Here</b></h4>
                        <Form onSubmit={this.onSubmit}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Course Title"
                                className="mb-3"
                                style={{
                                    width: '60%',
                                    margin: 'auto'
                                }}
                            >
                                <Form.Control
                                    type="text"
                                    name="course_name"
                                    placeholder="My Course Title"
                                    style={{
                                        marginBottom: '30px'
                                    }}
                                    value={this.state.course_name}
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
                                name="course_description"
                                placeholder="Leave a description here"
                                style={{ 
                                    height: '100px',
                                    marginBottom: '30px'
                                }}
                                value={this.state.course_description}
                                onChange={this.onChange}
                                />
                            </FloatingLabel>
                            {this.state.inputList}
                            <Button type="button" onClick={this.onAddBtnClick} style={{marginBottom: '30px'}}>
                                Add Lesson
                            </Button>
                            <hr></hr>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Exam Weightage"
                                className="mb-3"
                                style={{
                                    width: '60%',
                                    margin: 'auto'
                                }}
                            >
                                <Form.Control
                                    type="text"
                                    name="exam_weightage"
                                    placeholder="Exam Weightage"
                                    style={{
                                        marginBottom: '30px'
                                    }}
                                    value={this.state.exam_weightage}
                                    onChange={this.onChange}
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Participation Weightage"
                                className="mb-3"
                                style={{
                                    width: '60%',
                                    margin: 'auto'
                                }}
                            >
                                <Form.Control
                                    type="text"
                                    name="participation_weightage"
                                    placeholder="Participation Weightage"
                                    style={{
                                        marginBottom: '30px'
                                    }}
                                    value={this.state.participation_weightage}
                                    onChange={this.onChange}
                                />
                            </FloatingLabel>
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

AddCourse.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(AddCourse);