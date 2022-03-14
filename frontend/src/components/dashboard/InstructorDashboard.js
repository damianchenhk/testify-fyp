import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import axios from "axios";

import '../../App.css';

import InstructorCourseSummary from "./homepage/InstructorCourseSummary";

const InstructorDashboard = ({ auth }) => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios
            .post('/api/courses/instructorcoursesRecent/', {instructor_id: auth.user.id})
            .then(res => {
                setCourses(res.data)
            })
            .catch(err =>{
                console.log('Error from InstructorCoursesRecent');
            })
    }, []);

    const courseSummary = () => {
        if(courses.length){
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Students</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Tests Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, k) =>
                            <InstructorCourseSummary course={course} key={k} />
                        )}
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={3} style={{textAlign: 'center'}}>
                                <Link to="/instructorcourses" className="btn waves-effect waves-light accent-3" style={{fontSize: '10px'}}>
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
                            <th style={{textAlign:'center', width:'10%'}}>No. of Students</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. of Tests Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>You have no courses created</td>
                        </tr>
                    </tbody>
                    <tfoot style={{border: 'none'}}>
                        <tr>
                            <td colSpan={3} style={{textAlign: 'center'}}>
                                <Link to="/addcourse" className="btn waves-effect waves-light accent-3" style={{fontSize: '10px'}}>
                                    Add Course
                                </Link>
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
                <strong>Hey there,</strong> {auth.user.name?.split(" ")[0]}
            </h4>
            <Row>
                <Col xs={12} lg md className="course-summary" style={{marginLeft: '10px'}}>
                    <h5 style={{marginTop: '10px'}}>My Courses</h5>
                    {courseSummary()}
                </Col>
                <Col xs={12} lg md className="course-summary">
                    Test
                </Col>
            </Row>
        </>
    )
}

InstructorDashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(InstructorDashboard);