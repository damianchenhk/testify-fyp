import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, FloatingLabel, Form, Button } from "react-bootstrap";
import axios from 'axios';

import Sidebar from "../../layout/Sidebar";
import AddLesson from "./AddLesson";
import { useHistory } from "react-router-dom";

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
        setInputList(lessonList.concat(<AddLesson onChange={(value, name) => {setNameState(value, name, lessonList.length)}} key={lessonList.length}/>))
    }

    return (
        <>
            <div className="row">
                <Col xs={2}>
                    <Sidebar/>
                </Col>
                <Col xs={10} className="dashboard">
                    <br></br>
                    <h4><b>Add Courses Here</b></h4>
                    <Form onSubmit={onSubmit}>
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
                                value={course_name}
                                onChange={e => setCourseName(e.target.value)}
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
                            value={course_description}
                            onChange={e => setCourseDescription(e.target.value)}
                            />
                        </FloatingLabel>
                        {inputList}
                        <Button type="button" onClick={onAddBtnClick} style={{marginBottom: '30px'}}>
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
                                value={exam_weightage}
                                onChange={e => setExamWeightage(e.target.value)}
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
                                value={participation_weightage}
                                onChange={e => setParticipationWeightage(e.target.value)}
                            />
                        </FloatingLabel>
                        <Button variant="primary" type="submit" style={{marginBottom: '30px'}}>
                            Submit
                        </Button>
                    </Form>
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