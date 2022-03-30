import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Table } from "react-bootstrap";
import { BsFillCameraVideoFill, BsFillPersonFill, BsPenFill, BsPersonSquare } from "react-icons/bs";
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
                <Table bordered hover responsive className="clickable-table">
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Course</th>
                            <th style={{textAlign:'center'}}>Course Description</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillCameraVideoFill size={'20px'} title="No. of Lessons"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="No. of Students"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsPenFill size={'20px'} title="No. of Tests"/></th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, k) =>
                            <InstructorCourseSummary course={course} key={k} />
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
                            <th style={{textAlign:'center'}}>Course Description</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillCameraVideoFill size={'20px'} title="No. of Lessons"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="No. of Students"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsPenFill size={'20px'} title="No. of Tests"/></th>
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

    return (
        <>
            <div className="hero">
                <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/instructorHero.png"/>
                <h4 className="hero-text">
                    Welcome back, {auth.user.name?.split(" ")[0]}
                </h4>
            </div>
            <br></br>
            <Row>
                <Col>
                    <h6>Share your knowledge with more people</h6>
                    <Link to="/addcourse" className="btn btn-large waves-effect waves-light accent-3">
                        Add Course
                    </Link>
                </Col>
            </Row>
            <Row style={{margin:'0 10px 20px'}}>
                <Col xs={12} lg md>
                    <div className="course-summary">
                        <h5><BsPersonSquare style={{marginBottom:'3px'}}/> <strong>My Courses</strong></h5>
                        {courseSummary()}
                    </div>
                    <div style={{position:'relative', bottom:'50px'}}>
                        { courses.length ? <Link to="/instructorcourses" className="btn waves-effect waves-light accent-3" style={{fontSize: '15px'}}>
                            View More
                        </Link> : 
                        <Link to="/addcourse" className="btn waves-effect waves-light accent-3" style={{fontSize: '15px'}}>
                            Add Course
                        </Link> }
                    </div>
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