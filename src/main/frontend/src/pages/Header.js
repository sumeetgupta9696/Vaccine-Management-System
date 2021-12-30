import React, { Component } from 'react';
import {
  Navbar, Nav, Dropdown, Col, Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Logo from '../image/logo.svg';
import Cookies from 'js-cookie'

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem('name'),
    };
  }

  handleLogout = () => {
    localStorage.clear();
    Cookies.remove('Role');
  };

  handleAddDisease = (e) => {
    e.preventDefault();
    window.location.replace('/addDisease');
  };

  handleUpdateVaccine = (e) => {
    e.preventDefault();
    window.location.replace('/updateVaccine');
  };

  handleAddVaccine = (e) => {
    e.preventDefault();
    window.location.replace('/addVaccine');
  };

  handleAddClinic = (e) => {
    e.preventDefault();
    window.location.replace('/addClinic');
  };

    login = (e) => {
        e.preventDefault();
        window.location.replace('/login');
    }

    signup = (e) => {
        e.preventDefault();
        window.location.replace('/signup');
    }

  render() {
    let navUser = null;
    let nameDropDownAdmin= null;

    nameDropDownAdmin = (
      <Dropdown>
        <Dropdown.Toggle style={{backgroundColor: '#C0C0C0'}} variant="light" id="dropdown-basic">
          &nbsp;
          Menu
          {/* {this.state.name} */}
        </Dropdown.Toggle>

        <Dropdown.Menu>
        <Dropdown.Item><Link to="/" className="nav-link" onClick={this.handleAddDisease}>Add Disease</Link></Dropdown.Item>
        <Dropdown.Item><Link to="/" className="nav-link" onClick={this.handleAddVaccine}>Add Vaccine</Link></Dropdown.Item>
        <Dropdown.Item><Link to="/" className="nav-link" onClick={this.handleAddClinic}>Add Clinic</Link></Dropdown.Item>
        <Dropdown.Item><Link to="/" className="nav-link" onClick={this.handleUpdateVaccine}>Update Vaccine</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/" className="nav-link" onClick={this.handleLogout}>Log out</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

if((Cookies.get('Role')==='Admin')){
      console.log("inside admin home");
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Navbar.Brand>
            <Link to="/adminhome">
              <img src={Logo} width="60" height="auto" className="d-inline-block align-top" alt="Airline" />
            </Link>
          </Navbar.Brand>
          <h3>Vaccine Management System</h3>
          <Nav className="mr-auto" />
          <Nav.Item style={{marginLeft:"50%"}}><Nav.Link>{nameDropDownAdmin}</Nav.Link></Nav.Item>
        </div>
      );
    }
    else {
      // navLocation = '/';
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Navbar.Brand>
            <Link to="/">
              <img src={Logo} width="60" height="auto" className="d-inline-block align-top" alt="Airline" />
            </Link>
          </Navbar.Brand>
          <h3>Vaccine Management System</h3>
          <div style={{marginLeft:"60%"}} ><button className="btn btn-success btn-md" onClick={this.login}>Login</button></div>
          <div style={{marginLeft:"10px"}} ><button className="btn btn-warning btn-md" onClick={this.signup}>Sign Up</button></div>
          <Nav className="mr-auto" />
        </div>
      );
    }

    return (
      <div>
        <Navbar style={{ backgroundColor: '#ADD8E6' }} variant="light">
          <Col xs lg="1">
            {'\u00A0'}
          </Col>
          {navUser}
          <Col xs lg="1">
            {'\u00A0'}
          </Col>
        </Navbar>
      </div>
    );
  }
}