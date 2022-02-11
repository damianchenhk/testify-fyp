import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = (props) => {
    const  course  = props.course;

    return(
        <tr>
            <td>
                <h5>
                    <Link to={{
                        pathname: `/coursedetails/${course._id}`,
                    }}>
                        { course.course_name }
                    </Link>
                </h5>
                <h6>{course.instructor_name}</h6>
            </td>
            <td>
                <p>{course.course_description}</p>
            </td>
            <td style={{textAlign:'center'}}>
                <Link to={{
                    pathname: `/coursedetails/${course._id}`,
                }}
                    style={{width:'110px', fontSize:'10px'}}
                    className='btn waves-effect waves-light accent-3'
                >
                    View Details
                </Link>
            </td>
        </tr>
    )
};

export default CourseCard;