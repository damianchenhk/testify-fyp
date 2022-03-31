import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Row, Col, Container } from "react-bootstrap";
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const ViewCourse = () => {

    const [course, setCourse] = useState({});
    const [lessonIndex, setLessonIndex] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        axios
        .get('/api/courses/'+id)
        .then(res => {
            setCourse(res.data)
        })
        .catch(err => {
            console.log("Error from ViewCourse");
        })
    })

    const nextLesson = () => {
        setLessonIndex(lessonIndex + 1)
    }

    const previousLesson = () => {
        setLessonIndex(lessonIndex - 1)
    }

    const getLessonNameLength = () => {
        if(course.lesson_names) { return course.lesson_names.length} 
        else return 0 
    } 

    return (
        <>
            <div className="web-page">
                <Col>
                    <Sidebar/>
                </Col>
                <Col className="dashboard">
                    <Container className="view-course">
                        <br></br>
                        <div style={{marginBottom:'5px'}}>
                            <Link to={{pathname: `/coursedetails/${course._id}`}}>{course.course_name}</Link> {">"} {course.lesson_names ? course.lesson_names[lessonIndex] : null}
                        </div>
                        <h3>{course.course_name}</h3>
                        <ReactPlayer
                            className='react-player'
                            url={course.lesson_urls ? course.lesson_urls[lessonIndex] : null}
                            width='100%'
                            height='auto'
                            controls = {true}
                        />
                        <Row>
                            <Col xs={6}>
                                {lessonIndex !== 0 && <button
                                    className="btn btn-large waves-effect waves-light accent-3 previous-button"
                                    onClick={previousLesson.bind(this)}
                                >
                                    {"<"} {course.lesson_names ? course.lesson_names[lessonIndex - 1] : null}
                                </button>}
                            </Col>
                            <Col xs={6}>
                                {lessonIndex + 1 !== getLessonNameLength() && <button
                                    className="btn btn-large waves-effect waves-light accent-3 next-button"
                                    onClick={nextLesson.bind(this)}
                                >
                                    {course.lesson_names ? course.lesson_names[lessonIndex + 1]: null} {">"}
                                </button>}
                            </Col>
                        </Row>
                    </Container>
                    <Container className="dash-cards" style={{textAlign:'left', width:'90%'}}>
                        <br></br>
                        <div style={{marginLeft:'10px'}}>
                            <h4> {course.lesson_names ? course.lesson_names[lessonIndex] : null} </h4>
                            <p> {course.lesson_descriptions ? course.lesson_descriptions[lessonIndex] : null} </p>
                        </div>
                        <hr></hr>
                        <div style={{textAlign:'center'}}>
                            <Link to={{pathname: `/addtest/${id}`}} className="btn btn-large waves-effect waves-light hoverable accent-3" style={{marginBottom:'15px'}}>
                                Create Test
                            </Link>
                        </div>
                    </Container>
                    <br></br>
                </Col>
            </div>
        </>
    );
}

export default ViewCourse;