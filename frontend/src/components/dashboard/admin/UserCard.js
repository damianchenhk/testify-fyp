import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import "./css/UserCard.css";

const UserCard = (props) => {
    const  user  = props.user;
    const date = new Date(user.date);
    const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.toLocaleTimeString();
    const [edit, setEdit] = useState(false);
    const [role, setRole] = useState(user.role);

    const changeEdit = () => {
        let tempEdit = edit
        setEdit(!tempEdit)
    }

    const onChange = (event) => {
        setRole(event);
    }

    const onSubmit = e => {
        e.preventDefault();

        axios
            .put('/api/users/'+user._id, {role: role})
            .then(res => {
                changeEdit()
            })
            .catch(err => {
                console.log('Error in Update User Role');
            })
    }

    return(
        <tr>
            <td>{ user.name }</td>
            <td style={{textAlign:'center'}}>
                {!edit ? role : null}
                {edit ? <Form>
                    <Form.Select defaultValue={role} onChange={e => onChange(e.target.value)}>
                        <option value="Admin">Admin</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Student">Student</option>
                    </Form.Select>
                </Form> : null}
            </td>
            <td style={{textAlign:'center'}}>{dateString}</td>
            <td style={{textAlign:'center'}}>
                {!edit ? <Button style={{fontSize: '10px'}} onClick={() => changeEdit()}>
                    Change Role
                </Button> : null}
                {edit ? <Button className='confirm' onClick={e => onSubmit(e)}>
                    Confirm
                </Button> : null}
                {edit ? <Button className='cancel' onClick={() => changeEdit()}>
                    Cancel
                </Button> : null}
            </td>
        </tr>
    )
};

export default UserCard;