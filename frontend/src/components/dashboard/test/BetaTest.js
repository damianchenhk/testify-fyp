import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import TestQuestion from "./TestQuestions";

const BetaTest = ({auth}) => {

  const { id } = useParams();

  const [test, setTest] = useState({});
  const [report, setReport] = useState({});
  const [answer_selected, setAnswerSelected] = useState([]);
  const history = useHistory();
    
  useEffect(() => {
    axios
      .get('/api/tests/'+id)
      .then(res => {
        setTest(res.data);

        const data = {
          student_id: auth.user.id,
          course_id: res.data.course_id
        }
        axios
          .post('/api/reports/getReportID', data)
          .then(res2 => {
            setReport(res2.data[0])
          })
          .catch(err =>{
            console.log('Error from ShowTestList');
          })
      }).catch(err =>{
        console.log('Error from Initial Setup');
      })
  }, []);

  const onChange = (value, index) => {
    let items = answer_selected;
    let item = {...items[index]};
    item.answer_selected = value;
    items[index] = item.answer_selected;

    setAnswerSelected(items);
  }

  const onSubmit = e => {
    e.preventDefault();

    let currentScore = [];
    for(var i=0; i < test.answers.length; i++){
      if(answer_selected[i] === test.answers[i]){
        currentScore[i] = 1.5;
      }else{
        currentScore[i] = 0;
      }
    }

    const data = {
      tests_taken: report.tests_taken.concat({
        test_id: id,
        answers: answer_selected,
        weightage: test.concept_weightage,
        result: currentScore,
        lesson_tested: test.concept_tested
      })
    }
    axios
      .put('/api/reports/'+report._id, data)
      .then(res => {
        history.push('/betaresult', {answer: answer_selected, test: test, score: currentScore});
      })
      .catch(err => {
          console.log("Error in Reports!");
      });
  }

  const questions = test.questions;
  const options = test.options;
  let questionList;

  if(!questions) {
    questionList = "There are no question records!";
  } else {
      questionList = questions.map((question, k) =>
      <TestQuestion
        onChange={(value) => {onChange(value, k)}}
        question={question}
        options={options}
        key={k}
        indexValue={k}/>
    );
  }

  return (
    <>
      <div className="web-page">
          <Col>
              <Sidebar/>
          </Col>
          <Col className="dashboard">
              <br></br>
              <h3 className="test-taking">{test.test_name}</h3>
              <Container className="dash-cards" style={{width:'80%'}}>
                <br></br>
                <div style={{margin:'20px'}}>
                  <Form onSubmit={onSubmit}>
                      {questionList}
                      <hr></hr>
                      <Button type="submit" className="btn btn-large waves-effect waves-light accent-3">Submit</Button>
                      <br></br>
                  </Form>
                </div>
              </Container>
              <br></br>
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
)(BetaTest);