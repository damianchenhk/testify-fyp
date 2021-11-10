import React from 'react';
import {Row, Col, Form } from "react-bootstrap";

const TestQuestion = (props) => {
    const question = props.question;
    const options = props.options;
    const indexValue = props.indexValue;

    return(
        <div className="card-container">
            <div className="desc">
                <Row>
                    <h4 style={{textAlign: 'left'}}>{ question }</h4>
                    <Col sm={1}>
                        <Form.Check
                            type="radio"
                            aria-label="answer-a"
                            name={`answer-options-${indexValue}`}
                            id="answer-options"
                            value="A"
                            style={{
                                paddingTop: '2.5px'
                            }}
                            onChange={(event) => props.onChange(event.target.value)}
                        />
                    </Col>
                    <Col sm={11} style={{padding: '0'}}>
                        <h5 style={{margin: '0', float: 'left', marginBottom: '5px'}}>{ options[indexValue + (indexValue * 2)] }</h5>
                    </Col>
                    <Col sm={1}>
                        <Form.Check
                            type="radio"
                            aria-label="answer-b"
                            name={`answer-options-${indexValue}`}
                            id="answer-options"
                            value="B"
                            style={{
                                paddingTop: '2.5px'
                            }}
                            onChange={(event) => props.onChange(event.target.value)}
                        />
                    </Col>
                    <Col sm={11} style={{padding: '0'}}>
                        <h5 style={{margin: '0', float: 'left', marginBottom: '5px'}}>{ options[indexValue + (indexValue * 2) + 1] }</h5>
                    </Col>
                    <Col sm={1}>
                        <Form.Check
                            type="radio"
                            aria-label="answer-c"
                            name={`answer-options-${indexValue}`}
                            id="answer-options"
                            value="C"
                            style={{
                                paddingTop: '2.5px'
                            }}
                            onChange={(event) => props.onChange(event.target.value)}
                        />
                    </Col>
                    <Col sm={11} style={{padding: '0'}}>
                        <h5 style={{margin: '0', float: 'left', marginBottom: '30px'}}>{ options[indexValue + (indexValue * 2) + 2] }</h5>
                    </Col>
                </Row>
            </div>
        </div>
    )
};

export default TestQuestion;