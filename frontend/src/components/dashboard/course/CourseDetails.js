import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { Row, Col, Table, Container, Button, Form } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import RegisterPopUp from "./RegisterPopUp";
import { UPDATE_COURSE_REGISTERED } from "../../../actions/types";

export const updateCourseRegistered = e => {
    return {
        type: UPDATE_COURSE_REGISTERED,
        payload: e
    };
};

const CourseDetails = ({ auth }) => {

    const { id } = useParams()

    const [course, setCourse] = useState({});
    const [seen, setSeen] = useState(false);

    const [student_id, setStudentId] = useState(auth.user.id);
    const [course_id, setCourseId] = useState(id)
    const [beta_tester, setBetaTester] = useState(false);

    const [courses_taken, setStudentCourses] = useState(auth.user.ongoing_courses);
    const [registered, setRegistered] = useState(courses_taken.includes(id));
    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();

        const data = {
            student_id: student_id,
            course_id: course_id,
            beta_tester: beta_tester
        };

        let registerCourse = courses_taken.concat(id)

        axios
        .post('/api/reports/', data)
        .then(res => {
            setStudentId(auth.user.id)
            setCourseId(auth.user.id)
            setBetaTester(false)
            
            const data2 = {
                ongoing_courses: registerCourse
            };
            console.log(data2);
            axios
            .put('/api/users/'+auth.user.id, data2)
            .then(res => {
                dispatch(updateCourseRegistered(id));
                setRegistered(true);
                togglePop();
            })
            .catch(err => {
                console.log("Error in RegisterCourse!");
            });
        })
    }

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

    const togglePop = () => {
        setSeen(value => !value)
        if(seen){
            setBetaTester(false)
        }
    }

    const toggleTester = () => {
        setBetaTester(value => !value)
    }

    return (
        <>
            <Row>
                <Col xs={2}>
                    <Sidebar/>
                </Col>
                <Col xs={10} className="align-items-center dashboard">
                    <br></br>
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
                    {registered ? <Link to={{
                            pathname: `/viewcourse/${course._id}`,
                        }}
                        className="btn btn-large waves-effect waves-light hoverable accent-3"
                        style={{zIndex:'0'}}
                    >
                        Start Course
                    </Link> : null}
                    {!registered ? <Button onClick={() => togglePop()} className="btn btn-large waves-effect waves-light hoverable accent-3" style={{zIndex:'0'}}>Register</Button> : null}
                    <RegisterPopUp trigger={seen} setTrigger={togglePop} setSubmit={onSubmit}>
                        <h5>Register for {course.course_name}?</h5>
                        <Form.Check onChange={() => toggleTester()} label="I want to be a pre-tester for student tests"/>
                        <br></br>
                    </RegisterPopUp>
                </Col>
            </Row>
        </>
    );
}

CourseDetails.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(CourseDetails);