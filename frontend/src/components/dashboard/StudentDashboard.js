import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class StudentDashboard extends Component {

    render() {
        const { user } = this.props.auth;

        return (
            <>
                <h4>
                    <b>Hey there,</b> {user.name.split(" ")[0]}
                </h4>
                <Link to="/course" className="btn btn-large waves-effect waves-light hoverable accent-3">
                    View Course
                </Link>
            </>
        );
    }
}

StudentDashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(StudentDashboard);