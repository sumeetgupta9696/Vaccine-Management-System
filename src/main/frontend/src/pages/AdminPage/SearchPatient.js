import React from "react";
import { Component } from "react";
import { Row, Col,Form, FormLabel, Button, Card } from "react-bootstrap";
import { Divider } from "@material-ui/core";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import Moment from 'moment';
import axios from 'axios';
// import AdminHeader from './AdminHeader';
import Header from '../Header';

// import apiHost from '../../apiHost';

// import "./Map.css"
// import 'bootstrap/dist/css/bootstrap.css';
// import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
// var DatePicker = require("react-bootstrap-date-picker");

export default class SearchPatient extends Component {
  constructor(props) {
    super(props);
    this.state = { country: "", date: "", formatdate:"",message:'' };
  }

  selectCountry = (val) => {
    this.setState({ country: val });
  };

  selectDate = (val) => {
    this.setState({
      [val.target.name]:val.target.value
    });
  };

  checkstatus =async ()=> {
    let d1=this.state.date.split('-')
    for (let i in d1){
      d1[i] = parseInt(d1[i])
    }
    let d2 = `${d1[1]}/${d1[2]}/${d1[0]}`
    console.log(d2)
    this.setState({
      formatdate: d2,
    })
    localStorage.setItem('date', d2);
    const data = {
      country: this.state.country,
      date: d2,
    };
    console.log("-----check-----", data);
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
    const message= await axios.post(`http://localhost:3000/api/prediction`,data);
    console.log("------received message-------",message.data);
    this.setState({
      message: message.data.message
    })
    console.log("-----check state message----",this.state.message);
  }

  render() {
    let card = null;

    if(this.state.message==="Safe"){
      card=(
        <Card>
        <Card.Header>SAFE</Card.Header>
        <Card.Body>
          <Card.Title>Travelling to {this.state.country} is Safe</Card.Title>
          <Card.Text>
          This country is safe to travel and here Active cases are low.
          </Card.Text>
          <Button variant="success">SAFE TO VISIT</Button>
        </Card.Body>
      </Card>
      )
    }
    else if(this.state.message==="Unsafe"){
      card=(
        <Card>
        <Card.Header>UNSAFE</Card.Header>
        <Card.Body>
          <Card.Title>Travelling to {this.state.country} is Unsafe</Card.Title>
          <Card.Text>
          This country is not safe to travel as the new cases are rising and active cases are high.
          </Card.Text>
          <Button variant="danger">UNSAFE TO VISIT</Button>
        </Card.Body>
      </Card>
      )
    }
    else if(this.state.message==="Moderate"){
      card=(
        <Card>
        <Card.Header>MODERATE</Card.Header>
        <Card.Body>
          <Card.Title>Check lockdown conditions before travelling to {this.state.country}</Card.Title>
          <Card.Text>
          This country is moderate to travel as here the new cases are emerging as same as recovered cases.
          </Card.Text>
          <Button variant="warning">CHECK LOCKDOWN CONDITIONS</Button>
        </Card.Body>
      </Card>
      )
    }
    else if(this.state.message==="No Data"){
      card=(
        <Card>
        <Card.Header>NO DATA</Card.Header>
        <Card.Body>
          <Card.Title>Sorry but no data on {this.state.country}</Card.Title>
          <Card.Text>
          Unfornately, no data was available for this country.
          </Card.Text>
          <Button variant="light">NO DATA !</Button>
        </Card.Body>
      </Card>
      )
    }

    // const { country, date } = this.state;
    // console.log("----country check----", this.state.country);
    // console.log("-----date check-----------", this.state.date);


    return (
      <div>
      <Header />
      <div style={{ paddingLeft: 50, paddingTop: 50, width: "50%" }}>
          <h3>Please enter Patient Name: </h3>
          <Card style={{ padding: 20 }}>
              <form onSubmit={this.handleAddVaccine}>
                  <label>Patient Name*</label>
                  <input type="text" value={this.state.patientname} onChange={this.patientnameChangeHandler} className="input-group mb-3" required />
                  <button style={{ width: "100%", marginTop: 5 }} className="btn btn-primary btn-block" type="submit"> Search Patient </button>
              </form>
          </Card>
      </div>
  </div>
    );
  }
}