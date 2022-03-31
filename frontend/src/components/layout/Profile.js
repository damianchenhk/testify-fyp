import React from "react";
import { Button } from "react-bootstrap";
import "../../App.css";

const Profile = (props) => {

    return (props.trigger) ? (
        <div className="profile-popup">
            <div className="profile-popup-inner">
                {props.children}
                <Button onClick={() => props.setTrigger()} className="profile-cancel">Close</Button>
            </div>
        </div>
    ) : "";
}

export default Profile;