import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { Row, Col, Table, Container, Button, Form } from "react-bootstrap";
import { BsCameraVideo, BsPen, BsPersonCheck, BsBarChartLine, BsFillCameraVideoFill, BsFillPersonFill, BsPenFill } from "react-icons/bs";
import { RiPencilRuler2Line } from "react-icons/ri";
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from "axios";

import Sidebar from "../../layout/Sidebar";
import RegisterPopUp from "./RegisterPopUp";
import { UPDATE_COURSE_REGISTERED } from "../../../actions/types";
import "../../../App.css";

export const updateCourseRegistered = e => {
    return {
        type: UPDATE_COURSE_REGISTERED,
        payload: e
    };
};

const CourseDetails = ({ auth }) => {

    const { id } = useParams()

    const [course, setCourse] = useState({});
    const [tests, setTests] = useState({});
    const [seen, setSeen] = useState(false);
    const [report, setReport] = useState({});
    const [studentCount, setStudentCount] = useState(0);

    const [student_id, setStudentId] = useState(auth.user.id);
    const [student_name, setStudentName] = useState(auth.user.name);
    const [course_id, setCourseId] = useState(id)
    const [beta_tester, setBetaTester] = useState(false);

    const [courses_taken, setStudentCourses] = useState(auth.user.ongoing_courses);
    const [registered, setRegistered] = useState(courses_taken.includes(id));
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = e => {
        e.preventDefault();

        const data = {
            student_id: student_id,
            student_name: student_name,
            course_id: course_id,
            beta_tester: beta_tester
        };

        let registerCourse = courses_taken.concat(id)

        axios
        .post('/api/reports/', data)
        .then(res => {
            setStudentId(auth.user.id)
            setStudentName(auth.user.name)
            setCourseId(auth.user.id)
            setBetaTester(false)
            
            const data2 = {
                ongoing_courses: registerCourse
            };
            axios
            .put('/api/users/'+auth.user.id, data2)
            .then(res => {
                dispatch(updateCourseRegistered(id));
                setRegistered(true);
                togglePop();
            })
            .catch(err => {
                console.log("Error in RegisterCourse!");
            });
        })
    }

    useEffect(() => {
        axios
            .get('/api/courses/'+id)
            .then(res => {
                setCourse(res.data)
            axios
                .post('/api/tests/courseTests', {course_id: id})
                .then(res => {
                    setTests(res.data)
                    axios
                        .post('/api/reports/getCourseStudentsCount', {course_id: id})
                        .then(res => {
                            setStudentCount(res.data);
                            if(registered){
                                axios
                                    .post('/api/reports/getReportID/', {student_id: auth.user.id, course_id: id})
                                    .then(res => {
                                        setReport(res.data[0])
                                    })
                                    .catch(err => {
                                        console.log("Error from getReportID");
                                    })
                            }
                        })
                        .catch(err => {
                            console.log("Error from getCourseStudentsCount");
                        })
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
            table.push(<tr>{children}</tr>)
        }
        return table
    }

    const testTable = () => {
        let table = []
        if(tests.length){
    
            for (let i = 0; i < tests?.length; i++) {
                let children = []

                if(tests[i].creator_id !== auth.user.id && tests[i].tester_id.length === 2){
                    children.push(<td><h6>{tests[i].test_name ? tests[i].test_name : null}</h6>By: {tests[i].creator_name ? tests[i].creator_name : null}</td>)
                    children.push(<td>{tests[i].test_description ? tests[i].test_description : null}</td>)
                    children.push(
                        <td>
                            {report.tests_taken?.map(test => test.test_id).includes(tests[i]._id) ? <Button 
                                    style={{width:'130px', fontSize:'12px'}}
                                    className='btn waves-effect waves-light accent-3'
                                    disabled
                                >
                                    Completed
                                </Button> : <Link 
                                    to={{pathname: `/test/${tests[i]._id}`,}}
                                    style={{width:'130px', fontSize:'12px'}}
                                    className='btn waves-effect waves-light accent-3 outline-btn'
                                >
                                    Attempt Test
                                </Link>}
                        </td>)
                    table.push(<tr>{children}</tr>)
                }
            }
            return table
        }else{
            table.push(<tr><td colSpan={3} style={{textAlign:'center'}}>There are no tests available</td></tr>)
            return table
        }
    }

    const togglePop = () => {
        setSeen(value => !value)
        if(seen){
            setBetaTester(false)
        }
    }

    const toggleTester = () => {
        setBetaTester(value => !value)
    }

    const myTestsTable = () => {
        let myTestTable = []
        if(tests.length){
            for(let testIndex = 0; testIndex < tests?.length; testIndex++){
                if(tests[testIndex].creator_id === auth.user.id){
                    myTestTable.push(
                        <tr>
                            <td><h6 style={{margin:'auto'}}>{tests[testIndex].test_name}</h6></td>
                            <td>{tests[testIndex].test_description}</td>
                            <td>
                                <Button
                                    onClick={() => {history.push('/testdetails/' + tests[testIndex]._id)}}
                                    style={{width:'130px', fontSize:'12px'}}
                                    className='btn waves-effect waves-light accent-3 outline-btn'
                                >
                                    View Details
                                </Button>
                            </td>
                        </tr>
                    )
                }
            }
            return(
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test Name</th>
                            <th style={{textAlign:'center'}}>Test Description</th>
                            <th style={{textAlign:'center', width:'10%'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {myTestTable}
                    </tbody>
                </Table>
            )
        }else{
            return(
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test Name</th>
                            <th style={{textAlign:'center'}}>Test Description</th>
                            <th style={{textAlign:'center', width:'10%'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>You have not created any tests</td>
                        </tr>
                        
                    </tbody>
                </Table>
            )
        }
    }

    const pendingTestsTable = () => {
        let tempPendingTestTable = []
        if(tests.length){
            for(let testIndex = 0; testIndex < tests?.length; testIndex++){
                if(tests[testIndex].creator_id !== auth.user.id && tests[testIndex].tester_id.length !== 2){
                    tempPendingTestTable.push(
                        <tr>
                            <td><h6>{tests[testIndex].test_name}</h6></td>
                            <td>{tests[testIndex].test_description}</td>
                            <td>
                                {report.tests_taken?.map(test => test.test_id).includes(tests[testIndex]._id) ? <Button 
                                    style={{width:'130px', fontSize:'9px'}}
                                    className='btn waves-effect waves-light accent-3'
                                    disabled
                                >
                                    Test Completed
                                </Button> : <Link 
                                    to={{pathname: `/betatest/${tests[testIndex]._id}`,}}
                                    style={{width:'130px', fontSize:'12px'}}
                                    className='btn waves-effect waves-light accent-3 outline-btn'
                                >
                                    Attempt Test
                                </Link>}
                            </td>
                        </tr>
                    )
                }
            }
            if(tempPendingTestTable.length < 1){
                tempPendingTestTable.push(
                    <tr>
                        <td colSpan={3} style={{textAlign:'center'}}>There are no tests requiring testing</td>
                    </tr>
                )
            }
            return(
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test Name</th>
                            <th style={{textAlign:'center'}}>Test Description</th>
                            <th style={{textAlign:'center', width:'10%'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tempPendingTestTable}
                    </tbody>
                </Table>
            )
        }else{
            return(
                <Table bordered responsive>
                    <thead>
                        <tr>
                            <th style={{textAlign:'center'}}>Test Name</th>
                            <th style={{textAlign:'center'}}>Test Description</th>
                            <th style={{textAlign:'center', width:'10%'}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3} style={{textAlign:'center'}}>There are no tests requiring testing</td>
                        </tr>
                    </tbody>
                </Table>
            )
        }
    }

    const courseStats = () => {
        return(
            <>
                <div className="course-stats">
                    <div className="course-checked">
                        <h6 className="course-checked-color"><BsFillCameraVideoFill size={'30px'} title='No. of Lessons'/></h6>
                    </div>
                    <h5 className="course-checked-color"><strong>{course.lesson_names?.length ? course.lesson_names?.length : 0}</strong></h5>
                    <div className="course-attempt">
                        <h6 className="course-attempt-color"><BsFillPersonFill size={'30px'} title='No. of Students'/></h6>
                    </div>
                    <h5 className="course-attempt-color"><strong>{studentCount}</strong></h5>
                    <div className="course-effective">
                        <h6 className="course-effective-color"><BsPenFill size={'25px'} title='No. of Tests'/></h6>
                    </div>
                    <h5 className="course-effective-color"><strong>{tests?.length ? tests?.length : 0}</strong></h5>
                </div>
            </>
        )
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
                    <h5>Instructor: {course.instructor_name}</h5>
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
                                </tr>
                            </thead>
                            <tbody>
                                {lessonTable()}
                            </tbody>
                        </Table>
                        {registered ? 
                            <>
                                <Link to={{
                                    pathname: `/viewcourse/${course._id}`,
                                }}
                                    className="btn btn-large waves-effect waves-light accent-3"
                                    style={{zIndex:'0', marginBottom:'15px'}}
                                >
                                    Start Course
                                </Link> 
                            </>
                        : null}
                        {!registered ? <Button onClick={() => togglePop()} className="btn btn-large waves-effect waves-light accent-3" style={{zIndex:'0', marginBottom:'15px'}}>Register</Button> : null}
                        <RegisterPopUp trigger={seen} setTrigger={togglePop} setSubmit={onSubmit}>
                            <h5 style={{color:'#1d8177'}}>Register for {course.course_name}?</h5>
                            <Form.Check onChange={() => toggleTester()} label="I want to be a pre-tester for student tests"/>
                            <br></br>
                        </RegisterPopUp>
                    </Container>
                    {report.beta_tester ? 
                        <>
                            <br></br>
                            <Container className="dash-cards">
                                <br></br>
                                <h4><BsPersonCheck style={{marginBottom:'9px'}}/> Tests Pending Approval</h4>
                                {pendingTestsTable()}
                            </Container> 
                        </>
                    : null}
                    <br></br>
                    {registered ? <Container className="dash-cards">
                        <br></br>
                        <h4><RiPencilRuler2Line style={{marginBottom:'10px'}}/> Available Tests</h4>
                        <Table bordered responsive style={{border:'1'}}>
                            <thead>
                                <tr>
                                    <th style={{textAlign:'center'}}>Test Name</th>
                                    <th style={{textAlign:'center'}}>Test Description</th>
                                    <th style={{textAlign:'center', width:'10%'}}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {testTable()}
                            </tbody>
                        </Table>
                    </Container> : null}
                    {registered ?
                    <>
                        <br></br>
                        <Container className="dash-cards">
                            <br></br>
                            <h4><BsPen style={{marginBottom:'10px'}}/> My Tests</h4>
                            {myTestsTable()}
                            <Link to={{pathname: `/addtest/${id}`}} className="btn btn-large waves-effect waves-light accent-3" style={{marginBottom:'20px'}}>
                                Create Test
                            </Link>
                        </Container> 
                    </>
                    : null}
                    <br></br>
                </Col>
            </div>
        </>
    );
}

CourseDetails.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
)(CourseDetails);