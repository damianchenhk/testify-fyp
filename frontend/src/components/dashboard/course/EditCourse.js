import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, FloatingLabel, Form, Button, Container } from "react-bootstrap";
import { BsPencil } from "react-icons/bs";
import axios from 'axios';

import Sidebar from "../../layout/Sidebar";
import AddLesson from "./AddLesson";
import "../../../App.css";

class EditCourse extends Component {

    constructor(props) {
        super(props);
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.state = {
            inputList: [],
            course_name: '',
            course_description: '',
            lesson_names: [],
            lesson_urls: [],
            lesson_descriptions: [],
            lesson_weightage: [],
            exam_weightage: '',
            participation_weightage: '',
            error: '',
            error_view: false
        };
    }

    componentDidMount() {
        axios
            .get('/api/courses/'+this.props.match.params.id)
            .then(res => {
                this.setState({course_name: res.data.course_name});
                this.setState({course_description: res.data.course_description});
                this.setState({lesson_names: res.data.lesson_names});
                this.setState({lesson_descriptions: res.data.lesson_descriptions});
                this.setState({lesson_weightage: res.data.lesson_weightage});
                this.setState({exam_weightage: res.data.exam_weightage});
                this.setState({participation_weightage: res.data.participation_weightage});
                this.setState({lesson_urls: res.data.lesson_urls});
                this.setState({inputList: res.data.lesson_names.map((lesson, k) => 
                    <AddLesson 
                        onChange={(value, name) => {this.setNameState(value, name, k)}}
                        key={k}
                        indexValue={k}
                        lesson_name={lesson}
                        lesson_description={res.data.lesson_descriptions[k]}
                        lesson_weightage={res.data.lesson_weightage[k]}
                        lesson_url={res.data.lesson_urls[k]}
                    />
                )});
            })
            .catch(err => {
                console.log("Error from courses");
            })
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            course_name: this.state.course_name,
            course_description: this.state.course_description,
            lesson_names: this.state.lesson_names,
            lesson_urls: this.state.lesson_urls,
            lesson_descriptions: this.state.lesson_descriptions,
            lesson_weightage: this.state.lesson_weightage,
            exam_weightage: this.state.exam_weightage,
            participation_weightage: this.state.participation_weightage
        };

        let totalLessonWeightage = 0;

        for(let lessonIndex = 0; lessonIndex < this.state.lesson_weightage.length; lessonIndex++){
            totalLessonWeightage += Number(this.state.lesson_weightage[lessonIndex]);
        }

        if(!this.state.inputList.length){
            this.setState({error: 'You have not added any lessons!'});
            this.setState({error_view: true});
        }else if(totalLessonWeightage !== 100){
            console.log(totalLessonWeightage)
            this.setState({error: 'The total lesson weightage must add up to 100!'});
            this.setState({error_view: true});
        }else if(this.state.participation_weightage + this.state.exam_weightage !== 100){
            console.log(totalLessonWeightage)
            this.setState({error: 'The exam weightage and participation weightage must add up to 100!'});
            this.setState({error_view: true});
        }else {
            axios
                .put('/api/courses/'+this.props.match.params.id, data)
                .then(res => {
                    this.setState({course_name: ''});
                    this.setState({course_description: ''});
                    this.setState({lesson_names: []});
                    this.setState({lesson_descriptions: []});
                    this.setState({lesson_weightage: []});
                    this.setState({exam_weightage: ''});
                    this.setState({participation_weightage: ''});
                    this.setState({lesson_urls: []});

                    this.props.history.push('/coursereport/'+this.props.match.params.id);
                })
                .catch(err => {
                    console.log("Error in AddCourse!");
                })
        }
    }

    setNameState = (value, name, index) => {
        switch(name){
            case 'lesson_names':{
                let items = [...this.state.lesson_names];
                let item = {...items[index]};
                item.lesson_names = value;
                items[index] = item.lesson_names;
                this.setState({lesson_names: items})
                break;
            }
            case 'lesson_descriptions':{
                let items = [...this.state.lesson_descriptions];
                let item = {...items[index]};
                item.lesson_descriptions = value;
                items[index] = item.lesson_descriptions;
                this.setState({lesson_descriptions: items})
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

    onAddBtnClick = (event) => {
        const lessonList = this.state.inputList;
        this.setState({error_view: false});
        this.setState({inputList: lessonList.concat(<AddLesson onChange={(value, name) => {this.setNameState(value, name, lessonList.length)}} key={lessonList.length} indexValue={lessonList.length}/>)})
    }
    render() {

        return (
            <>
                <div className="web-page">
                    <Col>
                        <Sidebar/>
                    </Col>
                    <Col className="dashboard">
                        <div className="hero">
                            <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/courseHero.png"/>
                            <h3 className="hero-text"><BsPencil style={{marginBottom:'10px', marginRight:'10px'}}/>Edit Courses</h3>
                        </div>
                        <Container className="dash-cards" style={{width:'80%'}}>
                            <br></br>
                            {this.state.error_view && 
                                <>
                                    <h6 className="error-message">{this.state.error}</h6>
                                    <br></br>
                                </>
                            }
                            <Form onSubmit={this.onSubmit}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Course Title"
                                    className="mb-3"
                                    style={{
                                        width: '90%',
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
                                        onChange={e => this.setState({course_name: e.target.value})}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="Description"
                                    style={{
                                        width: '90%',
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
                                        onChange={e => this.setState({course_description: e.target.value})}
                                        required
                                    />
                                </FloatingLabel>
                                {this.state.inputList}
                                <Button className="btn waves-effect waves-light accent-3 outline-btn" onClick={this.onAddBtnClick} style={{marginBottom: '30px'}}>
                                    Add Lesson
                                </Button>
                                <hr></hr>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Exam Weightage"
                                    className="mb-3"
                                    style={{
                                        width: '90%',
                                        margin: 'auto'
                                    }}
                                >
                                    <Form.Control
                                        type="number"
                                        name="exam_weightage"
                                        placeholder="Exam Weightage"
                                        style={{
                                            marginBottom: '30px'
                                        }}
                                        value={this.state.exam_weightage}
                                        onChange={e => this.setState({exam_weightage: e.target.value})}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Participation Weightage"
                                    className="mb-3"
                                    style={{
                                        width: '90%',
                                        margin: 'auto'
                                    }}
                                >
                                    <Form.Control
                                        type="number"
                                        name="participation_weightage"
                                        placeholder="Participation Weightage"
                                        style={{
                                            marginBottom: '30px'
                                        }}
                                        value={this.state.participation_weightage}
                                        onChange={e => this.setState({participation_weightage: e.target.value})}
                                        required
                                    />
                                </FloatingLabel>
                                <Button className="btn btn-large waves-effect waves-light accent-3" type="submit" style={{marginBottom: '30px'}}>
                                    Submit
                                </Button>
                            </Form>
                        </Container>
                    </Col>
                </div>
            </>
        )
    }
}

EditCourse.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(EditCourse);