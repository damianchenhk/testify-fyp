import React from 'react';
import { Row } from "react-bootstrap";

const FeedbackCard = (props) => {
    let effective = "";
    let difficulty = "";
    let popularity = "";
    const detailed_feedback = props.detailed_feedback;

    switch(props.effective){
        case '1':
            effective = "Strongly Disagree"
            break;
        case '2':
            effective = "Disagree"
            break;
        case '3':
            effective = "Slightly Disagree"
            break;
        case '4':
            effective = "Slightly Agree"
            break;
        case '5':
            effective = "Agree"
            break;
        case '6':
            effective = "Strongly Agree"
            break;
    }

    switch(props.difficulty){
        case '1':
            difficulty = "Too Difficult"
            break;
        case '2':
            difficulty = "Difficult"
            break;
        case '3':
            difficulty = "Just Right"
            break;
        case '4':
            difficulty = "Easy"
            break;
        case '5':
            difficulty = "Too Easy"
            break;
    }

    switch(props.popularity){
        case '1':
            popularity = "Strongly Disagree"
            break;
        case '2':
            popularity = "Disagree"
            break;
        case '3':
            popularity = "Slightly Disagree"
            break;
        case '4':
            popularity = "Slightly Agree"
            break;
        case '5':
            popularity = "Agree"
            break;
        case '6':
            popularity = "Strongly Agree"
            break;
    }

    return(
        <>
            <Row style={{textAlign: 'left', border: 'solid 1px #dee2e6', paddingTop: '8.625px', borderRadius:'10px'}}>
                <h6><strong>Effectiveness: </strong>{effective}</h6>
                <h6><strong>Difficulty: </strong>{difficulty}</h6>
                <h6><strong>Would Student Recommend: </strong>{popularity}</h6>
                <h6><strong>Detailed Feedback: </strong>{detailed_feedback}</h6>
            </Row>
        </>
    )
};

export default FeedbackCard;