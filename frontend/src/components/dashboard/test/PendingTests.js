import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Table, Container } from "react-bootstrap";
import { BsCheckAll, BsFillPersonFill, BsPersonCheck } from "react-icons/bs";
import axios from "axios";
import TestCard from "./TestCard";

import Sidebar from "../../layout/Sidebar";
import "../../../App.css";

const PendingTest = ({ auth }) => {

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
    testList = tests?.filter(test => test.tester_id.length < 2).map((test, k) =>
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
          <div className="hero">
            <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/testHero.png"/>
            <h3 className="hero-text"><BsPersonCheck style={{marginBottom:'7px'}}/> Pending Tests</h3>
          </div>
          <Container className="dash-cards" style={{width:'90%'}}>
            <Table>
              <thead>
                <tr>
                  <th style={{textAlign:'center'}}>Title</th>
                  <th style={{textAlign:'center'}}>Description</th>
                  <th style={{textAlign:'center'}}>Course</th>
                  <th style={{textAlign:'center', width:'5%'}}><BsFillPersonFill size={'25px'} title="Students Attempted"/></th>
                  <th style={{textAlign:'center', width:'5%'}}><BsCheckAll size={'25px'} title="Approved?"/></th>
                  <th style={{width:'10%'}}></th>
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
)(PendingTest);