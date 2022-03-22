import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Container, Table } from "react-bootstrap";
import axios from "axios";
import UserCard from "./UserCard";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const Users = ({ auth }) => {
  
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
        .post('/api/users/allUsers/', {user_id: auth.user.id})
        .then(res => {
            setUsers(res.data)
        })
        .catch(err =>{
            console.log('Error from ShowCourseList');
        })
    }, [])

    let userList;

    if(!users) {
        userList = "There are no user records!";
    } else {
        userList = users.map((user, k) =>
            <UserCard user={user} key={k} />
        );
    }

    return (
        <>
            <div className="web-page">
                <Col>
                    <Sidebar/>
                </Col>
                <Col className="align-items-center dashboard">
                <Container>
                    <br></br>
                    <h3>All Users</h3>
                    <Table responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>User Name</th>
                            <th style={{textAlign: 'center'}}>User Role</th>
                            <th style={{textAlign: 'center'}}>Date & Time Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList}
                    </tbody>
                    </Table>
                </Container>
                </Col>
            </div>
        </>
    );
}

Users.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(Users);