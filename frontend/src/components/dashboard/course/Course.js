import React, { useState, useEffect } from "react";
import { Row, Col, Container, Table } from "react-bootstrap";
import axios from "axios";
import CourseCard from "./CourseCard";

import Sidebar from "../../layout/Sidebar";

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
            <Row>
                <Col xs={2}>
                    <Sidebar/>
                </Col>
                <Col xs={10} className="align-items-center dashboard">
                  <Container>
                    <br></br>
                    <h3>All Courses</h3>
                    <Table responsive>
                      <thead>
                        <tr>
                          <td style={{width:'33%'}}></td>
                          <td></td>
                          <td style={{width:'10%'}}></td>
                        </tr>
                      </thead>
                      <tbody>
                        {courseList}
                      </tbody>
                    </Table>
                  </Container>
                </Col>
            </Row>
        </>
    );
}

export default Course;