import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const StudentPendingTests = (props) => {
    const  test  = props.test;
    const [course_name, setCourseName] = useState('');
    const history = useHistory();

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
        <tr key={test._id} onClick={() => {history.push('/testdetails/'+test._id)}}>
            <td>{ test.test_name }</td>
            <td>
                <Link to={{
                        pathname: `/coursedetails/${test.course_id}`,
                    }}>
                        { course_name }
                </Link>
            </td>
            <td style={{textAlign:'center'}}>{test.tester_id.length}</td>
        </tr>
    )
};

export default StudentPendingTests;