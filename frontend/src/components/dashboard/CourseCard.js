import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = (props) => {
    const  course  = props.course;

    return(
        <div className="card-container">
            <div className="desc">
                <h2>
                    <Link to={{
                        pathname: `/viewcourse/${course._id}`,
                    }}>
                        { course.course_name }
                    </Link>
                </h2>
                <h3>{course.instructor_id}</h3>
                <p>{course.course_description}</p>
            </div>
        </div>
    )
};

export default CourseCard;