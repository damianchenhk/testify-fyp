import React from 'react';
import {Row, Col, Form } from "react-bootstrap";

const ViewTestQuestion = (props) => {
    const question = props.question;
    const options = props.options;
    const indexValue = props.indexValue;
    const answer = props.answer;
    const answer_selected = props.answer_selected;

    return(
        <div className="card-container">
            <div className="desc">
                <Row>
                    <h4 style={{textAlign: 'left'}}>{ question }</h4>
                    <Col sm={1}>
                        <Form.Check
                            disabled
                            isValid={answer[indexValue]==='A'}
                            isInvalid={answer[indexValue]!=='A' && answer_selected[indexValue]==='A'}
                            checked={answer_selected[indexValue]==='A'}
                            type="radio"
                            aria-label="answer-a"
                            name={`answer-options-${indexValue}`}
                            id="answer-options"
                            value="A"
                            style={{
                                paddingTop: '4px',
                            }}
                        />
                    </Col>
                    <Col sm={11} style={{padding: '0'}}>
                        <h5 style={{
                            margin: '0', 
                            float: 'left',
                            marginBottom: '5px',
                            color: answer[indexValue]==='A' ? 'green' : answer[indexValue]!=='A' && answer_selected[indexValue]==='A' ? 'red' : 'black'
                        }}>{ options[indexValue + (indexValue * 2)] }</h5>
                    </Col>
                    <Col sm={1}>
                        <Form.Check
                            disabled
                            isValid={answer[indexValue]==='B'}
                            isInvalid={answer[indexValue]!=='B' && answer_selected[indexValue]==='B'}
                            checked={answer_selected[indexValue]==='B'}
                            type="radio"
                            aria-label="answer-b"
                            name={`answer-options-${indexValue}`}
                            id="answer-options"
                            value="B"
                            style={{
                                paddingTop: '4px'
                            }}
                        />
                    </Col>
                    <Col sm={11} style={{padding: '0'}}>
                        <h5 style={{
                            margin: '0',
                            float: 'left',
                            marginBottom: '5px',
                            color: answer[indexValue]==='B' ? 'green' : answer[indexValue]!=='B' && answer_selected[indexValue]==='B' ? 'red' : 'black'
                        }}>{ options[indexValue + (indexValue * 2) + 1] }</h5>
                    </Col>
                    <Col sm={1}>
                        <Form.Check
                            disabled
                            isValid={answer[indexValue]==='C'}
                            isInvalid={answer[indexValue]!=='C' && answer_selected[indexValue]==='C'}
                            checked={answer_selected[indexValue]==='C'}
                            type="radio"
                            aria-label="answer-c"
                            name={`answer-options-${indexValue}`}
                            id="answer-options"
                            value="C"
                            style={{
                                paddingTop: '4px'
                            }}
                        />
                    </Col>
                    <Col sm={11} style={{padding: '0'}}>
                        <h5 style={{
                            margin: '0',
                            float: 'left',
                            marginBottom: '30px',
                            color: answer[indexValue]==='C' ? 'green' : answer[indexValue]!=='C' && answer_selected[indexValue]==='C' ? 'red' : 'black'
                        }}>{ options[indexValue + (indexValue * 2) + 2] }</h5>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default ViewTestQuestion;