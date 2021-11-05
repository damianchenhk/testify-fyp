import React, { Component, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FloatingLabel, Form, ProgressBar } from "react-bootstrap";
import axios from "axios";

class AddLesson extends Component{

    constructor(props) {
        super(props);
        this.state = {
          uploadPercentage: 0,
    };}

    uploadFile = async e => {
        e.preventDefault();
        const file = e.target.files[0]

        const  {url}  = await fetch("/s3Url").then(res => res.json())
        console.log(url)

        axios.put(url, file, {
                headers: {
                    'Content-Type': "video/mp4",
                },
                onUploadProgress: (ProgressEvent) => {
                    const {loaded, total} = ProgressEvent;
                    let percent = Math.floor(loaded * 100 / total)
                    console.log(`${loaded} of ${total} | ${percent}%`);

                    if(percent < 100){
                        this.setState({uploadPercentage: percent})
                    }
                },
                transformRequest: [(data, headers) => {delete headers.common.Authorization;     return data }]
        })
        .then(response => { 
            console.log(response)
            this.setState({uploadPercentage: 100}, () => {
                setTimeout(() => {
                    this.setState({uploadPercentage: 0})
                }, 1000);
            })
            const imageUrl = url.split('?')[0]
            console.log(imageUrl)
            this.props.onChange(imageUrl, "lesson_urls")
        })
        .catch((error) => console.log(error.response) )

    }
render(){
    const {uploadPercentage} = this.state.uploadPercentage;
    return (
        <>
            <hr></hr>
            <FloatingLabel
                controlId="floatingInput"
                label="Lesson Title"
                className="mb-3"
                style={{
                    width: '60%',
                    margin: 'auto'
                }}
            >
                <Form.Control
                    type="text"
                    name="lesson_names"
                    placeholder="My Lesson Title"
                    style={{
                        marginBottom: '30px'
                    }}
                    onChange={(event) => this.props.onChange(event.target.value, event.target.name)}
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingTextarea"
                label="Description"
                style={{
                    width: '60%',
                    margin: 'auto'
                }}
            >
                <Form.Control
                as="textarea"
                name="lesson_descriptions"
                placeholder="Leave a description here"
                style={{ 
                    height: '100px',
                    marginBottom: '30px'
                }}
                onChange={(event) => this.props.onChange(event.target.value, event.target.name)}
                />
            </FloatingLabel>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label
                        style={{
                            textAlign: 'center',
                        }}
                    >Upload Lesson Video</Form.Label>
                    <Form.Control
                        type="file"
                        accept="video/mp4"
                        style={{
                            width: '60%',
                            margin: 'auto',
                            marginBottom: '30px'
                        }}
                        onChange={(e) => this.uploadFile(e)}
                    />
                    {this.state.uploadPercentage > 0 && <ProgressBar 
                        now={this.state.uploadPercentage}
                        active
                        label={`${this.state.uploadPercentage}%`}
                        style={{
                            height: '15px',
                            width: '60%',
                            margin: 'auto'
                        }}
                    />}
                </Form.Group>
            <FloatingLabel
                controlId="floatingInput"
                label="Lesson Weightage"
                className="mb-3"
                style={{
                    width: '60%',
                    margin: 'auto'
                }}
            >
                <Form.Control
                    type="text"
                    name="lesson_weightage"
                    placeholder="My Lesson Weightage"
                    style={{
                        marginBottom: '30px'
                    }}
                    onChange={(event) => this.props.onChange(event.target.value, event.target.name)}
                />
            </FloatingLabel>
        </>
    )};
}

export default AddLesson;