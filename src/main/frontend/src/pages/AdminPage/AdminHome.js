import React, { Component } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import { Divider } from "@material-ui/core";
import Moment from "moment";
import Header from "../Header";

export default class AdminHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
        clinic: [],
    };
}

  componentDidMount = async () => {
    await axios
        .get('/admin/getAllClinic')
        .then((response) => {
            if (response.status === 200) {
                this.setState({
                  clinic: response.data
                })
                console.log("Clinic :", this.state.clinic);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    //  this.state.vaccinestatus.map((item) => {
    //      const arrEle = item;
    //      arrEle['checked'] = false;
    //  }, console.log(this.state.vaccinestatus));
}

  render() {
    // const user = Cookies.get("Role");
    // if (!user) {
    //   window.location.replace("/");
    // } else if (user === "Patient") {
    //   window.location.replace("/patientHome");
    // }
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          {/* <NavBar /> */}
          <Row className="mt-5">
            <Col md={{ span: 2, offset: 1 }}>
              <Row>
                <h2>Dashboard</h2>
                <Row>
                  <br />
                  <br />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft:"10px",
                      width: "100%",
                    }}
                  >
                    {this.state.clinic.map((item) => (
                      <label>
                      <Col style={{marginLeft:"20px"}}>
                      <Card>
                        <Card.Header>Clinic Details</Card.Header>
                        <Card.Body>
                          <Card.Text>Clinic Name: {item.name}</Card.Text>
                          <Card.Text>Business Time: {item.businessStartTime}- {item.businessEndTime} </Card.Text>
                          <Button variant="success">Details</Button>
                        </Card.Body>
                      </Card>
                      </Col>
                                    {/* <input
                                        id="edit1"
                                        type="checkbox"
                                        value={item.name}
                                        checked={this.state.diseases.includes(item.name) ? true : false}
                                        onChange={this.handleDiseaseCheckbox}
                                    //disabled
                                    />
                                    {item.name} */}
                        </label>
                      ))}
                  </div>
                </Row>
                <br />
                <br />
                <Row>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                  </div>
                </Row>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
