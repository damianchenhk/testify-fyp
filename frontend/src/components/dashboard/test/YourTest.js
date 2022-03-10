import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Container } from "react-bootstrap";
import axios from "axios";
import TestCard from "./TestCard";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const YourTest = ({ auth }) => {

  const [tests, setTests] = useState([]);

  useEffect(() => {
    axios
      .post('/api/tests/myTests/', { creator_id: auth.user.id })
      .then(res => {
        setTests(res.data)
      })
      .catch(err => {
        console.log('Error from Tests');
      })
  }, [])

  let testList;

  if (!tests) {
    testList = "there is no test record!";
  } else {
    testList = tests?.map((test, k) =>
      <TestCard test={test} key={k} />
    );
  }

  return (
    <>
      <div className="web-page">
        <Col>
          <Sidebar />
        </Col>
        <Col className="align-items-center dashboard">
          <Container>
            <br></br>
            <h3>My Tests</h3>
            <Table>
              <thead>
                <tr>
                  <td style={{width:'33%'}}></td>
                  <td></td>
                  <td style={{width:'10%'}}></td>
                </tr>
              </thead>
              <tbody>
                {testList}
              </tbody>
            </Table>
          </Container>
        </Col>
      </div>
    </>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(YourTest);