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
  const [score, setScore] = useState(0);
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
    let answers = [...test.answers];
    let item = {...items[index]};
    let currentScore = [];
    item.answer_selected = value;
    items[index] = item.answer_selected;

    setAnswerSelected(items);
    for(var i=0; i < answers.length; i++){
      if(items[i] === answers[i]){
        currentScore[i] = 1.5;
      }else{
        currentScore[i] = 0;
      }
    }
    setScore(currentScore);
  }

  const onSubmit = e => {
    e.preventDefault();

    const data = {
      tests_taken: report.tests_taken.concat({
        test_id: id,
        answers: answer_selected,
        weightage: test.concept_weightage,
        result: score,
        lesson_tested: test.concept_tested
      })
    }
    axios
      .put('/api/reports/'+report._id, data)
      .then(res => {
        history.push('/betaresult', {answer: answer_selected, test: test, score: score});
      })
      .catch(err => {
          console.log("Error in Reports!");
      });
  }

  const questions = test.questions;
  const options = test.options;
  let questionList;

  if(!questions) {
      questionList = "there is no questions record!";
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
          <Col className="align-items-center dashboard">
              <br></br>
              <h2>{test.test_name}</h2>
              <br></br>
              <Container>
                  <Form onSubmit={onSubmit}>
                      {questionList}
                      <Button type="submit" className="btn btn-large waves-effect waves-light accent-3">Submit</Button>
                      <br></br>
                  </Form>
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
)(BetaTest);