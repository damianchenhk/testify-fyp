import React, { Component } from "react";
import { Row, Col, Table, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import axios from "axios";

import Sidebar from "../../layout/Sidebar";

class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: {}
        };
    }
    
      componentDidMount() {
        axios
            .get('/api/courses/'+this.props.match.params.id)
            .then(res => {
            this.setState({
                course: res.data
            })
        })
        .catch(err => {
            console.log("Error from CourseDetails");
        })
      };

      lessonTable = () => {
        let table = []
    
        for (let i = 0; i < 2; i++) {
            let children = []

            children.push(<td style={{textAlign:'center'}}>{i + 1}</td>)
            children.push(<td style={{textAlign:'center'}}>{this.state.course.lesson_names ? this.state.course.lesson_names[i] : null}</td>)
            children.push(<td>{this.state.course.lesson_descriptions ? this.state.course.lesson_descriptions[i] : null}</td>)
            table.push(<tr>{children}</tr>)
        }
        return table
      }

    render() {

        return (
            <>
                <Row>
                    <Col xs={2}>
                        <Sidebar/>
                    </Col>
                    <Col xs={10} className="align-items-center dashboard">
                        <h2>{this.state.course.course_name}</h2>
                        <h6>{this.state.course.course_description}</h6>
                        <br></br>
                        <Container>
                            <h4>Lessons</h4>
                            <Table bordered hover responsive style={{border:'1'}}>
                                <thead>
                                    <tr>
                                        <th style={{width:'10%', textAlign:'center'}}>No.</th>
                                        <th style={{textAlign:'center'}}>Lesson Name</th>
                                        <th style={{textAlign:'center'}}>Lesson Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.lessonTable()}
                                </tbody>
                            </Table>
                        </Container>
                        <br></br>
                        <Link to={{
                                pathname: `/viewcourse/${this.state.course._id}`,
                            }}
                            className="btn btn-large waves-effect waves-light hoverable accent-3"
                        >
                            Start Course
                        </Link>
                    </Col>
                </Row>
            </>
        );
    }
}

export default CourseDetails;