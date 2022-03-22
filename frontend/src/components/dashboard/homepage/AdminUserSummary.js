import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminUserSummary = (props) => {
    const  user  = props.user;
    const date = new Date(user.date);
    const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.toLocaleTimeString();

    return(
        <tr key={user._id}>
            <td style={{border:'solid 1px #dee2e6', borderLeft:'none'}}>
                <Link to={{
                        pathname: `/coursereport/${user._id}`,
                    }}>
                        { user.name }
                </Link>
            </td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6', borderLeft:'none'}}>{user.role}</td>
            <td style={{textAlign:'center', border:'solid 1px #dee2e6', borderRight:'none'}}>
                {dateString}
            </td>
        </tr>
    )
};

export default AdminUserSummary;