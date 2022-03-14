import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentPendingTests = (props) => {
    const  test  = props.test;
    const [course_name, setCourseName] = useState('');

    useEffect(() => {
        axios
            .get('/api/courses/'+test.course_id)
            .then(res => {
                setCourseName(res.data.course_name)
            })
            .catch(err => {
                console.log('Error in Courses: ' + err);
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
            <td style={{border:'solid 1px #dee2e6'}}>
                <Link to={{
                        pathname: `/coursedetails/${test.course_id}`,
                    }}>
                        { course_name }
                </Link>
            </td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6', borderRight:'none'}}>{test.tester_id.length}</td>
        </tr>
    )
};

export default StudentPendingTests;