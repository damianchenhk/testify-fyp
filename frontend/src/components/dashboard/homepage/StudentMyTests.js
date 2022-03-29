import React, { useState, useEffect } from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const StudentMyTests = (props) => {
    const  test  = props.test;
    const [studentCount, setStudentCount] = useState(0);
    const [course_name, setCourseName] = useState('');
    const history = useHistory();

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
        <tr key={test._id} onClick={() => {history.push('/testdetails/'+test._id)}}>
            <td>{ test.test_name }</td>
            <td>
                <Link to={{
                        pathname: `/coursedetails/${test.course_id}`,
                    }}
                    style={{color:'black'}}
                    className="test-summary-card"
                >
                        { course_name }
                </Link>
            </td>
            <td style={{textAlign:'center'}}>{studentCount}</td>
            <td style={{textAlign:'center'}}>{ test.tester_id.length === 2 ? <BsFillPatchCheckFill color='#26a69a' title='Approved'/> : <MdCancel color='rgb(182, 0, 0)' size={'20px'} title='Not Approved'/>}</td>
        </tr>
    )
};

export default StudentMyTests;