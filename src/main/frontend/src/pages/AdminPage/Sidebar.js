import React from "react";
import { slide as Menu } from "react-burger-menu";
import "./Sidebar.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  if ("Admin" === props.role) {
    return (
      <Menu disableAutoFocus>
        <Link to="/adminHome">Home</Link>
        <Link to="/searchpatient">Search Patient</Link>
        <Link to="/addDisease">Add Disease</Link>
        <Link to="/addVaccine">Add Vaccine</Link>
        <Link to="/addClinic">Add Clinic</Link>
        <Link to="/updateVaccine">Update Vaccine</Link>
        <button className="btnlog btn btn-dark" onClick={Logout}>
          Sign out
        </button>
      </Menu>
    );
  } else if ("Patient" === props.role) {
    return (
      <Menu disableAutoFocus>
        <Link to="/patientHome">Home</Link>
        <Link to="/vaccinationHistory">Vaccination History</Link>
        <Link to="/viewAppointments">View Appointments</Link>
        <Link to="/makeAppointment">Make Appointment</Link>
        <button className="btnlog btn btn-dark" onClick={Logout}>
          Sign out
        </button>
      </Menu>
    );
  }
};

const Logout = (e) => {
  localStorage.clear();
  Cookies.remove("Role");
  window.location.href = "/";
};

export default Sidebar;
