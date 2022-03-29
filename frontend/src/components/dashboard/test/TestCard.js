import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = (props) => {
    const  test  = props.test;

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
                <td style={{textAlign:'center'}}>
                    <Link to={{
                        pathname: `/testdetails/${test._id}`,
                    }}
                        style={{width:'150px', fontSize:'15px'}}
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