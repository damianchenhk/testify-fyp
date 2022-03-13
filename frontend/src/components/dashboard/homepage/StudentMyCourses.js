import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentNewCourses = (props) => {
    const  report  = props.report;
    const [course, setCourse] = useState({});
    const [test_count, setTestCount] = useState(0);

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
        <tr key={course._id}>
            <td style={{border:'solid 1px #dee2e6', borderLeft:'none'}}>
                <Link to={{
                        pathname: `/coursedetails/${course._id}`,
                    }}>
                        { course.course_name }
                </Link>
            </td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{course.lesson_names?.length}</td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6', borderRight: 'none'}}>{(test_count - report.tests_created?.length - report.tests_taken?.length) > 1 ? (test_count - report.tests_created?.length - report.tests_taken?.length) : 0}</td>
        </tr>
    )
};

export default StudentNewCourses;