import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = (props) => {
    const  test  = props.test;

    return(
        <>
            <tr>
                <td>
                    <h5>
                        <Link to={{
                            pathname: `/test/${test._id}`,
                        }}>
                            { test.test_name }
                        </Link>
                    </h5>
                </td>
                <td>
                    <p>{test.test_description}</p>
                </td>
                <td style={{textAlign:'center'}}>
                    <Link to={{
                        pathname: `/testdetails/${test._id}`,
                    }}
                        style={{width:'110px', fontSize:'10px'}}
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