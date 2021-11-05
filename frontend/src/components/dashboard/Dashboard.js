import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Col } from "react-bootstrap";

import Sidebar from "../layout/Sidebar";
import StudentDashboard from "./StudentDashboard";
import InstructorDashboard from "./InstructorDashboard";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    renderSwitch(param){
        switch(param){
            case 'Student':
                return <StudentDashboard/>
            case 'Instructor':
                return <InstructorDashboard/>
        }
    }

    render() {
        const { user } = this.props.auth;

        return (
            <div className="row">
                <Col xs={2}>
                    <Sidebar/>
                </Col>
                <Col xs={10} className="dashboard">
                    {this.renderSwitch(user.role)}
                </Col>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(Dashboard);