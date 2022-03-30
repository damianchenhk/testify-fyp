import React, { useState } from 'react';
import { Pagination, Container } from "react-bootstrap";

import FeedbackCard from './FeedbackCard';

const FeedbackList = (props) => {
    const feedbacks = props.feedbacks;
    const [page, setPage] = useState(1);

    const feedbackView = () => {
        let feedbackTable = [];
        let pageLimit = 5;

        if((page * 5) < feedbacks?.length){
            pageLimit = page * 5
        }else{
            pageLimit = feedbacks?.length
        }

        for(let feedbackIndex = ((page - 1) * 5); feedbackIndex < pageLimit; feedbackIndex++){
            feedbackTable.push(feedbacks[feedbackIndex])
        }
        return(
            feedbackTable.map((feedback, key) => 
                <FeedbackCard effective={feedback?.feedback_scores[0]} difficulty={feedback?.feedback_scores[1]} popularity={feedback?.feedback_scores[2]} detailed_feedback={feedback?.detailed_feedback} key={key}/>
            )
        )
    }

    const pageChange = (e) => {
        setPage(e);
    }

    const nextPage = (e) => {
        if(page !== e){
            let tempPage = page;
            setPage(tempPage + 1)
        }
    }

    const prevPage = () => {
        if(page !== 1){
            let tempPage = page;
            setPage(tempPage - 1)
        }
    }

    const paginationBar = () => {
        let pageCount = Math.ceil(feedbacks?.length / 5)
        let pageBar = []
        for(let pageIndex = 1; pageIndex <= pageCount; pageIndex++){
            pageBar.push(
                <Pagination.Item key={pageIndex} active={pageIndex === page} onClick={() => pageChange(pageIndex)}>
                    {pageIndex}    
                </Pagination.Item>
            )
        }
        return(
            <Pagination>
                <Pagination.First onClick={() => pageChange(1)}/>
                <Pagination.Prev onClick={() => prevPage()}/>
                {pageBar}
                <Pagination.Next onClick={() => nextPage(pageCount)}/>
                <Pagination.Last onClick={() => pageChange(pageCount)}/>
            </Pagination>
        )
    }

    return(
        <>
            {feedbackView()}
            <div style={{display:'flex', justifyContent:'center'}}>
                {paginationBar()}
            </div>
        </>
    )
};

export default FeedbackList;