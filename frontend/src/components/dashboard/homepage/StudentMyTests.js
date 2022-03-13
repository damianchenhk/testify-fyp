import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentMyTests = (props) => {
    const  test  = props.test;
    const [studentCount, setStudentCount] = useState(0);
    const [course_name, setCourseName] = useState('');

    useEffect(() => {
        axios
            .post('/api/reports/studentTestReportsCount/', {test_id: test._id})
            .then(res => {
                setStudentCount(res.data)
                axios
                    .get('/api/courses/'+test.course_id)
                    .then(res => {
                        setCourseName(res.data.course_name)
                    })
                    .catch(err => {
                        console.log('Error in Courses: ' + err);
                    })
            })
            .catch(err =>{
                console.log('Error from studentTestReportsCount: ' + err);
            })
    }, []);

    return(
        <tr key={test._id}>
            <td style={{border:'solid 1px #dee2e6', borderLeft:'none'}}>
                <Link to={{
                        pathname: `/testdetails/${test._id}`,
                    }}>
                        { test.test_name }
                </Link>
            </td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6'}}>{course_name}</td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6', borderRight:'none'}}>{studentCount}</td>
        </tr>
    )
};

export default StudentMyTests;