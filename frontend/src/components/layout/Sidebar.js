import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { BsHouse,BsPen, BsGear, BsLaptop } from "react-icons/bs";
import { connect } from "react-redux";
import { Menu } from 'antd';
import 'antd/dist/antd.css';

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
        >
          <Menu.Item key="/dashboard" icon={<BsHouse/>} onClick={() => history.push("/dashboard")}>Home</Menu.Item>
          <SubMenu key="courses" title="Courses" icon={<BsLaptop/>}>
            {auth.user.role==='Instructor' ? <Menu.Item key="/addcourse" onClick={() => history.push("/addcourse")}>Add Course</Menu.Item> : null}
            {auth.user.role==='Instructor' ? <Menu.Item key="/instructorcourses" onClick={() => history.push("/instructorcourses")}>My Courses</Menu.Item> : null}
            {auth.user.role==='Student' ? <Menu.Item key="/mycourses" onClick={() => history.push("/mycourses")}>My Courses</Menu.Item> : null}
            {auth.user.role==='Student' ? <Menu.Item key="/course" onClick={() => history.push("/course")}>All Courses</Menu.Item> : null}
          </SubMenu>
          <SubMenu key="tests" title="Tests" icon={<BsPen/>}>
            <Menu.Item key="/yourtests" onClick={() => history.push("/yourtests")}>Your Tests</Menu.Item>
            <Menu.Item key="pendingtests">Pending Tests</Menu.Item>
          </SubMenu>
          <Menu.Item key="settings" icon={<BsGear/>}>Settings</Menu.Item>
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