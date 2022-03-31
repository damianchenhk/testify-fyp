import React from 'react';

const AdminUserSummary = (props) => {
    const  user  = props.user;
    const date = new Date(user.date);
    const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.toLocaleTimeString();

    return(
        <tr key={user._id}>
            <td>{ user.name }</td>
            <td style={{textAlign:'center'}}>{user.role}</td>
            <td style={{textAlign:'center'}}>
                {dateString}
            </td>
        </tr>
    )
};

export default AdminUserSummary;