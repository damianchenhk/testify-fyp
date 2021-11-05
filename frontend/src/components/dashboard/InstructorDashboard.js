import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class InstructorDashboard extends Component {

    render() {
        const { user } = this.props.auth;

        return (
            <>
                <h4>
                    <b>Hey there,</b> {user.name.split(" ")[0]}
                </h4>
                <Link to="/addcourse" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                    Add Course
                </Link>
            </>
        );
    }
}

InstructorDashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(InstructorDashboard);