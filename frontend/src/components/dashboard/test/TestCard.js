import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import axios from 'axios';

const TestCard = (props) => {
    const  test  = props.test;
    const [studentCount, setStudentCount] = useState(0);
    const [course_name, setCourseName] = useState('');

    useEffect(() => {
        axios
            .get('/api/courses/'+test.course_id)
            
            .then(res => {
                setCourseName(res.data.course_name)
                axios
                    .post('/api/reports/studentTestReportsCount/', {test_id: test._id})        
                    .then(res => {
                        setStudentCount(res.data)
                    })
                    .catch(err => {
                        console.log('Error from studentTestReportsCount: ' + err);
                    })
            })
            .catch(err => {
                console.log('Error in Courses: ' + err);
            })
    }, []);

    return(
        <>
            <tr>
                <td>
                    <h6 style={{margin:'auto'}}>
                        <Link to={{
                            pathname: `/testdetails/${test._id}`,
                        }}
                            style={{color: 'black'}}
                        >
                            { test.test_name }
                        </Link>
                    </h6>
                </td>
                <td>
                    <p style={{margin:'auto'}}>{test.test_description}</p>
                </td>
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
            <td style={{textAlign:'center'}}>{ test.tester_id.length === 2 ? <BsFillPatchCheckFill size={'20px'} color='#26a69a' title='Approved'/> : <MdCancel color='rgb(182, 0, 0)' size={'20px'} title='Not Approved'/>}</td>
                <td style={{textAlign:'center'}}>
                    <Link to={{
                        pathname: `/testdetails/${test._id}`,
                    }}
                        style={{width:'120px', fontSize:'12px'}}
                        className='btn waves-effect waves-light accent-3'
                    >
                        View Details
                    </Link>
                </td>
            </tr>
        </>
    )
};

export default TestCard;