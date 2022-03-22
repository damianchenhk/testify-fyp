import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Table, Container, Button, Form } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const AdminCourseView = ({ auth }) => {

    const { id } = useParams()

    const [course, setCourse] = useState({});

    useEffect(() => {
        axios
            .get('/api/courses/'+id)
            .then(res => {
                setCourse(res.data)
            })
            .catch(err => {
                console.log("Error from CourseDetails");
            })
    }, [])

    const lessonTable = () => {
        let table = []
    
        for (let i = 0; i < course.lesson_names?.length; i++) {
            let children = []

            children.push(<td style={{textAlign:'center'}}>{i + 1}</td>)
            children.push(<td style={{textAlign:'center'}}>{course.lesson_names ? course.lesson_names[i] : null}</td>)
            children.push(<td>{course.lesson_descriptions ? course.lesson_descriptions[i] : null}</td>)
            table.push(<tr key={i}>{children}</tr>)
        }
        return table
    }

    return (
        <>
            <div className="web-page">
                <Col>
                    <Sidebar/>
                </Col>
                <Col className="align-items-center dashboard">
                    <br></br>
                    <h2>{course.course_name}</h2>
                    <h5>Instructor: {course.instructor_name}</h5>
                    <h6>{course.course_description}</h6>
                    <br></br>
                    <Container>
                        <h4>Lessons</h4>
                        <Table bordered hover responsive style={{border:'1'}}>
                            <thead>
                                <tr>
                                    <th style={{width:'10%', textAlign:'center'}}>No.</th>
                                    <th style={{textAlign:'center'}}>Lesson Name</th>
                                    <th style={{textAlign:'center'}}>Lesson Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lessonTable()}
                            </tbody>
                        </Table>
                    </Container>
                </Col>
            </div>
        </>
    );
}

AdminCourseView.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(AdminCourseView);