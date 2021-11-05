import React from 'react';
import { Link } from 'react-router-dom';

const TestCard = (props) => {
    const  test  = props.test;

    return(
        <div className="card-container">
            <div className="desc">
                <h2>
                    <Link to={{
                        pathname: `/test/${test._id}`,
                    }}>
                        { test.test_name }
                    </Link>
                </h2>
                <h3>{test.creator_id}</h3>
                <p>{test.test_description}</p>
            </div>
        </div>
    )
};

export default TestCard;