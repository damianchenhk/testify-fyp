import React, { useState, useEffect } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
import axios from "axios";
import CourseCard from "./CourseCard";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const Course = () => {
  
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
      <CourseCard course={course} key={k} />
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
                    <h3 className="hero-text">All Courses</h3>
                  </div>
                  <Container className="dash-cards" style={{width:'90%'}}>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th style={{width:'33%', textAlign:'center'}}>Course Title</th>
                          <th style={{textAlign:'center'}}>Description</th>
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

export default Course;