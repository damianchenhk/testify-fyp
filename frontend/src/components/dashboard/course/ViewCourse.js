import React, { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";

import Sidebar from "../../layout/Sidebar";

class ViewCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: {},
            lessonIndex: 0,
        };
      }
      
    
    componentDidMount() {
    //console.log("Print id: " + this.props.match.params.id);
    axios
        .get('/api/courses/'+this.props.match.params.id)
        .then(res => {
        // console.log("Print-showBookDetails-API-response: " + res.data);
            this.setState({
                course: res.data
            })
        })
        .catch(err => {
            console.log("Error from ViewCourse");
        })
    };

    nextLesson(){
        this.setState((prevState)=>{
            return {
            lessonIndex: prevState.lessonIndex + 1
            }
        })
    }

    previousLesson(){
        this.setState((prevState)=>{
            return {
            lessonIndex: prevState.lessonIndex - 1
            }
        })
    }

    render() {

        const lessonIndex = this.state.lessonIndex;
        const lessonName = this.state.course.lesson_names;
        const lessonUrl = this.state.course.lesson_urls;
        const lessonDescription = this.state.course.lesson_descriptions;

        function getLessonNameLength() {
            if(lessonName) { return lessonName.length} 
         else return 0 
         } 

        return (
            <>
                <Row>
                    <Col xs={2}>
                        <Sidebar/>
                    </Col>
                    <Col xs={10} className="align-items-center dashboard">
                        <ReactPlayer
                            className='react-player'
                            url={lessonUrl ? lessonUrl[lessonIndex] : null}
                            width='100%'
                            height='auto'
                            controls = {true}
                            style={{marginTop: '30px'}}
                        />
                        <Row>
                            <Col xs={6}>
                                {lessonIndex !== 0 && <button
                                    className="btn btn-large waves-effect waves-light hoverable accent-3 previous-button"
                                    onClick={this.previousLesson.bind(this)}
                                >
                                    {lessonName ? lessonName[lessonIndex - 1] : null}
                                </button>}
                            </Col>
                            <Col xs={6}>
                                {lessonIndex + 1 !== getLessonNameLength() && <button
                                    className="btn btn-large waves-effect waves-light hoverable accent-3 next-button"
                                    onClick={this.nextLesson.bind(this)}
                                >
                                    {lessonName ? lessonName[lessonIndex + 1] : null}
                                </button>}
                            </Col>
                        </Row>
                        <h2> {lessonName ? lessonName[lessonIndex] : null} </h2>
                        <p> {lessonDescription ? lessonDescription[lessonIndex] : null} </p>
                        <Link to={{pathname: `/addtest/${this.props.match.params.id}`}} className="btn btn-large waves-effect waves-light hoverable accent-3">
                            Create Test
                        </Link>
                    </Col>
                </Row>
            </>
        );
    }
}

ViewCourse.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(ViewCourse);