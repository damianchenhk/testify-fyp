import React, { useState, useEffect } from "react";
import { Row, Col, Table, Container } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

import Sidebar from "../../layout/Sidebar";

const CourseDetails = ({props}) => {

    const [course, setCourse] = useState({});
    const { id } = useParams()

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
            table.push(<tr>{children}</tr>)
        }
        return table
    }

    return (
        <>
            <Row>
                <Col xs={2}>
                    <Sidebar/>
                </Col>
                <Col xs={10} className="align-items-center dashboard">
                    <h2>{course.course_name}</h2>
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
                    <br></br>
                    <Link to={{
                            pathname: `/viewcourse/${course._id}`,
                        }}
                        className="btn btn-large waves-effect waves-light hoverable accent-3"
                    >
                        Start Course
                    </Link>
                </Col>
            </Row>
        </>
    );
}

export default CourseDetails;