import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import TestQuestion from "./TestQuestions";

class DoTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
          test: {}
        };
      }
    
      componentDidMount() {
        axios
          .get('/api/tests/'+this.props.match.params.id)
          .then(res => {
            this.setState({
              test: res.data
            })
          })
          .catch(err =>{
            console.log('Error from ShowTestList');
          })
      };

    render() {

        const questions = this.state.test.questions;
        const options = this.state.test.options;
        let questionList;
    
        if(!questions) {
            questionList = "there is no questions record!";
        } else {
            questionList = questions.map((question, k) =>
            <TestQuestion question={question} options={options} key={k} indexValue={k}/>
          );
        }

        return (
            <>
                <Row>
                    <Col xs={2}>
                        <Sidebar/>
                    </Col>
                    <Col xs={10} className="align-items-center dashboard">
                        <h2>{this.state.test.test_name}</h2>
                        <br></br>
                        <Container>
                            <Form>
                                {questionList}
                                <Button type="submit">Submit</Button>
                            </Form>
                        </Container>
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
)(DoTest);