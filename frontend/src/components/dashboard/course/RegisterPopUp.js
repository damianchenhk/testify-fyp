import React from "react";
import { Button } from "react-bootstrap";
import "./css/RegisterPopUp.css";

const RegisterPopUp = (props) => {

    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                {props.children}
                <Button onClick={e => props.setSubmit(e)} className="confirm">Confirm</Button>
                <Button onClick={() => props.setTrigger()} className="cancel">Cancel</Button>
            </div>
        </div>
    ) : "";
}

export default RegisterPopUp;