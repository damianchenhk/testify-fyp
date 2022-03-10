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
                    <h6>{test.creator_name}</h6>
                </td>
                <td>
                    <p>{test.test_description}</p>
                </td>
            </tr>
        </>
    )
};

export default TestCard;