import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Table, Row, Col } from "react-bootstrap";
import { BsPen, BsLaptop, BsPersonSquare, BsPersonCheck, BsFillPatchCheckFill, BsFillCameraVideoFill, BsFillPersonFill, BsPenFill } from "react-icons/bs";
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
    const [myPendingTests, setMyPendingTests] = useState([]);

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
                                axios
                                    .post('/api/tests/myPendingTestsRecent/', {creator_id: auth.user.id})
                                    .then(res => {
                                        setMyPendingTests(res.data)
                                    })
                                    .catch(err => {
                                        console.log('Error from myPendingTestsRecent: ' + err);
                                    })
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
                <Table bordered hover responsive className="clickable-table">
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillCameraVideoFill size={'20px'} title="No. of Lessons"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="No. of Students"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsPenFill size={'20px'} title="No. of Tests"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPatchCheckFill size={'20px'} title="Registered?"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {newCourses.map((course, k) =>
                            <StudentNewCourses course={course} key={k} student_id={auth.user.id} />
                        )}
                    </tbody>
                </Table>
            )
        }else {
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillCameraVideoFill size={'20px'} title="No. of Lessons"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="No. of Students"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsPenFill size={'20px'} title="No. of Tests"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPatchCheckFill size={'20px'} title="Registered?"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} style={{textAlign:'center'}}>There are no courses available</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    const myCourseSummary = () => {
        if(registeredCourses.length){
            return (
                <Table bordered hover responsive className="clickable-table">
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center'}}>Instructor</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillCameraVideoFill size={'20px'} title="No. of Lessons"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsPenFill size={'20px'} title="Tests Remaining"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {registeredCourses.map((report, k) =>
                            <StudentMyCourses key={k} report={report} />
                        )}
                    </tbody>
                </Table>
            )
        }else {
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center'}}>Instructor</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillCameraVideoFill size={'20px'} title="No. of Lessons"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsPenFill size={'20px'} title="Tests Remaining"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={4} style={{textAlign:'center'}}>There are no courses registered</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    const myTestsSummary = () => {
        if(myTests.length){
            return (
                <Table bordered hover responsive className="clickable-table">
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test</th>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="Students Attempted"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPatchCheckFill size={'20px'} title="Approved?"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {myTests.map((test, k) =>
                            <StudentMyTests key={k} test={test}/>
                        )}
                    </tbody>
                </Table>
            )
        }else {
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test</th>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="Students Attempted"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPatchCheckFill size={'20px'} title="Approved?"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={4} style={{textAlign:'center'}}>You have not created any tests</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    const pendingTestsSummary = () => {
        if(myPendingTests.length){
            return (
                <Table bordered hover responsive className="clickable-table">
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test</th>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="Students Attempted"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {myPendingTests.map((test, k) =>
                            <StudentPendingTests key={k} test={test}/>
                        )}
                    </tbody>
                </Table>
            )
        }else {
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test</th>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="Students Attempted"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>You have no tests pending approval</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    return (
        <>
            <div className="hero">
                <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/studentHero.png"/>
                <h4 className="hero-text">
                    Welcome back, {auth.user.name?.split(" ")[0]}
                </h4>
            </div>
            <br></br>
            <Row style={{margin:'0 10px 20px'}}>
                <Col xs={12} lg={7} md style={{padding:'0'}}>
                    <div className="course-summary">
                        <h5><BsPersonSquare style={{marginBottom:'3px'}}/> <strong>My Courses</strong></h5>
                        {myCourseSummary()}
                    </div>
                    <div style={{position:'relative', bottom:'50px'}}>
                        <Link to="/mycourses" className="btn waves-effect waves-light accent-3" style={{fontSize: '15px'}}>
                            View More
                        </Link>
                    </div>
                </Col>
                <Col xs={12} lg={5} md style={{padding:'0'}}>
                    <div className="course-summary">
                        <h5><BsLaptop style={{marginBottom:'4px'}}/> <strong>New Courses</strong></h5>
                        {newCourseSummary()}
                    </div>
                    <div style={{position:'relative', bottom:'50px'}}>
                        <Link to="/course" className="btn waves-effect waves-light accent-3" style={{fontSize: '15px'}}>
                            View More
                        </Link>
                    </div>
                </Col>
            </Row>
            <Row style={{margin:'0 10px 20px'}}>
                <Col xs={12} lg={5} md style={{padding:'0'}}>
                    <div className="course-summary">
                        <h5><BsPersonCheck style={{marginBottom:'5px'}}/> <strong>Tests Pending Approval</strong></h5>
                        {pendingTestsSummary()}
                    </div>
                    <div style={{position:'relative', bottom:'50px'}}>
                        <Link to="/yourtests" className="btn waves-effect waves-light accent-3" style={{fontSize: '15px'}}>
                            View More
                        </Link>
                    </div>
                </Col>
                <Col xs={12} lg={7} md style={{padding:'0'}}>
                    <div className="course-summary">
                        <h5><BsPen style={{marginBottom:'5px'}}/> <strong>My Tests</strong></h5>
                        {myTestsSummary()}
                    </div>
                    <div style={{position:'relative', bottom:'50px'}}>
                        <Link to="/yourtests" className="btn waves-effect waves-light accent-3" style={{fontSize: '15px'}}>
                            View More
                        </Link>
                    </div>
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