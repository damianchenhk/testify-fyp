import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import axios from 'axios';

const AdminCourseCard = (props) => {
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
        <tr>
            <td>
                <h6>{ course.course_name }</h6>
                {course.instructor_name}
            </td>
            <td>
                <p style={{margin:'auto'}}>{course.course_description}</p>
            </td>
            <td style={{textAlign:'center'}}>{course.lesson_names.length}</td>
            <td style={{textAlign:'center'}}>{student_count}</td>
            <td style={{textAlign:'center'}}>{test_count}</td>
            <td style={{textAlign:'center'}}>
                <Link to={{
                    pathname: `/admincourseview/${course._id}`,
                }}
                    style={{width:'120px', fontSize:'12px'}}
                    className='btn waves-effect waves-light accent-3'
                >
                    View Details
                </Link>
            </td>
        </tr>
    )
};

export default AdminCourseCard;