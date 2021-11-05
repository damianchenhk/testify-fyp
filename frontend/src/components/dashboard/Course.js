import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import CourseCard from "./CourseCard";

import Sidebar from "../layout/Sidebar";

class Course extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    constructor(props) {
        super(props);
        this.state = {
          courses: []
        };
      }
    
      componentDidMount() {
        axios
          .get('/api/courses')
          .then(res => {
            this.setState({
              courses: res.data
            })
          })
          .catch(err =>{
            console.log('Error from ShowCourseList');
          })
      };

    render() {

        const courses = this.state.courses;
        console.log("PrintCourse: " + courses);
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
                    <div className="list">
                        {courseList}
                    </div>
                    </Col>
                </Row>
            </>
        );
    }
}

Course.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(Course);