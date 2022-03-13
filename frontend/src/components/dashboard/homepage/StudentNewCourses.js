import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentNewCourses = (props) => {
    const  course  = props.course;
    const [student_count, setStudentCount] = useState('');
    const [test_count, setTestCount] = useState('');
    const [registered, setRegistered] = useState(false);

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
        <tr key={course._id}>
            <td style={{border:'solid 1px #dee2e6', borderLeft:'none'}}>
                <Link to={{
                        pathname: `/coursedetails/${course._id}`,
                    }}>
                        { course.course_name }
                </Link>
            </td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{course.lesson_names?.length}</td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{student_count}</td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{test_count}</td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6', borderRight:'none'}}>{registered ? "Registered" : null}</td>
        </tr>
    )
};

export default StudentNewCourses;