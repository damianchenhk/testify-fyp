import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, FloatingLabel, Form, Button, Container } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import axios from 'axios';

import Sidebar from "../../layout/Sidebar";
import AddLesson from "./AddLesson";
import { useHistory } from "react-router-dom";
import "../../../App.css";

const AddCourse = ({ auth }) => {

    const [inputList, setInputList] = useState([]);
    const [course_name, setCourseName] = useState('');
    const [instructor_id, setInstructorId] = useState(auth.user.id);
    const [instructor_name, setInstructorName] = useState(auth.user.name);
    const [course_description, setCourseDescription] = useState('');
    const [lesson_names, setLessonNames] = useState([]);
    const [lesson_urls, setLessonURLs] = useState([]);
    const [lesson_descriptions, setLessonDescriptions] = useState([]);
    const [lesson_weightage, setLessonWeightage] = useState([]);
    const [exam_weightage, setExamWeightage] = useState('');
    const [participation_weightage, setParticipationWeightage] = useState('');
    const history = useHistory();
    const [error, setError] = useState('');
    const [errorView, setErrorView] = useState(false);

    const onSubmit = e => {
        e.preventDefault();

        const data = {
            course_name: course_name,
            instructor_id: instructor_id,
            instructor_name: instructor_name,
            course_description: course_description,
            lesson_names: lesson_names,
            lesson_urls: lesson_urls,
            lesson_descriptions: lesson_descriptions,
            lesson_weightage: lesson_weightage,
            exam_weightage: exam_weightage,
            participation_weightage: participation_weightage
        };

        let totalLessonWeightage = 0;

        for(let lessonIndex = 0; lessonIndex < lesson_weightage.length; lessonIndex++){
            totalLessonWeightage += Number(lesson_weightage[lessonIndex]);
        }

        if(!inputList.length){
            setError('You have not added any lessons!');
            setErrorView(true);
        }else if(totalLessonWeightage !== 100){
            console.log(totalLessonWeightage)
            setError('The total lesson weightage must add up to 100!');
            setErrorView(true);
        }else if(participation_weightage + exam_weightage !== 100){
            console.log(totalLessonWeightage)
            setError('The exam weightage and participation weightage must add up to 100!');
            setErrorView(true);
        }else {
            axios
                .post('/api/courses/', data)
                .then(res => {
                    setCourseName('')
                    setInstructorId(auth.user.id)
                    setInstructorName(auth.user.name)
                    setCourseDescription('')
                    setLessonNames([])
                    setLessonURLs([])
                    setLessonDescriptions([])
                    setLessonWeightage([])
                    setExamWeightage('')
                    setParticipationWeightage('')

                    history.push('/dashboard');
                })
                .catch(err => {
                    console.log("Error in AddCourse!");
                })
        }
    }

    const setNameState = (value, name, index) => {
        switch(name){
            case 'lesson_names':{
                let items = lesson_names;
                let item = {...items[index]};
                item.lesson_names = value;
                items[index] = item.lesson_names;
                setLessonNames(items)
                break;
            }
            case 'lesson_descriptions':{
                let items = lesson_descriptions;
                let item = {...items[index]};
                item.lesson_descriptions = value;
                items[index] = item.lesson_descriptions;
                setLessonDescriptions(items)
                break;
            }
            case 'lesson_weightage':{
                let items = lesson_weightage;
                let item = {...items[index]};
                item.lesson_weightage = value;
                items[index] = item.lesson_weightage;
                setLessonWeightage(items);
                break;
            }
            case 'lesson_urls':{
                let items = lesson_urls;
                let item = {...items[index]};
                item.lesson_urls = value;
                items[index] = item.lesson_urls;
                setLessonURLs(items);
                break;
            }
        }
    }

    const onAddBtnClick = (event) => {
        const lessonList = inputList;
        setErrorView(false);
        setInputList(lessonList.concat(<AddLesson onChange={(value, name) => {setNameState(value, name, lessonList.length)}} key={lessonList.length} indexValue={lessonList.length}/>))
    }

    return (
        <>
            <div className="web-page">
                <Col>
                    <Sidebar/>
                </Col>
                <Col className="dashboard">
                    <div className="hero">
                        <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/courseHero.png"/>
                        <h3 className="hero-text"><IoMdAdd style={{marginBottom:'10px', marginRight:'10px'}}/>Add Courses</h3>
                    </div>
                    <Container className="dash-cards" style={{width:'80%'}}>
                        <br></br>
                        {errorView && 
                            <>
                                <h6 className="error-message">{error}</h6>
                                <br></br>
                            </>
                        }
                        <Form onSubmit={onSubmit}>
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
                                    value={course_name}
                                    onChange={e => setCourseName(e.target.value)}
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
                                    value={course_description}
                                    onChange={e => setCourseDescription(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                            {inputList}
                            <Button className="btn waves-effect waves-light accent-3 outline-btn" onClick={onAddBtnClick} style={{marginBottom: '30px'}}>
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
                                    value={exam_weightage}
                                    onChange={e => setExamWeightage(e.target.value)}
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
                                    value={participation_weightage}
                                    onChange={e => setParticipationWeightage(e.target.value)}
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

AddCourse.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(AddCourse);