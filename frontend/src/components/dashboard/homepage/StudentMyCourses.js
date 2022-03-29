import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const StudentNewCourses = (props) => {
    const  report  = props.report;
    const [course, setCourse] = useState({});
    const [test_count, setTestCount] = useState(0);
    const history = useHistory();

    useEffect(() => {
        axios
            .get('/api/courses/'+report.course_id)
            .then(res => {
                setCourse(res.data)
                let tempCourseID = res.data._id
                axios
                    .post('/api/tests/getCourseTestCount/', {course_id: tempCourseID})
                    .then(res => {
                        setTestCount(res.data)
                    })
                    .catch(err => {
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
            <td style={{textAlign:'center'}}>{course.instructor_name}</td>
            <td style={{textAlign:'center'}}>{course.lesson_names?.length}</td>
            <td style={{textAlign:'center'}}>{(test_count - report.tests_created?.length - report.tests_taken?.length) > 1 ? (test_count - report.tests_created?.length - report.tests_taken?.length) : 0}</td>
        </tr>
    )
};

export default StudentNewCourses;