import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Table, Container } from "react-bootstrap";
import { BsCameraVideo, BsFillCameraVideoFill, BsFillPersonFill, BsPenFill, BsBarChartLine } from "react-icons/bs";
import { RiPencilRuler2Line } from "react-icons/ri";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const AdminCourseView = ({ auth }) => {

    const { id } = useParams()

    const [course, setCourse] = useState({});
    const [tests, setTests] = useState([]);
    const [studentCount, setStudentCount] = useState(0);

    useEffect(() => {
        axios
            .get('/api/courses/'+id)
            .then(res => {
                setCourse(res.data);
                axios
                    .post('/api/tests/courseTests', {course_id: id})
                    .then(res => {
                        setTests(res.data);
                        axios
                            .post('/api/reports/getCourseStudentsCount', {course_id: id})
                            .then(res => {
                                setStudentCount(res.data);
                            })
                            .catch(err => {
                                console.log("error from getCourseStudentsCount");
                            })
                    })
                    .catch(err => {
                        console.log("Error from courseTests");
                    })
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

    const testTable = () => {
        let table = []
        if(tests.length > 0){
            for (let i = 0; i < tests?.length; i++) {
                let children = []

                children.push(<td><h6>{tests[i].test_name ? tests[i].test_name : null}</h6>By: {tests[i].creator_name ? tests[i].creator_name : null}</td>)
                children.push(<td>{tests[i].test_description ? tests[i].test_description : null}</td>)
                table.push(<tr>{children}</tr>)
            }
            return table
        }else{
            table.push(<tr><td colSpan={3} style={{textAlign:'center'}}>There are no tests available</td></tr>)
            return table
        }
    }

    const courseStats = () => {
        return(
            <>
                <div className="course-stats">
                    <div className="course-checked">
                        <h6 className="course-checked-color"><BsFillCameraVideoFill size={'30px'} title='No. of Lessons'/></h6>
                    </div>
                    <h5 className="course-checked-color"><strong>{course.lesson_names?.length ? course.lesson_names?.length : 0}</strong></h5>
                    <div className="course-attempt">
                        <h6 className="course-attempt-color"><BsFillPersonFill size={'30px'} title='No. of Students'/></h6>
                    </div>
                    <h5 className="course-attempt-color"><strong>{studentCount}</strong></h5>
                    <div className="course-effective">
                        <h6 className="course-effective-color"><BsPenFill size={'25px'} title='No. of Tests'/></h6>
                    </div>
                    <h5 className="course-effective-color"><strong>{tests?.length ? tests?.length : 0}</strong></h5>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="web-page">
                <Col>
                    <Sidebar/>
                </Col>
                <Col className="dashboard course-details">
                    <br></br>
                    <h3>{course.course_name}</h3>
                    <h5>Instructor: {course.instructor_name}</h5>
                    <h6>{course.course_description}</h6>
                    <br></br>
                    <Container className="dash-cards">
                        <br></br>
                        <h4><BsBarChartLine style={{marginBottom:'10px'}}/> Course Statistics</h4>
                        <hr></hr>
                        {courseStats()}
                        <br></br>
                    </Container>
                    <br></br>
                    <Container className="dash-cards">
                        <br></br>
                        <h4><BsCameraVideo style={{marginBottom:'5px'}}/> Lessons</h4>
                        <Table bordered responsive>
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
                    <Container className="dash-cards">
                        <br></br>
                        <h4><RiPencilRuler2Line style={{marginBottom:'10px'}}/> Available Tests</h4>
                        <Table bordered responsive style={{border:'1'}}>
                            <thead>
                                <tr>
                                    <th style={{textAlign:'center'}}>Test Name</th>
                                    <th style={{textAlign:'center'}}>Test Description</th>
                                    <th style={{textAlign:'center', width:'10%'}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {testTable()}
                            </tbody>
                        </Table>
                    </Container>
                    <br></br>
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