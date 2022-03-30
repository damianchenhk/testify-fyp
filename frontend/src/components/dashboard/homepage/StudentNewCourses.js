import React, { useState, useEffect } from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const StudentNewCourses = (props) => {
    const  course  = props.course;
    const [student_count, setStudentCount] = useState('');
    const [test_count, setTestCount] = useState('');
    const [registered, setRegistered] = useState(false);
    const history = useHistory();

    useEffect(() => {
        axios
            .post('/api/reports/getCourseStudentsCount/', {course_id: course._id})
            .then(res => {
                setStudentCount(res.data)
                axios
                    .post('/api/tests/getCourseTestCount/', {course_id: course._id})
                    .then(res => {
                        setTestCount(res.data)
                        axios
                            .post('/api/reports/isRegistered/', {student_id: props.student_id, course_id: course._id})
                            .then(res => {
                                setRegistered(res.data)
                            })
                            .catch(err => {
                                console.log('Error from isRegistered: ' + err);
                            })
                    })
                    .catch(err =>{
                        console.log('Error from getCourseTestCount: ' + err);
                    })
            })
            .catch(err =>{
                console.log('Error from getCourseStudentsCount: ' + err);
            })
    }, []);

    return(
        <tr key={course._id} onClick={() => {history.push('/coursedetails/'+course._id)}}>
            <td>{ course.course_name }</td>
            <td style={{textAlign:'center'}}>{course.lesson_names?.length}</td>
            <td style={{textAlign:'center'}}>{student_count}</td>
            <td style={{textAlign:'center'}}>{test_count}</td>
            <td style={{textAlign:'center'}}>{registered ? <BsFillCheckCircleFill color='#26a69a' title='Registered'/> : null}</td>
        </tr>
    )
};

export default StudentNewCourses;