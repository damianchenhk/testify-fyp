import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const InstructorCourseSummary = (props) => {
    const  course  = props.course;
    const [student_count, setStudentCount] = useState('');
    const [test_count, setTestCount] = useState('');
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
        <tr key={course._id} onClick={() => {history.push('/coursereport/' + course._id)}}>
            <td>{ course.course_name }</td>
            <td>{course.course_description}</td>
            <td style={{textAlign:'center'}}>{course.lesson_names.length}</td>
            <td style={{textAlign:'center'}}>{student_count}</td>
            <td style={{textAlign:'center'}}>{test_count}</td>
        </tr>
    )
};

export default InstructorCourseSummary;