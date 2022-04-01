import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row , Col, Table, Container, Tabs, Tab, Form, Button } from "react-bootstrap";
import { BsCameraVideo, BsBarChartLine, BsAwardFill, BsHash, BsFillPenFill, BsFillPersonFill, BsFillCameraVideoFill, BsPenFill } from "react-icons/bs";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaHandshake } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import ViewTestQuestions from "../test/ViewTestQuestions";
import '../../../App.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ArcElement, Tooltip, Legend);

const InstructorReport = ({ auth }) => {

    const { id } = useParams()

    const [course, setCourse] = useState({});
    const [reports, setReports] = useState({});
    const [tests, setTests] = useState({});
    const [feedbacks, setFeedbacks] = useState({});
    const [lessonStats, setLessonStats] = useState({});
    const [questionOptions, setQuestionOptions] = useState();
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [testOptions, setTestOptions] = useState();
    const [studentQuestionStats, setStudentQuestionStats] = useState({
        studentIndex: '',
        type: "",
        filled: false
    });
    const [testSort, setTestSort] = useState('students_completed');
    const [topTests, setTopTests] = useState({
        mostPopularScore: 0,
        mostPopularTests: [],
        mostEffectiveScore: 0,
        mostEffectiveTests: []
    });
    const [selectedTest, setSelectedTest] = useState({
        test: {},
        view: false
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
                    axios
                        .post('/api/feedback/getCourseFeedback', {course_id: id})
                        .then(res => {
                            setFeedbacks(res.data)
                        })
                        .catch(err => {
                            console.log("Error from courseFeedback")    
                        })
                    })
                    .catch(err => {
                        console.log("Error from courseTests: " + err)
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
            children.push(<td style={{textAlign:'center'}}>{course.lesson_weightage ? course.lesson_weightage[i] : null}</td>)
            table.push(<tr key={i}>{children}</tr>)
        }
        return table
    }

    const statsTable = () => {
        if(reports.length){
            let sortedReports = [...reports];
            for (let i = 0; i < sortedReports?.length; i++) {
                var score = 0;
                var bonusScore = 0;

                for(let testIndex = 0; testIndex < sortedReports[i].tests_taken?.length; testIndex++){
                    for(let questionIndex = 0; questionIndex < sortedReports[i].tests_taken[testIndex].result?.length; questionIndex++){
                        score += sortedReports[i].tests_taken[testIndex].result[questionIndex] * sortedReports[i].tests_taken[testIndex].weightage[questionIndex]
                    }
                }
                if(tests.length){
                    if(topTests?.mostEffectiveTests.map(test => test.creator_id).includes(reports[i].student_id)){
                        bonusScore += 100
                    }
    
                    if(topTests?.mostPopularTests.map(test => test.creator_id).includes(reports[i].student_id)){
                        bonusScore += 100
                    }
                }

                sortedReports[i].bonusScore = bonusScore;
                sortedReports[i].totalScore = score + bonusScore + sortedReports[i].participation_score

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

                sortedReports[i].percentageScore = ((sortedReports[i].totalScore / totalPercentage) * course.participation_weightage).toFixed(0);
                sortedReports[i].ranking = i + 1;

            }
            return (
                <Table bordered responsive>
                    <thead>
                        <tr style={{borderTop:'none'}}>
                            <th style={{textAlign:'center', width:'5%'}}><BsHash size={'20px'} title="Rank"/></th>
                            <th style={{textAlign:'center'}}>Student Name</th>
                            <th style={{textAlign:'center', width:'10%'}}><MdOutlinePostAdd size={'25px'} title="No. Tests Created"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPenFill size={'20px'} title="No. Tests Done"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsAwardFill size={'25px'} title="Bonus Points"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><FaHandshake size={'25px'} title="Participation Score"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><FaHandshake size={'25px'} title="Participation %"/> %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedReports.map(report => (
                            <tr key={report.id}>
                                <td style={{textAlign:'center'}}>{report.ranking}</td>
                                <td>{report.student_name}</td>
                                <td style={{textAlign:'center'}}>{report.tests_created.length}</td>
                                <td style={{textAlign:'center'}}>{report.tests_taken.length}</td>
                                <td style={{textAlign:'center'}}>{report.bonusScore}</td>
                                <td style={{textAlign:'center'}}>{report.totalScore}</td>
                                <td style={{textAlign:'center'}}>{report.percentageScore > 0 ? report.percentageScore : 0}%</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        }else{
            return (
                <Table bordered responsive>
                    <thead>
                        <tr style={{borderTop:'none'}}>
                            <th style={{textAlign:'center', width:'5%'}}><BsHash size={'20px'} title="Rank"/></th>
                            <th style={{textAlign:'center'}}>Student Name</th>
                            <th style={{textAlign:'center', width:'10%'}}><MdOutlinePostAdd size={'25px'} title="No. Tests Created"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPenFill size={'20px'} title="No. Tests Done"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><BsAwardFill size={'25px'} title="Bonus Points"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><FaHandshake size={'25px'} title="Participation Score"/></th>
                            <th style={{textAlign:'center', width:'10%'}}><FaHandshake size={'25px'} title="Participation %"/> %</th>
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
            setSelectedTest({test: {}, view: false});
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
        let tempOptions = []
        setSelectedQuestion(null)
        if(event < 0){
            setQuestionOptions();
        }else {
            for(let questionIndex = 0; questionIndex < lessonStats.student_report[studentQuestionStats.studentIndex].test[JSON.parse(event).index].questions?.length; questionIndex++){
                tempOptions.push(<option key={questionIndex} value={JSON.stringify({test:JSON.parse(event).test_id, question:lessonStats.student_report[studentQuestionStats.studentIndex].test[JSON.parse(event).index].questions[questionIndex].question_num})}>Question {lessonStats.student_report[studentQuestionStats.studentIndex].test[JSON.parse(event).index].questions[questionIndex].question_num + 1}</option>)
            }
            setQuestionOptions(tempOptions)
        }
        setSelectedTest({test: {}, view: false});
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
        setSelectedQuestion(tempQuestionSelect);
        setSelectedTest({test: {}, view: false});
    }

    const testStatsTable = () => {
        if(tests.length){
            let sortedTests = [...tests];
            let tempEffectiveScore = topTests.mostEffectiveScore;
            let tempPopularScore = topTests.mostPopularScore;
            for (let i = 0; i < sortedTests?.length; i++) {
                var numStudentsCompleted = 0;
                for(let reportIndex = 0; reportIndex < reports?.length; reportIndex++){
                    for(let testTakenIndex = 0; testTakenIndex < reports[reportIndex].tests_taken.length; testTakenIndex++){
                        if(reports[reportIndex].tests_taken[testTakenIndex].test_id === sortedTests[i]._id){
                            numStudentsCompleted++;
                        }
                    }
                }
                sortedTests[i].students_completed = numStudentsCompleted;
                
                let tempEffective = 0;
                let tempDifficulty = 0;
                let tempPopularity = 0;
                for(let feedbackIndex = 0; feedbackIndex < feedbacks?.length; feedbackIndex++){
                    if(feedbacks[feedbackIndex].test_id === sortedTests[i]._id){
                        tempEffective += Number(feedbacks[feedbackIndex].feedback_scores[0]);
                        tempDifficulty += Number(feedbacks[feedbackIndex].feedback_scores[1]);
                        tempPopularity += Number(feedbacks[feedbackIndex].feedback_scores[2]);
                    }
                }

                if(numStudentsCompleted > 0){
                    sortedTests[i].test_effectiveness = ((tempEffective / numStudentsCompleted) / 6 * 100).toFixed(0);
                    sortedTests[i].test_popularity = (((tempPopularity / numStudentsCompleted) / 6 * 50) + ((sortedTests[i].students_completed / (reports?.length - 1)) * 50)).toFixed(0);

                    if(tempDifficulty / numStudentsCompleted < 2){
                        sortedTests[i].test_difficulty = "Too Difficult"
                    } else if(tempDifficulty / numStudentsCompleted < 3){
                        sortedTests[i].test_difficulty = "Difficult"
                    } else if(tempDifficulty / numStudentsCompleted < 4){
                        sortedTests[i].test_difficulty = "Just Right"
                    } else if(tempDifficulty / numStudentsCompleted < 5){
                        sortedTests[i].test_difficulty = "Easy"
                    } else{
                        sortedTests[i].test_difficulty = "Too Easy"
                    }
                } else {
                    sortedTests[i].test_effectiveness = 0;
                    sortedTests[i].test_popularity = 0;
                    sortedTests[i].test_difficulty = "-";
                }

                if(feedbacks.length){
                    if(sortedTests[i].test_effectiveness > tempEffectiveScore){
                        let tempTopTest = topTests;
                        let tempEffectiveTest = []
                        tempEffectiveScore = Number(sortedTests[i].test_effectiveness);
                        tempTopTest.mostEffectiveScore = Number(sortedTests[i].test_effectiveness);
                        tempEffectiveTest.push({test_id: sortedTests[i]._id, creator_id: sortedTests[i].creator_id})
                        tempTopTest.mostEffectiveTests = tempEffectiveTest
                        setTopTests(tempTopTest);
                    }else if(sortedTests[i].test_effectiveness === tempEffectiveScore){
                        let tempTopTest = topTests;
                        tempTopTest.mostEffectiveTests.push({test_id: sortedTests[i]._id, creator_id: sortedTests[i].creator_id});
                        setTopTests(tempTopTest);
                    }
                    if(sortedTests[i].test_popularity > tempPopularScore){
                        let tempTopTest = topTests;
                        let tempPopularTest = []
                        tempPopularScore = Number(sortedTests[i].test_popularity);
                        tempTopTest.mostPopularScore = Number(sortedTests[i].test_popularity);
                        tempPopularTest.push({test_id: sortedTests[i]._id, creator_id: sortedTests[i].creator_id})
                        tempTopTest.mostPopularTests = tempPopularTest
                        setTopTests(tempTopTest);
                    }else if(sortedTests[i].test_effectiveness === tempPopularScore){
                        let tempTopTest = topTests;
                        tempTopTest.mostPopularTests.push({test_id: sortedTests[i]._id, creator_id: sortedTests[i].creator_id});
                        setTopTests(tempTopTest);
                    }
                }
            }

            sortedTests.sort((a, b) => {
                if(testSort === 'creator_name'){
                    if (a[testSort] > b[testSort]) {
                        return 1;
                    }
                    if (a[testSort] < b[testSort]) {
                        return -1;
                    }
                        return 0;
                }else{
                    if (a[testSort] < b[testSort]) {
                        return 1;
                    }
                    if (a[testSort] > b[testSort]) {
                        return -1;
                    }
                        return 0;
                }
                
            });

            for (let i = 0; i < sortedTests?.length; i++) {

                sortedTests[i].index = i + 1;

            }

            return (
                <Table bordered hover responsive className="clickable-table">
                    <thead>
                        <tr style={{borderTop:'none'}}>
                            <th style={{textAlign:'center', width:'5%'}}><BsHash size={'20px'} title="Rank"/></th>
                            <th style={{textAlign:'center'}}>Test Name</th>
                            <th style={{textAlign:'center'}}><button className="table-header-click" type="button" onClick={() => setTestSort('creator_name')}>Test Creator</button></th>
                            <th style={{textAlign:'center', width:'10%'}}><button className="table-header-click" type="button" onClick={() => setTestSort('students_completed')}><BsFillPersonFill size={'25px'} title="No. Students Completed"/></button></th>
                            <th style={{textAlign:'center', width:'10%'}}><button className="table-header-click" type="button" onClick={() => setTestSort('test_effectiveness')}>Effectiveness</button></th>
                            <th style={{textAlign:'center', width:'10%'}}><button className="table-header-click" type="button" onClick={() => setTestSort('test_difficulty')}>Difficulty</button></th>
                            <th style={{textAlign:'center', width:'10%'}}><button className="table-header-click" type="button" onClick={() => setTestSort('test_popularity')}>Popularity</button></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTests.map(test => (
                            <tr key={test._id} onClick={() => setSelectedTest({test: test, view: true})}>
                                <td style={{textAlign:'center'}}>{test.index}</td>
                                <td>{test.test_name}</td>
                                <td style={{textAlign:'center'}}>{test.creator_name}</td>
                                <td style={{textAlign:'center'}}>{test.students_completed}</td>
                                <td style={{textAlign:'center'}}>{test.test_effectiveness}%</td>
                                <td style={{textAlign:'center'}}>{test.test_difficulty}</td>
                                <td style={{textAlign:'center'}}>{test.test_popularity}%</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
        }else{
            return (
                <Table bordered responsive>
                    <thead>
                        <tr style={{borderTop:'none'}}>
                            <th style={{textAlign:'center', width:'5%'}}><BsHash size={'20px'} title="Rank"/></th>
                            <th style={{textAlign:'center'}}>Test Name</th>
                            <th style={{textAlign:'center'}}>Test Creator</th>
                            <th style={{textAlign:'center', width:'10%'}}><BsFillPersonFill size={'25px'} title="No. Students Completed"/></th>
                            <th style={{textAlign:'center', width:'10%'}}>Effectiveness</th>
                            <th style={{textAlign:'center', width:'10%'}}>Difficulty</th>
                            <th style={{textAlign:'center', width:'10%'}}>Popularity</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={7} style={{textAlign:'center'}}>There are no tests created for your course</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    const courseStats = () => {
        return(
            <>
                <div className="course-report-stats">
                    <div className="course-checked">
                        <h6 className="course-checked-color"><BsFillCameraVideoFill style={{marginTop:'5px'}} size={'30px'} title='No. of Lessons'/></h6>
                    </div>
                    <h5 className="course-checked-color" style={{marginTop:'1px'}}><strong>{course.lesson_names?.length ? course.lesson_names?.length : 0}</strong></h5>
                    <div className="course-attempt">
                        <h6 className="course-attempt-color"><BsFillPersonFill size={'30px'} title='No. of Students'/></h6>
                    </div>
                    <h5 className="course-attempt-color"><strong>{reports?.length ? reports?.length : 0}</strong></h5>
                    <div className="course-effective">
                        <h6 className="course-effective-color"><BsPenFill size={'25px'} title='No. of Tests'/></h6>
                    </div>
                    <h5 className="course-effective-color"><strong>{tests?.length ? tests?.length : 0}</strong></h5>
                    <div className="course-exam">
                        <h6 className="course-exam-color"><RiFilePaper2Fill size={'25px'} title='Exam Weightage'/></h6>
                    </div>
                    <h5 className="course-exam-color"><strong>{course.lesson_names?.length ? course.exam_weightage : 0}%</strong></h5>
                    <div className="course-part">
                        <h6 className="course-part-color"><FaHandshake size={'30px'} title='Participation Weightage'/></h6>
                    </div>
                    <h5 className="course-part-color"><strong>{course.lesson_names?.length ? course.participation_weightage : 0}%</strong></h5>
                </div>
            </>
        )
    }

    const viewTest = () => {
        if(selectedTest.view){
            let questionList;
            questionList = selectedTest.test.questions.map((question, k) =>
                <ViewTestQuestions
                    question={question}
                    options={selectedTest.test.options}
                    answer={selectedTest.test.answers}
                    answer_selected={selectedTest.test.answers}
                    key={k}
                    indexValue={k}
                />
            )
            return(
                <>
                    <h3>{selectedTest.test.test_name}</h3>
                    <h5 style={{marginBottom:'40px'}}><strong>Test Creator:</strong> {selectedTest.test.creator_name}</h5>
                    <div className="report-view-test">
                        {questionList}
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className="web-page">
                <Col>
                    <Sidebar/>
                </Col>
                <Col className="dashboard course-details">
                    <br></br>
                    <h3>{course.course_name}</h3>
                    <h6>{course.course_description}</h6>
                    <br></br>
                    <Container className="dash-cards">
                        <br></br>
                        <h4><BsBarChartLine style={{marginBottom:'10px'}}/> Course Statistics</h4>
                        <hr></hr>
                        {courseStats()}
                        <br></br>
                    </Container>
                    <br></br>
                    <Container className="dash-cards">
                        <br></br>
                        <h4><BsCameraVideo style={{marginBottom:'5px'}}/> Lessons</h4>
                        <Table bordered responsive style={{border:'1'}}>
                            <thead>
                                <tr>
                                    <th style={{width:'10%', textAlign:'center'}}>No.</th>
                                    <th style={{textAlign:'center'}}>Lesson Name</th>
                                    <th style={{textAlign:'center'}}>Lesson Description</th>
                                    <th style={{width:'10%', textAlign:'center'}}>Lesson Weightage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lessonTable()}
                            </tbody>
                        </Table>
                        <Link to={{pathname: `/editcourse/${id}`}} className="btn btn-large waves-effect waves-light accent-3" style={{marginBottom:'15px'}}>
                            Edit Course
                        </Link>
                    </Container>
                    <br></br>
                    <Container className="dash-cards">
                        <br></br>
                        <h4><BsBarChartLine style={{marginBottom:'5px'}}/> Student Statistics</h4>
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
                                    <Row style={{border: '1px solid rgb(222, 226, 230)', marginBottom: '10px', borderRadius:'10px'}}>
                                        <h5 style={{marginTop: '10px'}}>Question {selectedQuestion.indexValue + 1}:</h5>
                                        <div className="report-view-test" style={{margin:'0'}}>
                                            <ViewTestQuestions
                                                question={selectedQuestion.question}
                                                options={selectedQuestion.options}
                                                answer={selectedQuestion.answer}
                                                answer_selected={selectedQuestion.answer_selected}
                                                key={selectedQuestion.indexValue}
                                                indexValue={0}
                                            />
                                        </div>
                                    </Row>
                                }
                            </Tab>
                            <Tab eventKey="testBreakdown" title="Test Breakdown">
                                {testStatsTable()}
                                <br></br>
                                {viewTest()}
                            </Tab>
                        </Tabs>
                    </Container>
                    <br></br>
                </Col>
            </div>
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