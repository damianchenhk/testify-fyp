import React, { useState, useEffect } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
import { BsLaptop, BsFillCameraVideoFill, BsFillPersonFill, BsPenFill, BsFillCheckCircleFill } from "react-icons/bs";
import axios from "axios";
import AdminCourseCard from "./AdminCourseCard";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const AdminCourse = () => {
  
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
      <AdminCourseCard course={course} key={k} />
    );
  }

    return (
        <>
            <div className="web-page">
                <Col>
                    <Sidebar/>
                </Col>
                <Col className="dashboard">
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

export default AdminCourse;