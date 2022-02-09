import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";



const StudentDashboard = ({ auth }) => {

    return (
        <>
            <br></br>
            <h4>
                <b>Hey there,</b> {auth.user.name?.split(" ")[0]}
            </h4>
            <Link to="/course" className="btn btn-large waves-effect waves-light hoverable accent-3">
                View Course
            </Link>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(StudentDashboard);