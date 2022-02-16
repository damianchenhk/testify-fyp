import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { Row, Col, Table, Container, Button, Form } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

import Sidebar from "../../layout/Sidebar";

const InstructorReport = ({ auth }) => {

    const { id } = useParams()

    const [course, setCourse] = useState({});
    const [reports, setReports] = useState({});

    useEffect(() => {
        axios
            .get('/api/courses/'+id)
            .then(res => {
                setCourse(res.data)
            axios
                .post('/api/reports/getCourseStudents', {course_id: id})
                .then(res => {
                    setReports(res.data)
                })
                .catch(err => {
                    console.log("Error from courseTests");
                })
            })
        .catch(err => {
            console.log("Error from CourseDetails");
        })
    }, [])

    const lessonTable = () => {
        let table = []
    
        for (let i = 0; i < course.lesson_names?.length; i++) {
            let children = []

            children.push(<td style={{textAlign:'center'}}>{i + 1}</td>)
            children.push(<td style={{textAlign:'center'}}>{course.lesson_names ? course.lesson_names[i] : null}</td>)
            children.push(<td>{course.lesson_descriptions ? course.lesson_descriptions[i] : null}</td>)
            table.push(<tr key={i}>{children}</tr>)
        }
        return table
    }

    const statsTable = () => {
        if(reports.length){
            let sortedReports = [...reports];
            for (let i = 0; i < sortedReports?.length; i++) {
                var score = 0

                for(let testIndex = 0; testIndex < sortedReports[i].tests_taken?.length; testIndex++){
                    for(let questionIndex = 0; questionIndex < sortedReports[i].tests_taken[testIndex].result?.length; questionIndex++){
                        score += sortedReports[i].tests_taken[testIndex].result[questionIndex] * sortedReports[i].tests_taken[testIndex].weightage[questionIndex]
                    }
                }
                sortedReports[i].totalScore = score + sortedReports[i].participation_score

            }
            sortedReports.sort((a, b) => {
                if (a.totalScore < b.totalScore) {
                    return 1;
                }
                if (a.totalScore > b.totalScore) {
                    return -1;
                }
                    return 0;
            });
            const totalPercentage = sortedReports[0].totalScore;
            for (let i = 0; i < sortedReports?.length; i++) {

                sortedReports[i].percentageScore = (sortedReports[i].totalScore / totalPercentage * 100).toFixed(0);

            }
            return (
                <Table bordered responsive style={{border:'1'}}>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Student Name</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. Tests Created</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. Tests Done</th>
                            <th style={{textAlign:'center', width:'10%'}}>Participation Score</th>
                            <th style={{textAlign:'center', width:'10%'}}>Participation %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReports.map(report => (
                            <tr key={report.id}>
                                <td><h6>{report.student_name}</h6></td>
                                <td style={{textAlign:'center'}}>{report.tests_created.length}</td>
                                <td style={{textAlign:'center'}}>{report.tests_taken.length}</td>
                                <td style={{textAlign:'center'}}>{report.totalScore}</td>
                                <td style={{textAlign:'center'}}>{report.percentageScore + "%"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        }else{
            return (
                <Table bordered responsive style={{border:'1'}}>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Student Name</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. Tests Created</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. Tests Done</th>
                            <th style={{textAlign:'center', width:'10%'}}>Participation Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={4} style={{textAlign:'center'}}>There are no students registered</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    return (
        <>
            <Row>
                <Col xs={2}>
                    <Sidebar/>
                </Col>
                <Col xs={10} className="align-items-center dashboard">
                    <br></br>
                    <h2>{course.course_name}</h2>
                    <h6>{course.course_description}</h6>
                    <br></br>
                    <Container>
                        <h4>Lessons</h4>
                        <Table bordered responsive style={{border:'1'}}>
                            <thead>
                                <tr>
                                    <th style={{width:'10%', textAlign:'center'}}>No.</th>
                                    <th style={{textAlign:'center'}}>Lesson Name</th>
                                    <th style={{textAlign:'center'}}>Lesson Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lessonTable()}
                            </tbody>
                        </Table>
                    </Container>
                    <br></br>
                    <Container>
                        <br></br>
                        <br></br>
                        <h4>Student Statistics</h4>
                        {statsTable()}
                    </Container>
                </Col>
            </Row>
        </>
    );
}

InstructorReport.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(InstructorReport);