import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Table, Container, Tabs, Tab, Form } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import ViewTestQuestions from "../test/ViewTestQuestions";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const InstructorReport = ({ auth }) => {

    const { id } = useParams()

    const [course, setCourse] = useState({});
    const [reports, setReports] = useState({});
    const [tests, setTests] = useState({});
    const [lessonStats, setLessonStats] = useState({});
    const [questionOptions, setQuestionOptions] = useState();
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [testOptions, setTestOptions] = useState();
    const [studentQuestionStats, setStudentQuestionStats] = useState({
        studentIndex: '',
        type: "",
        filled: false
    });

    useEffect(() => {
        axios
            .get('/api/courses/'+id)
            .then(res => {
                setCourse(res.data)
            axios
                .post('/api/reports/getCourseStudents', {course_id: id})
                .then(res => {
                    setReports(res.data)
                axios
                    .post('/api/tests/courseTests', {course_id: id})
                    .then(res => {
                        setTests(res.data)
                    })
                    .catch(err => {
                        console.log("Error from courseTests")
                    })
                })
                .catch(err => {
                    console.log("Error from getCourseStudents");
                })
            })
        .catch(err => {
            console.log("Error from CourseDetails");
        })
    }, [])

    const lessonOptions = course.lesson_names?.map((item, key) => {
        return (
            <option key={key} value={item}>
                {item}
            </option>
        )
    })

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
                sortedReports[i].ranking = i + 1;

            }
            return (
                <Table bordered responsive style={{border:'1'}}>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center', width:'5%'}}>No.</th>
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
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6', borderLeft:'none'}}>{report.ranking}</td>
                                <td style={{border:'solid 1px #dee2e6'}}>{report.student_name}</td>
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{report.tests_created.length}</td>
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{report.tests_taken.length}</td>
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{report.totalScore}</td>
                                <td style={{textAlign:'center', border:'solid 1px #dee2e6', borderRight:'none'}}>{report.percentageScore + "%"}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        }else{
            return (
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center', width:'5%'}}>No.</th>
                            <th style={{textAlign:'center'}}>Student Name</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. Tests Created</th>
                            <th style={{textAlign:'center', width:'10%'}}>No. Tests Done</th>
                            <th style={{textAlign:'center', width:'10%'}}>Participation Score</th>
                            <th style={{textAlign:'center', width:'10%'}}>Participation %</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={6} style={{textAlign:'center'}}>There are no students registered</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    const lessonBreakdownChart = (lesson) => {
        let lessonStats = {
            lesson_name: lesson,
            student_report: [],
            wrongAnswer: 0,
            correctAnswer: 0
        };
        for(let reportIndex = 0; reportIndex < reports?.length; reportIndex++){
            lessonStats.student_report.push({
                student_name: reports[reportIndex].student_name,
                test: []
            })
            for(let testIndex = 0; testIndex < reports[reportIndex].tests_taken?.length; testIndex++){
                if(reports[reportIndex].tests_taken[testIndex].lesson_tested.includes(lesson)){
                    lessonStats.student_report[reportIndex].test.push({
                        test_id: reports[reportIndex].tests_taken[testIndex].test_id,
                        questions: []
                    })
                    for(let questionIndex = 0; questionIndex < reports[reportIndex].tests_taken[testIndex].result?.length; questionIndex++){
                        if(reports[reportIndex].tests_taken[testIndex].lesson_tested[questionIndex] === lesson){
                            if(reports[reportIndex].tests_taken[testIndex].result[questionIndex] === 0){
                                lessonStats.wrongAnswer++
                            }else{
                                lessonStats.correctAnswer++
                            }
                            lessonStats.student_report[reportIndex].test[testIndex].questions.push({
                                question_num: questionIndex,
                                answer: reports[reportIndex].tests_taken[testIndex].answers[questionIndex],
                                result: reports[reportIndex].tests_taken[testIndex].result[questionIndex]
                            })
                        }
                    }
                }
            }
        }
        setLessonStats(lessonStats);
        setStudentQuestionStats({
            studentIndex: '',
            type: "",
            filled: false
        })
        setSelectedQuestion(null)
    }

    const pieData = {
        labels: ['Correct Answers', 'Wrong Answers'],
        datasets: [
            {
                label: '# of Answers',
                data: [lessonStats.correctAnswer, lessonStats.wrongAnswer],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Individual Student Breakdown',
          },
        },
        scales: {
            x: {
                ticks: {
                    stepSize: 1
                }
            }
        },
        onClick: function(event, element){
            setTestOptions()
            setSelectedQuestion(null)
            if(element.length > 0){
                if(element[0].datasetIndex === 0){
                    let studentQuestionParams = {
                        studentIndex: element[0].index,
                        type: "correct",
                        filled: true
                    }
                    setStudentQuestionStats(studentQuestionParams)
                    setQuestionOptions()
                }else {
                    let studentQuestionParams = {
                        studentIndex: element[0].index,
                        type: "wrong",
                        filled: true
                    }
                    setStudentQuestionStats(studentQuestionParams)
                    setQuestionOptions()
                }
            }
            setTestOptions(
                tests.filter((tests) => lessonStats.student_report[element[0].index].test.map(test => test.test_id).includes(tests._id)).map((filteredTests , index) => (
                    <option key={index} value={JSON.stringify({index, test_id: filteredTests._id})}>{filteredTests.test_name}</option>
                ))
            )
        }
      };
      
    const labels = lessonStats.student_report?.map((student_report) => student_report.student_name);

    const barChartData = () => {
        let barData = []
        for (let reportIndex = 0; reportIndex < lessonStats.student_report?.length; reportIndex++){
            var correctCount = 0;
            var wrongCount = 0;
            for(let testIndex = 0; testIndex < lessonStats.student_report[reportIndex].test.length; testIndex++){
                for(let questionIndex = 0; questionIndex < lessonStats.student_report[reportIndex].test[testIndex].questions.length; questionIndex++){
                    if(lessonStats.student_report[reportIndex].test[testIndex].questions[questionIndex].result === 0){
                        wrongCount++
                    }else{
                        correctCount++
                    }
                }
            }
            barData.push({
                student_name: lessonStats.student_report[reportIndex].student_name,
                correctCount: correctCount,
                wrongCount: wrongCount
            })
        }
        return barData
    }
      
    const data = {
        labels,
        datasets: [
            {
                label: 'Correct Answers',
                data: barChartData()?.map((counts) => counts.correctCount),
                borderColor: 'rgba(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Wrong Answers',
                data: barChartData()?.map((counts) => counts.wrongCount),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    
    const selectedQuestionOptions = (event) => {
        setSelectedQuestion(null)
        let tempOptions = []
        if(event < 0){
            setQuestionOptions();
        }else {
            for(let questionIndex = 0; questionIndex < lessonStats.student_report[studentQuestionStats.studentIndex].test[JSON.parse(event).index].questions?.length; questionIndex++){
                tempOptions.push(<option key={questionIndex} value={JSON.stringify({test:JSON.parse(event).test_id, question:lessonStats.student_report[studentQuestionStats.studentIndex].test[JSON.parse(event).index].questions[questionIndex].question_num})}>Question {lessonStats.student_report[studentQuestionStats.studentIndex].test[JSON.parse(event).index].questions[questionIndex].question_num + 1}</option>)
            }
            setQuestionOptions(tempOptions)
        }
    }

    const selectedQuestionSet = (event) => {
        let tempQuestionNum = JSON.parse(event).question
        let tempQuestionSelect = {
            question: tests.filter((tests) => tests._id === JSON.parse(event).test)[0].questions[tempQuestionNum],
            options: [
                tests.filter((tests) => tests._id === JSON.parse(event).test)[0].options[tempQuestionNum + (tempQuestionNum * 2)],
                tests.filter((tests) => tests._id === JSON.parse(event).test)[0].options[tempQuestionNum + (tempQuestionNum * 2) + 1],
                tests.filter((tests) => tests._id === JSON.parse(event).test)[0].options[tempQuestionNum + (tempQuestionNum * 2) + 2]
            ],
            answer: [tests.filter((tests) => tests._id === JSON.parse(event).test)[0].answers[tempQuestionNum]],
            answer_selected: [lessonStats.student_report[studentQuestionStats.studentIndex].test.filter((tests) => tests.test_id === JSON.parse(event).test)[0].questions.filter(question => question.question_num === tempQuestionNum)[0].answer],
            key: 0,
            indexValue: tempQuestionNum
        }
        setSelectedQuestion(tempQuestionSelect)
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
                        <h4>Course Statistics</h4>
                        <Tabs defaultActiveKey="studentScores" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="studentScores" title="Student Scores">
                                {statsTable()}
                            </Tab>
                            <Tab eventKey="lessonBreakdown" title="Lesson Breakdown">
                                <Row>
                                    <Col xs={5}>
                                        <Form.Select aria-label="Lesson Select"
                                            onChange={(event => lessonBreakdownChart(event.target.value))}
                                        >
                                            <option>Select Lesson</option>
                                            {lessonOptions}
                                        </Form.Select>
                                        <Pie data={pieData}/>
                                    </Col>
                                    <Col xs={7}>
                                        <Bar options={options} data={data} />
                                    </Col>
                                </Row>
                                {studentQuestionStats.filled && <Row>
                                    <h5>{lessonStats.student_report[studentQuestionStats.studentIndex].student_name}'s {lessonStats.lesson_name} Stats</h5>
                                    <Col xs={6}>
                                        <Form.Select aria-label="Test Select"
                                            onChange={(event => selectedQuestionOptions(event.target.value))}
                                        >
                                            <option value={-1}>Select Test</option>
                                            {testOptions}
                                        </Form.Select>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Select aria-label="Question Select"
                                            onChange={(event => selectedQuestionSet(event.target.value))}
                                        >
                                            <option>Select Question</option>
                                            {questionOptions}
                                        </Form.Select>
                                    </Col>
                                </Row>}
                                {selectedQuestion !== null && 
                                    <Row style={{border: '1px solid rgb(222, 226, 230)', marginBottom: '10px'}}>
                                        <h5 style={{marginTop: '10px'}}>Question {selectedQuestion.indexValue + 1}:</h5>
                                        <ViewTestQuestions
                                            question={selectedQuestion.question}
                                            options={selectedQuestion.options}
                                            answer={selectedQuestion.answer}
                                            answer_selected={selectedQuestion.answer_selected}
                                            key={selectedQuestion.indexValue}
                                            indexValue={0}
                                        />
                                    </Row>
                                }
                            </Tab>
                            <Tab eventKey="testBreakdown" title="Test Breakdown">
                                
                            </Tab>
                        </Tabs>
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