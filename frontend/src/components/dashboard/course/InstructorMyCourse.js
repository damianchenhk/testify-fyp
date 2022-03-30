import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Container, Table } from "react-bootstrap";
import { BsPersonCheck, BsFillCameraVideoFill, BsFillPersonFill, BsPenFill } from "react-icons/bs";
import axios from "axios";
import InstructorCourseCard from "./InstructorCourseCard";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const InstructorMyCourse = ({auth}) => {
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .post('/api/courses/instructorcourses/', {instructor_id: auth.user.id})
      .then(res => {
        setCourses(res.data)
      })
      .catch(err =>{
        console.log('Error from ShowCourseList');
      })
  }, [])

  let courseList;

  if(!courses) {
      courseList = "there is no course record!";
  } else {
      courseList = courses.map((course, k) =>
      <InstructorCourseCard course={course} key={k} />
    );
  }

    return (
        <>
            <div className="web-page">
                <Col>
                    <Sidebar/>
                </Col>
                <Col className="align-items-center dashboard">
                  <div className="hero">
                    <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/courseHero.png"/>
                    <h3 className="hero-text"><BsPersonCheck style={{marginBottom:'5px'}}/> My Courses</h3>
                  </div>
                  <Container className="dash-cards" style={{width:'90%'}}>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th style={{textAlign:'center'}}>Course Title</th>
                          <th style={{textAlign:'center'}}>Description</th>
                          <th style={{textAlign:'center', width:'5%'}}><BsFillCameraVideoFill size={'20px'} title="No. of Lessons"/></th>
                          <th style={{textAlign:'center', width:'5%'}}><BsFillPersonFill size={'25px'} title="No. of Students"/></th>
                          <th style={{textAlign:'center', width:'5%'}}><BsPenFill size={'20px'} title="No. of Tests"/></th>
                          <th style={{width:'10%'}}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {courseList}
                      </tbody>
                    </Table>
                  </Container>
                </Col>
            </div>
        </>
    );
}

InstructorMyCourse.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(InstructorMyCourse);