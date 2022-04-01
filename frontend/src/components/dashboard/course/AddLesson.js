import React, { Component } from "react";
import { FloatingLabel, Form, ProgressBar } from "react-bootstrap";
import axios from "axios";

class AddLesson extends Component{

    constructor(props) {
        super(props);
        this.state = {
          uploadPercentage: 0,
          lesson_names: props.lesson_name || '',
          lesson_descriptions: props.lesson_description || '',
          lesson_weightage: props.lesson_weightage || '',
          lesson_urls: props.lesson_url || ''
    };}

    onTempChange = e => {
        this.setState({[e.target.name]: e.target.value})
        this.props.onChange(e.target.value, e.target.name)
    }

    uploadFile = async e => {
        e.preventDefault();
        const file = e.target.files[0]

        const  {url}  = await fetch("/s3Url").then(res => res.json())

        axios.put(url, file, {
                headers: {
                    'Content-Type': "video/mp4",
                },
                onUploadProgress: (ProgressEvent) => {
                    const {loaded, total} = ProgressEvent;
                    let percent = Math.floor(loaded * 100 / total)

                    if(percent < 100){
                        this.setState({uploadPercentage: percent})
                    }
                },
                transformRequest: [(data, headers) => {delete headers.common.Authorization;     return data }]
        })
        .then(response => { 
            this.setState({uploadPercentage: 100}, () => {
                setTimeout(() => {
                    this.setState({uploadPercentage: 0})
                }, 1000);
            })
            const imageUrl = url.split('?')[0]
            this.onTempChange({target:{value: imageUrl, name: "lesson_urls"}})
        })
        .catch((error) => console.log(error.response) )

    }
render(){
    return (
        <>
            <hr></hr>
            <br></br>
            <h5>Lesson {this.props.indexValue + 1}</h5>
            <FloatingLabel
                controlId="floatingInput"
                label="Lesson Title"
                className="mb-3"
                style={{
                    width: '90%',
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
                    onChange={(event) => this.onTempChange(event)}
                    value={this.state.lesson_names}
                    required
                />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingTextarea"
                label="Description"
                style={{
                    width: '90%',
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
                onChange={(event) => this.onTempChange(event)}
                value={this.state.lesson_descriptions}
                required
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
                            width: '90%',
                            margin: 'auto',
                            marginBottom: '30px'
                        }}
                        onChange={(e) => this.uploadFile(e)}
                    />
                    {this.state.uploadPercentage > 0 && <ProgressBar 
                        now={this.state.uploadPercentage}
                        active="true"
                        label={`${this.state.uploadPercentage}%`}
                        style={{
                            height: '15px',
                            width: '90%',
                            margin: 'auto'
                        }}
                    />}
                </Form.Group>
            <FloatingLabel
                controlId="floatingInput"
                label="Lesson Weightage"
                className="mb-3"
                style={{
                    width: '90%',
                    margin: 'auto'
                }}
            >
                <Form.Control
                    type="number"
                    name="lesson_weightage"
                    placeholder="My Lesson Weightage"
                    style={{
                        marginBottom: '30px'
                    }}
                    onChange={(event) => this.onTempChange(event)}
                    value={this.state.lesson_weightage}
                    required
                />
            </FloatingLabel>
        </>
    )};
}

export default AddLesson;