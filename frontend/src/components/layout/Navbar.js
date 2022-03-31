import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logoutUser } from "../../actions/authActions";

import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { BsFilePersonFill, BsDoorOpenFill } from "react-icons/bs";
import Profile from "./Profile";
import '../../App.css';

class TopNavbar extends Component {

    constructor (props) {
        super(props);
        this.state = {
            seen: false
        }
    }

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    togglePop = () => {
        let tempSeen = this.state.seen
        this.setState({seen: !tempSeen})
    }

    render() {
        const { user } = this.props.auth;
        return (
            <>
            <div className="navbar-fixed">
                <Navbar bg="light">
                    <div className="logo">
                    <Link
                        to="/dashboard"
                        style={{
                            fontFamily: "monospace"
                        }}
                        className="col s5 brand-logo left black-text">
                        <i className="material-icons" style={{marginTop:'5px'}}>code</i>
                        Testify
                    </Link>
                </div>
                {this.props.auth.isAuthenticated && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
                    {this.props.auth.isAuthenticated && <Nav className="top-nav">
                        <NavDropdown title={user.name.split(" ")[0]} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={this.togglePop}><BsFilePersonFill size={'20px'} style={{marginBottom:'4px'}}/> Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={this.onLogoutClick}><BsDoorOpenFill size={'20px'} style={{marginBottom:'4px'}}/> Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>}
                </Navbar>
            </div>
            <Profile trigger={this.state.seen} setTrigger={this.togglePop}>
                <div className="profile-details">
                    <div className="profile-header">
                        <h4><BsFilePersonFill size={'30px'} style={{marginBottom:'5px'}}/> Profile</h4>
                        <hr></hr>
                    </div>
                    <h6 className="user-id"><strong>ID: </strong></h6>
                    <h6 className="user-id-detail">{this.props.auth.user.id}</h6>
                    <h6 className="name"><strong>Name: </strong></h6>
                    <h6 className="name-detail">{this.props.auth.user.name}</h6>
                    <h6 className="email"><strong>Email: </strong></h6>
                    <h6 className="email-detail">{this.props.auth.user.email}</h6>
                    <h6 className="role"><strong>Role: </strong></h6>
                    <h6 className="role-detail">{this.props.auth.user.role}</h6>
                </div>
                <br></br>
            </Profile>
            </>
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