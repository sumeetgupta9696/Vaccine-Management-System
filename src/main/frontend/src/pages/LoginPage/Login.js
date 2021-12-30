import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { GoogleLogin } from "react-google-login";
import config from "../../config.json";
import Header from "../Header";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "Patient",
      email: "",
      password: "",
      loginType: "Portal",
      firstName: "",
      lastName: "",
    };
  }

  handleLogin = (e) => {
    e.preventDefault();
    var headers = new Headers();
    headers.append("Access-Control-Allow-Credential", true);
    //send POST request to "/login"
    const { email, password, loginType, firstName, lastName, role } =
      this.state;

    const loginReq = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      loginType: loginType,
      isAdmin: role === "Admin" ? true : false,
    };
    console.log(loginReq);
    axios
      .post(config.backEndURL + "/api/login", loginReq, headers)
      .then((response) => {
        const { password, ...user } = response.data;
        console.log(response, role, user.admin);

        if (response.status === 200) {
          if (
            role === "Patient" &&
            user.admin === false &&
            user.verified === false
          ) {
            toast.error("You need to verify your account to login", {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          } else if (role === "Patient" && user.admin === false) {
            localStorage.setItem("user", JSON.stringify(user));
            Cookies.set("Role", "Patient");
            this.props.history.push("/patientHome");
          } else if (role === "Admin" && user.admin === true) {
            localStorage.setItem("user", JSON.stringify(user));
            Cookies.set("Role", "Admin");
            this.props.history.push("/adminHome");
          } else {
            toast.error("You're signing in with incorrect role", {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }
        }
      })
      .catch(() => {
        toast.error("Incorrect Login Credentials", {
          position: toast.POSITION.TOP_CENTER,
        });
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

  roleChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      role: e.target.value,
      email: "",
      password: "",
    });
  };
  responseGoogleSuccess = (response) => {
    console.log(response);

    this.setState({
      loginType: "Google",
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      email: response.profileObj.email,
    });
    const { email, password, loginType, firstName, lastName, role } =
      this.state;

    const loginReq = {
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      email: response.profileObj.email,
      loginType: loginType,
      isAdmin: role === "Admin" ? true : false,
    };
    axios
      .post(config.backEndURL + "/api/login", loginReq)
      .then((response) => {
        console.log(response.data);
        const { password, ...user } = response.data;
console.log(user);
        if (response.status === 200) {
       const emailSplit=user.email.split("@");
       if(emailSplit[1]==='sjsu.edu')
       this.props.history.push("/adminHome");
          else if (role === "Patient" && user.admin === false) {
            localStorage.setItem("user", JSON.stringify(user));
            Cookies.set("Role", "Patient");
            this.props.history.push("/patientHome");
          } else if (role === "Admin" && user.admin === true) {
            localStorage.setItem("user", JSON.stringify(user));
            Cookies.set("Role", "Admin");
            this.props.history.push("/adminHome");
          } else {
            toast.error("You're signing in with incorrect role", {
              position: toast.POSITION.TOP_CENTER,
            });
            return;
          }
        }
      })
      .catch(() => {
        toast.error("Incorrect Login Credentials", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  // Error Handler
  responseGoogleError = (response) => {
    console.log(response);
  };
  render() {
    const user = Cookies.get("Role");
    if (user) {
      if (user === "Patient") {
        window.location.replace("/patientHome");
      } else if (user === "Admin") {
        window.location.replace("/adminHome");
      }
    }
    return (
      <div className="credentials">
        <Header/>
        <form onSubmit={this.handleLogin} className="form-signin">
          <h1 className="mb-4 title">Vaccine management system</h1>
          <h2
            style={{ marginLeft: "8vw" }}
            className="h3 mb-3 font-weight-normal signin"
          >
            Sign in as
          </h2>
          <select onChange={this.roleChangeHandler} id="options">
            <option value="Patient">Patient</option>
            <option value="Admin">Admin</option>
          </select>
          <br />
          <br />
          <h4
            style={{ marginLeft: "0vh" }}
            className="h4 mb-3 font-weight-normal signin"
          >
            Welcome Back!
          </h4>
          <br />
          <input
            onChange={this.emailChangeHandler}
            value={this.state.email}
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email Address"
            required
            autoFocus
          />
          <input
            onChange={this.passwordChangeHandler}
            value={this.state.password}
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
          <button className="btn1 btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>

          <GoogleLogin
            clientId="857063878187-8os7dud08rq5prsjvss674o1pnuafcse.apps.googleusercontent.com"
            buttonText="Sign In with Google"
            className="btn1 btn-lg btn-primary btn-block"
            onSuccess={this.responseGoogleSuccess}
            onFailure={this.responseGoogleError}
          //  isSignedIn={true}
            cookiePolicy={"single_host_origin"}
          />
          <br />
          <p className="display--inline">
            New to VMS?{" "}
            <a className="login-a" href="/signup">
              Create an account
            </a>
          </p>
        </form>
      </div>
    );
  }
}
