import React, { useState, useEffect } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
import { BsFillCameraVideoFill, BsFillPersonFill, BsPenFill, BsFillPatchCheckFill, BsLaptop } from "react-icons/bs";
import { connect } from "react-redux";
import axios from "axios";
import CourseCard from "./CourseCard";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const Course = ({auth}) => {
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get('/api/courses')
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
      <CourseCard course={course} key={k} student_id={auth.user.id}/>
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
                    <h3 className="hero-text"><BsLaptop style={{marginBottom:'10px'}}/> All Courses</h3>
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
                          <th style={{textAlign:'center', width:'5%'}}><BsFillPatchCheckFill size={'20px'} title="Registered?"/></th>
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(Course);