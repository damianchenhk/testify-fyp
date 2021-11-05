import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import '../../App.css';

class TopNavbar extends Component {


    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;
        return (
            <div className="navbar-fixed">
                <Navbar bg="light" expand="lg">
                    <div className="logo">
                    <Link
                        to="/dashboard"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo left black-text">
                        <i className="material-icons">code</i>
                        Testify
                    </Link>So 
                </div>
                {this.props.auth.isAuthenticated && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
                    <Navbar.Collapse id="basic-navbar-nav">
                        {this.props.auth.isAuthenticated && <Nav className="top-nav">
                            <NavDropdown title={user.name.split(" ")[0]} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={this.onLogoutClick}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

TopNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {logoutUser}
)(TopNavbar);