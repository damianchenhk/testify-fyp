import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Row, Col } from "react-bootstrap";
import axios from "axios";

import StudentNewCourses from "./homepage/StudentNewCourses";
import StudentMyCourses from "./homepage/StudentMyCourses";
import StudentMyTests from "./homepage/StudentMyTests";
import StudentPendingTests from "./homepage/StudentPendingTests";
import '../../App.css';

const StudentDashboard = ({ auth }) => {

    const [newCourses, setNewCourses] = useState([]);
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const [myTests, setMyTests] = useState([]);

    useEffect(() => {
        axios
            .get('/api/courses/allCoursesRecent/')
            .then(res => {
                setNewCourses(res.data)
                axios
                    .post('/api/reports/registeredReportsRecent', {student_id: auth.user.id})
                    .then(res => {
                        setRegisteredCourses(res.data)
                        axios
                            .post('/api/tests/myTestsRecent/', {creator_id: auth.user.id})
                            .then(res => {
                                setMyTests(res.data)
                            })
                            .catch(err => {
                                console.log('Error from myTests: ' + err);
                            })
                    })
                    .catch(err => {
                        console.log('Error from registeredReportsRecent: ' + err);
                    })
            })
            .catch(err =>{
                console.log('Error from AllCoursesRecent');
            })
    }, []);

    const newCourseSummary = () => {
        if(newCourses.length){
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Lessons</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Students</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Tests Created</th>
                            <th style={{textAlign:'center', width:'10%'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {newCourses.map((course, k) =>
                            <StudentNewCourses course={course} key={k} student_id={auth.user.id} />
                        )}
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={5} style={{textAlign: 'center'}}>
                                <Link to="/course" className="btn waves-effect waves-light accent-3" style={{fontSize: '10px'}}>
                                    View More
                                </Link>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )
        }else {
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Lessons</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Students</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Tests Created</th>
                            <th style={{textAlign:'center', width:'10%'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} style={{textAlign:'center'}}>There are no courses available</td>
                        </tr>
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={5} style={{textAlign: 'center'}}>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )
        }
    }

    const myCourseSummary = () => {
        if(registeredCourses.length){
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Lessons</th>
                            <th style={{textAlign:'center', width:'10%'}}>Tests Not Attempted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registeredCourses.map((report, k) =>
                            <StudentMyCourses key={k} report={report} />
                        )}
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={3} style={{textAlign: 'center'}}>
                                <Link to="/mycourses" className="btn waves-effect waves-light accent-3" style={{fontSize: '10px'}}>
                                    View More
                                </Link>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )
        }else {
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Lessons</th>
                            <th style={{textAlign:'center', width:'10%'}}>Tests Not Attempted</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>There are no courses registered</td>
                        </tr>
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={3} style={{textAlign: 'center'}}>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )
        }
    }

    const myTestsSummary = () => {
        if(myTests.length){
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test</th>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}>Students Attempted</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myTests.map((test, k) =>
                            <StudentMyTests key={k} test={test}/>
                        )}
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={3} style={{textAlign: 'center'}}>
                                <Link to="/yourtests" className="btn waves-effect waves-light accent-3" style={{fontSize: '10px'}}>
                                    View More
                                </Link>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )
        }else {
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test</th>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}>Students Attempted</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>You have not created any tests</td>
                        </tr>
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={3} style={{textAlign: 'center'}}>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )
        }
    }

    const pendingTestsSummary = () => {
        if(myTests.length){
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test</th>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Students Approved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myTests.filter(test => test.tester_id.length < 2).map((test, k) =>
                            <StudentPendingTests key={k} test={test}/>
                        )}
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={3} style={{textAlign: 'center'}}>
                                <Link to="/yourtests" className="btn waves-effect waves-light accent-3" style={{fontSize: '10px'}}>
                                    View More
                                </Link>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )
        }else {
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test</th>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}>Students Attempted</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>You have not created any tests</td>
                        </tr>
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={3} style={{textAlign: 'center'}}>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            )
        }
    }

    return (
        <>
            <br></br>
            <h4>
                <b>Welcome back,</b> {auth.user.name?.split(" ")[0]}
            </h4>
            <Row>
                <Col xs={12} lg md className="course-summary" style={{marginLeft: '10px'}}>
                    <h5 style={{marginTop: '10px'}}>My Courses</h5>
                    {myCourseSummary()}
                </Col>
                <Col xs={12} lg md className="course-summary">
                    <h5 style={{marginTop: '10px'}}>New Courses</h5>
                    {newCourseSummary()}
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg md className="course-summary" style={{marginLeft: '10px'}}>
                    <h5 style={{marginTop: '10px'}}>Tests Pending Approval</h5>
                    {pendingTestsSummary()}
                </Col>
                <Col xs={12} lg md className="course-summary">
                    <h5 style={{marginTop: '10px'}}>My Tests</h5>
                    {myTestsSummary()}
                </Col>
            </Row>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(StudentDashboard);