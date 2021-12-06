import React, { Component } from "react";
import { connect } from "react-redux";
import { Nav } from "react-bootstrap";

class Sidebar extends Component {
    render() {

        return (
            <>
            <Nav defaultActiveKey="/dashboard" className="flex-column sidebar">
                <Nav.Link href="/dashboard">Home</Nav.Link>
                <Nav.Link href="/course">Courses</Nav.Link>
                <Nav.Link href="/yourtests">Your Tests</Nav.Link>
            </Nav>
            </>
        );
    }
}

export default connect()(Sidebar);