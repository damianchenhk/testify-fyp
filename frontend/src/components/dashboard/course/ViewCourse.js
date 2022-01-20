import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import Sidebar from "../../layout/Sidebar";

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
            <Row>
                <Col xs={2}>
                    <Sidebar/>
                </Col>
                <Col xs={10} className="align-items-center dashboard">
                    <ReactPlayer
                        className='react-player'
                        url={course.lesson_urls ? course.lesson_urls[lessonIndex] : null}
                        width='100%'
                        height='auto'
                        controls = {true}
                        style={{marginTop: '30px'}}
                    />
                    <Row>
                        <Col xs={6}>
                            {lessonIndex !== 0 && <button
                                className="btn btn-large waves-effect waves-light hoverable accent-3 previous-button"
                                onClick={previousLesson.bind(this)}
                            >
                                {course.lesson_names ? course.lesson_names[lessonIndex - 1] : null}
                            </button>}
                        </Col>
                        <Col xs={6}>
                            {lessonIndex + 1 !== getLessonNameLength() && <button
                                className="btn btn-large waves-effect waves-light hoverable accent-3 next-button"
                                onClick={nextLesson.bind(this)}
                            >
                                {course.lesson_names ? course.lesson_names[lessonIndex + 1] : null}
                            </button>}
                        </Col>
                    </Row>
                    <h2> {course.lesson_names ? course.lesson_names[lessonIndex] : null} </h2>
                    <p> {course.lesson_descriptions ? course.lesson_descriptions[lessonIndex] : null} </p>
                    <Link to={{pathname: `/addtest/${id}`}} className="btn btn-large waves-effect waves-light hoverable accent-3">
                        Create Test
                    </Link>
                </Col>
            </Row>
        </>
    );
}

export default ViewCourse;