import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseCard = (props) => {
    const  course  = props.course;
    const [student_count, setStudentCount] = useState('');
    const [test_count, setTestCount] = useState('');

    useEffect(() => {
        axios
            .post('/api/reports/getCourseStudentsCount/', {course_id: course._id})
            .then(res => {
                setStudentCount(res.data)
                axios
                    .post('/api/tests/getCourseTestCount/', {course_id: course._id})
                    .then(res => {
                        setTestCount(res.data)
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
                <h6>
                    <Link to={{
                        pathname: `/coursereport/${course._id}`,
                    }}
                        style={{color:'black'}}
                    >
                        { course.course_name }
                    </Link>
                </h6>
                {course.instructor_name}
            </td>
            <td><p style={{margin:'auto'}}>{course.course_description}</p></td>
            <td style={{textAlign:'center'}}>{course.lesson_names.length}</td>
            <td style={{textAlign:'center'}}>{student_count}</td>
            <td style={{textAlign:'center'}}>{test_count}</td>
            <td style={{textAlign:'center'}}>
                <Link to={{
                    pathname: `/coursereport/${course._id}`,
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

export default CourseCard;