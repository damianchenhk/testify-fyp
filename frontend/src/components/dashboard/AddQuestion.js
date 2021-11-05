import React, { Component } from "react";
import { FloatingLabel, Form, Col, Row } from "react-bootstrap";

class AddQuestion extends Component{

render(){

    const options = this.props.courseLessons.map((item) => {
        return (
            <option key={item} value={item}>
                {item}
            </option>
        )
    })

    return (
        <>
            <hr></hr>
            <h5>Question {this.props.indexValue + 1}</h5>
            <FloatingLabel
                controlId="floatingInput"
                label="Question"
                className="mb-3"
                style={{
                    width: '60%',
                    margin: 'auto'
                }}
            >
                <Form.Control
                    type="text"
                    name="questions"
                    placeholder="My Question"
                    style={{
                        marginBottom: '30px'
                    }}
                    onChange={(event) => this.props.onChange(event.target.value, event.target.name)}
                />
            </FloatingLabel>
            <Form.Group as={Row} className="mb-3" style={{width: '60%'}}>
                <Col sm={1} style={{padding: '0'}}>
                    <Form.Check
                        type="radio"
                        aria-label="answer-a"
                        name={`answer-options-${this.props.indexValue}`}
                        id="answer-options"
                        value="A"
                        onChange={(event) => this.props.onChange(event.target.value, event.target.id)}
                    />
                </Col>
                <Col sm={11} style={{padding: '0'}}>
                    <Form.Control
                        type="text"
                        name="options-a"
                        placeholder="Answer A"
                        style={{
                            height: '22px',
                            marginBottom: '20px'
                        }}
                        onChange={(event) => this.props.onChange(event.target.value, event.target.name)}
                    />
                </Col>
                <Col sm={1} style={{padding: '0'}}>
                    <Form.Check
                        type="radio"
                        aria-label="answer-b"
                        name={`answer-options-${this.props.indexValue}`}
                        id="answer-options"
                        value="B"
                        onChange={(event) => this.props.onChange(event.target.value, event.target.id)}
                    />
                </Col>
                <Col sm={11} style={{padding: '0'}}>
                    <Form.Control
                        type="text"
                        name="options-b"
                        placeholder="Answer B"
                        style={{
                            height: '22px',
                            marginBottom: '20px'
                        }}
                        onChange={(event) => this.props.onChange(event.target.value, event.target.name)}
                    />
                </Col>
                <Col sm={1} style={{padding: '0'}}>
                    <Form.Check
                        type="radio"
                        aria-label="answer-c"
                        name={`answer-options-${this.props.indexValue}`}
                        id="answer-options"
                        value="C"
                        onChange={(event) => this.props.onChange(event.target.value, event.target.id)}
                    />
                </Col>
                <Col sm={11} style={{padding: '0'}}>
                    <Form.Control
                        type="text"
                        name="options-c"
                        placeholder="Answer C"
                        style={{
                            height: '22px',
                            marginBottom: '20px'
                        }}
                        onChange={(event) => this.props.onChange(event.target.value, event.target.name)}
                    />
                </Col>
                <Form.Select
                    style={{
                        margin: '10px 0 10px'
                    }}
                    name="concept_tested"
                    onChange={(event) => this.props.onChange(event.target.value, event.target.name)}
                >
                    <option>Select The Lesson Tested</option>
                    {options}
                </Form.Select>
            </Form.Group>
        </>
    )};
}

export default AddQuestion;