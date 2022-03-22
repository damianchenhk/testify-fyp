import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
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
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center'}}>Course Description</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Lessons</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Students</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Tests Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, k) =>
                            <AdminCourseSummary course={course} key={k} />
                        )}
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={5} style={{textAlign: 'center'}}>
                                <Link to="/admincourses" className="btn waves-effect waves-light accent-3" style={{fontSize: '10px'}}>
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
                            <th style={{textAlign:'center'}}>Course Description</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Lessons</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Students</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Tests Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} style={{textAlign:'center'}}>You have no courses created</td>
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
                            <th style={{textAlign:'center'}}>User Role</th>
                            <th style={{textAlign:'center'}}>Date & Time of Registration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, k) =>
                            <AdminUserSummary user={user} key={k} />
                        )}
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={5} style={{textAlign: 'center'}}>
                                <Link to="/adminuserlist" className="btn waves-effect waves-light accent-3" style={{fontSize: '10px'}}>
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
                            <th style={{textAlign:'center'}}>Name</th>
                            <th style={{textAlign:'center'}}>User Role</th>
                            <th style={{textAlign:'center', width:'10%'}}>Date of Registration</th>
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
            <br></br>
            <h4>
                <strong>Welcome back,</strong> {auth.user.name?.split(" ")[0]}
            </h4>
            <br></br>
            <Row>
                <Col xs={12} lg md className="course-summary" style={{marginLeft: '10px'}}>
                    <h5 style={{marginTop: '10px'}}>Recent Courses</h5>
                    {courseSummary()}
                </Col>
                <Col xs={12} lg md className="course-summary" style={{marginLeft: '10px'}}>
                    <h5 style={{marginTop: '10px'}}>Recent Users</h5>
                    {userSummary()}
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