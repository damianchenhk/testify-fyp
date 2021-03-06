import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, FloatingLabel, Form, Button, Container } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import axios from 'axios';

import Sidebar from "../../layout/Sidebar";
import AddQuestion from "./AddQuestion";
import "../../../App.css";

class AddTest extends Component {

    constructor(props) {
        super(props);
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.state = {
            inputList: [],
            creator_id: this.props.auth.user.id,
            creator_name: this.props.auth.user.name,
            course_id: this.props.match.params.id, 
            test_name: '',
            test_description: '',
            questions: [],
            options: [],
            answers: [],
            concept_tested: [],
            concept_weightage: [],
            tester_id: [],
            course: {},
            report: {},
            totalScore: '',
            error: '',
            error_view: false
        };
    }

    componentDidMount() {
        axios
            .get('/api/courses/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    course: res.data
                })
                const data = {
                    student_id: this.props.auth.user.id,
                    course_id: this.props.match.params.id
                }
                axios
                .post('/api/reports/getReportID', data)
                .then(res2 => {
                    this.setState({
                        report: res2.data[0]
                    })
                })
                .catch(err =>{
                    console.log('Error from GetReport');
                })
            })
            .catch(err => {
                console.log("Error from ViewCourse");
            })
        };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

        const data = {
            creator_id: this.state.creator_id,
            creator_name: this.state.creator_name,
            course_id: this.state.course_id, 
            test_name: this.state.test_name,
            test_description: this.state.test_description,
            questions: this.state.questions,
            options: this.state.options,
            answers: this.state.answers,
            concept_tested: this.state.concept_tested,
            concept_weightage: this.state.concept_weightage,
            tester_id: this.state.tester_id,
        };

        if(!this.state.inputList.length){
            this.setState({error: 'You have not added any questions!'})
            this.setState({error_view: true})
        }else {
            axios
            .post('/api/tests/', data)
            .then(res => {
                console.log(res.data.data._id)
                let tests_created = this.state.report.tests_created;

                tests_created.push(res.data.data._id)
                let participation_score = this.state.report.participation_score;
                participation_score += this.state.totalScore;
                const data2 = {
                    tests_created: tests_created,
                    participation_score: participation_score
                }
                axios
                    .put('/api/reports/'+this.state.report._id, data2)
                    .then(res => {
                        this.setState({
                            inputList: [],
                            creator_id: this.props.auth.user.id,
                            course_id: this.props.match.params.id, 
                            test_name: '',
                            test_description: '',
                            questions: [],
                            options: [],
                            answers: [],
                            concept_tested: [],
                            concept_weightage: [],
                            tester_id: [],
                        })
                        this.props.history.push('/dashboard');
                    })
                    .catch(err => {
                        console.log("Error in UpdateReport!");
                    });
            })
            .catch(err => {
                console.log("Error in AddTest!");
            })
        }
    };


    onAddBtnClick(event) {
        const inputList = this.state.inputList;
        this.setState({error_view: false})
        this.setState({
            inputList: inputList.concat(
                <AddQuestion
                    onChange={(value, name) => {this.setNameState(value, name, inputList.length)}}
                    key={inputList.length}
                    indexValue={inputList.length} 
                    courseLessons={this.state.course.lesson_names}
                />)
        });
    }

    setNameState(value, name, index){
        switch(name){
            case 'questions':{
                let items = [...this.state.questions];
                let item = {...items[index]};
                item.questions = value;
                items[index] = item.questions;

                this.setState({questions: items});
                break;
            }
            case 'options-a':{
                let items = [...this.state.options];
                let item = {...items[index + (index * 2)]};
                item.options = value;
                items[index + (index * 2)] = item.options;

                this.setState({options: items});
                break;
            }
            case 'options-b':{
                let items = [...this.state.options];
                let item = {...items[index + (index * 2) + 1]};
                item.options = value;
                items[index + (index * 2) + 1] = item.options;

                this.setState({options: items});
                break;
            }
            case 'options-c':{
                let items = [...this.state.options];
                let item = {...items[index + (index * 2) + 2]};
                item.options = value;
                items[index + (index * 2) + 2] = item.options;

                this.setState({options: items});
                break;
            }
            case 'answer-options':{
                let items = [...this.state.answers];
                let item = {...items[index]};
                item.answers = value;
                items[index] = item.answers;

                this.setState({answers: items});
                break;
            }
            case 'concept_tested':{
                let items = [...this.state.concept_tested];
                let item = {...items[index]};
                item.concept_tested = JSON.parse(value).value;
                items[index] = item.concept_tested;

                this.setState({concept_tested: items});

                let items2 = [...this.state.concept_weightage];
                let item2 = {...items2[index]};
                item2.concept_weightage = this.state.course.lesson_weightage[JSON.parse(value).key];
                items2[index] = item2.concept_weightage;

                this.setState({concept_weightage: items2});
                var totalScore = 0;
                for(let i = 0; i < items2.length; i++){
                    totalScore += items2[i];
                }
                this.setState({totalScore: totalScore});
                break;
            }
        }
    }

    render() {
        const { user } = this.props.auth;

        return (
            <>
                <div className="web-page">
                    <Col>
                        <Sidebar/>
                    </Col>
                    <Col className="dashboard">
                        <div className="hero">
                            <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/testHero.png"/>
                            <h3 className="hero-text"><IoMdAdd style={{marginBottom:'10px', marginRight:'10px'}}/>Create Test</h3>
                        </div>
                        <Container className="dash-cards" style={{width:'80%'}}>
                            <br></br>
                            {this.state.error_view && 
                                <>
                                    <h6 className="error-message">{this.state.error}</h6>
                                    <br></br>
                                </>
                            }
                            <Form onSubmit={this.onSubmit}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Test Title"
                                    className="mb-3"
                                    style={{
                                        width:'90%',
                                        margin:'auto'
                                    }}
                                >
                                    <Form.Control
                                        type="text"
                                        name="test_name"
                                        placeholder="My Test Title"
                                        style={{
                                            marginBottom: '30px'
                                        }}
                                        value={this.state.test_name}
                                        onChange={this.onChange}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="Description"
                                    style={{
                                        width:'90%',
                                        margin:'auto'
                                    }}
                                >
                                    <Form.Control
                                    as="textarea"
                                    name="test_description"
                                    placeholder="Leave a description here"
                                    style={{ 
                                        height: '100px',
                                        marginBottom: '30px'
                                    }}
                                    value={this.state.test_description}
                                    onChange={this.onChange}
                                    required
                                    />
                                </FloatingLabel>
                                {this.state.inputList}
                                <Button className="btn waves-effect waves-light accent-3 outline-btn" onClick={this.onAddBtnClick} style={{marginBottom: '30px'}}>
                                    Add Question
                                </Button>
                                <hr></hr>
                                <Button className="btn btn-large waves-effect waves-light accent-3" type="submit" style={{marginBottom: '30px'}}>
                                    Submit
                                </Button>
                            </Form>
                        </Container>
                    </Col>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(AddTest);