import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import TestCard from "./TestCard";

import Sidebar from "../../layout/Sidebar";

class YourTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tests: []
        };
      }
    
      componentDidMount() {
        axios
          .get('/api/tests')
          .then(res => {
            this.setState({
              tests: res.data
            })
          })
          .catch(err =>{
            console.log('Error from ShowTestList');
          })
      };

    render() {

        const tests = this.state.tests;
        let testList;
    
        if(!tests) {
            testList = "there is no test record!";
        } else {
            testList = tests.map((test, k) =>
            <TestCard test={test} key={k} />
          );
        }

        return (
            <>
                <Row>
                    <Col xs={2}>
                        <Sidebar/>
                    </Col>
                    <Col xs={10} className="align-items-center dashboard">
                    <div className="list">
                        {testList}
                    </div>
                    </Col>
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(YourTest);