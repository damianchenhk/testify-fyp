import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Container, Table } from "react-bootstrap";
import axios from "axios";
import CourseCard from "./CourseCard";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const MyCourses = ({auth}) => {
  
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .post('/api/courses/mycourses/', {ongoing_courses: auth.user.ongoing_courses})
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
                  <Container>
                    <br></br>
                    <h3>My Courses</h3>
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
            </div>
        </>
    );
}

MyCourses.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(MyCourses);