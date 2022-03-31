import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import { BsLaptop, BsFillCameraVideoFill, BsFillPersonFill, BsPenFill, BsPersonBadgeFill, BsCalendarDateFill, BsFileEarmarkPerson } from "react-icons/bs";
import axios from "axios";

import '../../App.css';

import AdminCourseSummary from "./homepage/AdminCourseSummary";
import AdminUserSummary from "./homepage/AdminUserSummary";

const AdminDashboard = ({ auth }) => {

    const [courses, setCourses] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get('/api/courses/allCoursesRecent/')
            .then(res => {
                setCourses(res.data)
                axios
                    .post('/api/users/allUsersRecent/', {user_id: auth.user.id})
                    .then(res => {
                        setUsers(res.data)
                    })
                    .catch(err => {
                        console.log('Error from allUsersRecent');
                    })
            })
            .catch(err =>{
                console.log('Error from allCoursesRecent');
            })
    }, []);

    const courseSummary = () => {
        if(courses.length){
            return (
                <Table bordered hover responsive className="clickable-table">
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center'}}>Instructor</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillCameraVideoFill size={'20px'} title="No. of Lessons"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="No. of Students"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsPenFill size={'20px'} title="No. of Tests"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, k) =>
                            <AdminCourseSummary course={course} key={k} />
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
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="No. of Students"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsPenFill size={'20px'} title="No. of Tests"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} style={{textAlign:'center'}}>There are no courses created</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    const userSummary = () => {
        if(users.length){
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Name</th>
                            <th style={{textAlign:'center'}}><BsPersonBadgeFill size={'20px'} title="User Role"/></th>
                            <th style={{textAlign:'center'}}><BsCalendarDateFill size={'20px'} title="Date & Time of Registration"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, k) =>
                            <AdminUserSummary user={user} key={k} />
                        )}
                    </tbody>
                </Table>
            )
        }else {
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Name</th>
                            <th style={{textAlign:'center'}}><BsPersonBadgeFill size={'20px'} title="User Role"/></th>
                            <th style={{textAlign:'center'}}><BsCalendarDateFill size={'20px'} title="Date & Time of Registration"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>There are no other users</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    return (
        <>
            <div className="hero">
                <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/adminHero.png"/>
                <h4 className="hero-text">
                    Welcome back, {auth.user.name?.split(" ")[0]}
                </h4>
            </div>
            <br></br>
            <Row style={{margin:'0 10px 20px'}}>
                <Col xs={12} lg={8} md style={{padding:'0'}}>
                    <div className="course-summary" style={{height:'auto'}}>
                        <h5 style={{marginTop: '10px'}}><BsLaptop style={{marginBottom:'4px'}}/> <strong>New Courses</strong></h5>
                        {courseSummary()}
                        {courses.length ? <Link to="/admincourses" className="btn waves-effect waves-light accent-3" style={{fontSize: '15px', marginBottom:'6px'}}>
                            View More
                        </Link> : null}
                    </div>
                </Col>
                <Col xs={12} lg={4} md style={{padding:'0'}}>
                    <div className="course-summary" style={{height:'auto'}}>
                        <h5 style={{marginTop: '10px'}}><BsFileEarmarkPerson style={{marginBottom:'4px'}}/> <strong>New Users</strong></h5>
                        {userSummary()}
                        {users.length ? <Link to="/adminuserlist" className="btn waves-effect waves-light accent-3" style={{fontSize: '15px', marginBottom:'6px'}}>
                            View More
                        </Link> : null}
                    </div>
                </Col>
            </Row>
        </>
    )
}

AdminDashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(AdminDashboard);