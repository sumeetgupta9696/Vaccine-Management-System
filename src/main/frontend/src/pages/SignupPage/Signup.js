import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import config from "../../config.json";
import Header from "../Header";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      middleName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      email: "",
      password: "",
      gender: "",
      signUpDone: false,
      redirectState: "",
      isAdmin:false,
      dob:""
    };
  }

  signUp = (e) => {
    e.preventDefault();
    // send POST request to "/signup"
    console.log(this.state);
    axios
      .post(config.backEndURL + "/api/signup", this.state)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            redirectState: <Redirect to="/login"></Redirect>,
          });
          localStorage.setItem("user", JSON.stringify(response.data));
          const CustomToast = ({ closeToast }) => {
            return (
              <div style={{ textAlign: "center" }}>
                <h4>Successfully Created Account!</h4>
              </div>
            );
          };
          toast.success(<CustomToast />, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to signup using these details", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  firstNameChangeHandler = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };

  middleNameChangeHandler = (e) => {
    this.setState({
      middleName: e.target.value,
    });
  };

  lastNameChangeHandler = (e) => {
    this.setState({
      lastName: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  streetChangeHandler = (e) => {
    this.setState({
      street: e.target.value,
    });
  };

  cityChangeHandler = (e) => {
    this.setState({
      city: e.target.value,
    });
  };

  stateChangeHandler = (e) => {
    this.setState({
      state: e,
    });
  };

  countryChangeHandler = (e) => {
    this.setState({
      country: e,
    });
  };

  zipChangeHandler = (e) => {
    this.setState({
      zip: e.target.value,
    });
  };

  genderChangeValue = (e) => {
    this.setState({
      gender: e.target.value,
    });
  };
  dobChanged=(e)=>{
    console.log(e.target.value);
    this.setState({
      dob:e.target.value
    })
  };
  userTypeChanged=(e)=>{
    this.setState({
      isAdmin:e.target.value===1?false:true
    })
  }

  render() {
    if (this.state.signUpDone) {
      // Add verification route
      this.props.history.push("/verification");
    }
    const user = Cookies.get("Role");
    if (user) {
      if (user === "Patient") {
        window.location.replace("/patientHome");
      } else if (user === "Admin") {
        window.location.replace("/adminHome");
      }
    }
    const {
      firstName,
      middleName,
      lastName,
      gender,
      street,
      state,
      country,
      zip,
      city,
      email,
      password,
    dob
    } = this.state;
    return (
      <div className="credentials">
        {this.state.redirectState}
        <Header/>
        <form onSubmit={this.signUp} className="form-signin">
          <h1 className="mb-4 title">Vaccine Management System</h1>
          {/* <h4
            style={{ marginLeft: "0vh" }}
            className="h4 mb-3 font-weight-normal signin"
          >
            Let's get started!
          </h4> */}
          {/* <label htmlFor="inputName" className="sr-only">Name</label> */}
          <input
            onChange={this.firstNameChangeHandler}
            value={firstName}
            type="text"
            name="firstName"
            className="input-group mb-3"
            placeholder="First Name"
            required
            autoFocus
            autocomplete="off"
          />
          <input
            onChange={this.middleNameChangeHandler}
            value={middleName}
            type="text"
            name="middleName"
            className="input-group mb-3"
            placeholder="Middle Name (Optional)"
            autocomplete="off"
          />
          <input
            onChange={this.lastNameChangeHandler}
            value={lastName}
            type="text"
            name="lastName"
            className="input-group mb-3"
            placeholder="Last Name"
            required
            autocomplete="off"
          />
          <input type="date" 
           value={dob}
           className="input-group mb-3"
           onChange={this.dobChanged}
           required/>
           {/* <input
            onChange={this.dobChanged}
            value={dob}
            type="text"
            name="DOB"
            className="input-group mb-3"
            placeholder="mm/dd/yyyy"
            required
            autocomplete="off"
          /> */}
          <label htmlFor="inputGender" className>
            User Type
          </label>
          <br/>
          <select name="userType" onChange={this.userTypeChanged}>
            <option value="1">Patient</option>
            <option value="2">Admin</option>
          </select>
          <br/>
          <label htmlFor="inputGender" className>
            Gender
          </label>
          <div onChange={this.genderChangeValue}>
            <input type="radio" value="Male" name="gender" /> Male
            <br />
            <input type="radio" value="Female" name="gender" /> Female
            <br />
            <input type="radio" value="Other" name="gender" /> Other
          </div>
          <br />
          <input
            onChange={this.streetChangeHandler}
            type="text"
            name="street"
            value={street}
            placeholder="Street number"
            className="input-group mb-3"
            required
          />
          <input
            onChange={this.cityChangeHandler}
            type="text"
            value={city}
            name="city"
            placeholder="City"
            className="input-group mb-3"
            required
          />
          <RegionDropdown
            className="input-group mb-3"
            country={country}
            value={state}
            onChange={(val) => this.stateChangeHandler(val)}
            required
          />
          <CountryDropdown
            className="input-group mb-3"
            value={country}
            onChange={(val) => this.countryChangeHandler(val)}
            required
          />
          <input
            onChange={this.zipChangeHandler}
            type="text"
            name="zip"
            value={zip}
            pattern="[0-9]{5}"
            placeholder="Zip code"
            className="input-group mb-3"
            required
          />
          {/* <label htmlFor="inputEmail" className="sr-only">Email Address</label> */}
          <input
            onChange={this.emailChangeHandler}
            value={email}
            type="email"
            name="email"
            className="input-group mb-3"
            placeholder="Email Address"
            required
          />
          {/* <label htmlFor="inputPassword" className="sr-only">Password</label> */}
          <input
            onChange={this.passwordChangeHandler}
            value={password}
            type="password"
            name="password"
            className="input-group mb-3"
            placeholder="Password"
            required
            autocomplete="off"
          />
          <button className="btn1 btn-lg btn-primary btn-block" type="submit">
            Register
          </button>
          <br />
          <p className="display--inline">
            Already use VMS?{" "}
            <a className="login-a" href="/login">
              Sign in
            </a>
          </p>
        </form>
      </div>
    );
  }
}
