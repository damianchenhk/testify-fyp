import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { BsHouse,BsPen, BsLaptop, BsFileEarmarkPerson, BsPersonSquare, BsPersonCheck, BsPlusLg } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiPencilRuler2Line } from "react-icons/ri";
import { connect } from "react-redux";
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import "../../App.css";

const { SubMenu } = Menu;

const Sidebar = ({auth}) => {

  const [current, setCurrent] = useState('');
  const history = useHistory();
  const location = useLocation();
    
  const handleClick = e => {
    setCurrent(e.key)
  };

  const subMenuOpen = () => {
    switch(location.pathname) {
      case '/course':
        return 'courses';
      case '/yourtests':
        return 'tests';
      case '/pendingtests':
          return 'tests';
      default:
        return 'courses';
    }
  }

  return (
    <>
      <div className="sidebar">
        <Menu
          onClick={handleClick}
          defaultSelectedKeys={[location.pathname]}
          defaultOpenKeys={[subMenuOpen()]}
          mode="inline"
          style={{position: 'fixed', width: '250px', fontSize:'15px', color:'#0f443f', letterSpacing: '1px'}}
        >
          <Menu.Item key="/dashboard" icon={<BsHouse/>} onClick={() => history.push("/dashboard")}>Home</Menu.Item>
          <SubMenu key="courses" title="Courses" icon={<FaChalkboardTeacher/>}>
            {auth.user.role==='Admin' ? <Menu.Item key="/admincourses" style={{color:'#0f443f'}} icon={<BsLaptop/>} onClick={() => history.push("/admincourses")}>All Courses</Menu.Item> : null}
            {auth.user.role==='Instructor' ? <Menu.Item key="/addcourse" style={{color:'#0f443f'}} icon={<BsPlusLg size={'15px'} style={{marginBottom:'2px'}}/>} onClick={() => history.push("/addcourse")}>Add Course</Menu.Item> : null}
            {auth.user.role==='Instructor' ? <Menu.Item key="/instructorcourses" style={{color:'#0f443f'}} icon={<BsPersonSquare/>} onClick={() => history.push("/instructorcourses")}>My Courses</Menu.Item> : null}
            {auth.user.role==='Student' ? <Menu.Item key="/mycourses" style={{color:'#0f443f'}} icon={<BsPersonSquare/>} onClick={() => history.push("/mycourses")}>My Courses</Menu.Item> : null}
            {auth.user.role==='Student' ? <Menu.Item key="/course" style={{color:'#0f443f'}} icon={<BsLaptop/>} onClick={() => history.push("/course")}>All Courses</Menu.Item> : null}
          </SubMenu>
          {auth.user.role==='Student' ? <SubMenu key="tests" title="Tests" icon={<RiPencilRuler2Line/>}>
            <Menu.Item key="/yourtests" icon={<BsPen/>} style={{color:'#0f443f'}} onClick={() => history.push("/yourtests")}>My Tests</Menu.Item>
            <Menu.Item key="/pendingtests" icon={<BsPersonCheck/>} style={{color:'#0f443f'}} onClick={() => history.push("/pendingtests")}>Pending Tests</Menu.Item>
          </SubMenu> : null}
          {auth.user.role==='Admin' ? <Menu.Item key="/adminuserlist" onClick={() => history.push("/adminuserlist")} icon={<BsFileEarmarkPerson/>}>All Users</Menu.Item> : null}
        </Menu>
      </div>
    </>
  );
}

Sidebar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
)(Sidebar);