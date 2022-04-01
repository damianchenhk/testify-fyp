import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { BsPen, BsPlusLg, BsCameraVideo } from "react-icons/bs";
import TypeAnimation from 'react-type-animation';
import { Link } from "react-router-dom";
class Landing extends Component {
    render() {
        return (
            <>
                <div className="landing-hero">
                    <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/landingHero.png"/>
                    <Row className="landing-hero-text">
                        <Container>
                            <h1 style={{fontFamily: "monospace", color:'white', marginBottom:'60px'}}>
                            <TypeAnimation
                                cursor={true}
                                sequence={['This is Testify', 4000, '', 1000]}
                                repeat={Infinity}
                            />
                            </h1>
                            <p className="flow-text grey-text text-lighten-1" style={{marginBottom:'60px'}}>
                            The new platform for lifelong learners. Begin your learning journey here.
                            </p>
                            <Row>
                                <Col s={6} style={{textAlign:'right'}}>
                                    <Link
                                        to="/register"
                                        style={{
                                            width: "140px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginRight: '50px'
                                        }}
                                        className="btn btn-large waves-effect waves-light"
                                    >
                                        Register
                                    </Link>
                                </Col>
                                <Col s={6} style={{textAlign:'left'}}>
                                    <Link
                                        to="/login"
                                        style={{
                                            width: "140px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginLeft: '50px'
                                        }}
                                        className="btn btn-large waves-effect white black-text"
                                    >
                                        Log In
                                    </Link>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </div>
                <br/>
                <Row className="landing-content">
                    <Col lg={5}>
                            <div className="landing-content-box">
                                <div className="landing-content-details">
                                    <h3><BsCameraVideo style={{marginBottom:'9px'}}/><strong> Watch Courses</strong></h3>
                                    <h5>Expand your knowledge, deepen existing passions, and get lost in learning.</h5>
                                </div>
                            </div>
                    </Col>
                    <Col lg={7} style={{paddingRight:'0'}}>
                        <div className="landing-content-img landing-content-img-right">
                            <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/view-courses.png"/>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row className="landing-content">
                    <Col lg={7} style={{paddingLeft:'0'}}>
                        <div className="landing-content-img landing-content-img-left">
                            <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/create-test.png"/>
                        </div>
                    </Col>
                    <Col lg={5}>
                        <div className="landing-content-box">
                            <div className="landing-content-details">
                                <h3><BsPlusLg style={{marginBottom:'10px'}}/><strong> Create Tests</strong></h3>
                                <h5>Test your knowledge, help your peers improve, and learn from their mistakes.</h5>
                            </div>
                        </div>
                    </Col>
                </Row>
                <br/>
                <Row className="landing-content">
                    <Col lg={5}>
                            <div className="landing-content-box">
                                <div className="landing-content-details">
                                    <h3><BsPen style={{marginBottom:'10px'}}/><strong> Attempt Tests</strong></h3>
                                    <h5>Try the tests made by others and practice the knowledge you've learnt.</h5>
                                </div>
                            </div>
                    </Col>
                    <Col lg={7} style={{paddingRight:'0'}}>
                        <div className="landing-content-img landing-content-img-right">
                            <img src="https://testify-fyp.s3.ap-southeast-1.amazonaws.com/do-test.png"/>
                        </div>
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </>
        );
    }
}
export default Landing;