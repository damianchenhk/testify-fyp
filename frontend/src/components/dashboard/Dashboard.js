import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Col } from "react-bootstrap";

import Sidebar from "../layout/Sidebar";
import StudentDashboard from "./StudentDashboard";
import InstructorDashboard from "./InstructorDashboard";
import AdminDashboard from "./AdminDashboard";
import "../../App.css";

const Dashboard = ({auth}) => {

    function renderSwitch(param){
        switch(param){
            case 'Student':
                return <StudentDashboard/>
            case 'Instructor':
                return <InstructorDashboard/>
            case 'Admin':
                return <AdminDashboard/>
            default:
                return <StudentDashboard/>
        }
    }
    const { user } = auth;

    return (
        <div className="web-page">
            <Col>
                <Sidebar/>
            </Col>
            <Col className="dashboard main-dash">
                {renderSwitch(user.role)}
            </Col>
        </div>
    );
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