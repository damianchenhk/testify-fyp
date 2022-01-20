import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const InstructorDashboard = ({ auth }) => {
    return (
        <>
            <h4>
                <b>Hey there,</b> {auth.user.name?.split(" ")[0]}
            </h4>
            <Link to="/addcourse" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Add Course
            </Link>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(InstructorDashboard);