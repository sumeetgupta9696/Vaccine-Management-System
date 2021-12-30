import React, { Component } from "react";
import Cookies from "js-cookie";
import { Card } from "react-bootstrap";
import axios from 'axios';
import config from "../../config.json";

export default class VaccinationDue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vaccineDue: [
        { name: "Pfizer", shot_Due: 1, dueDate: "2021-12-20" },
        { name: "Moderna", shot_Due: 2, dueDate: "2021-01-14" },
        { name: "Booster", shot_Due: 1, dueDate: "2022-01-30" },
        { name: "Other", shot_Due: 3, dueDate: "2022-12-10" },
      ],
      currentDate: new Date().toISOString().split("T")[0],
      currentDateTime: new Date().toLocaleString(),
      maxDate: "",
      vaccineDueData:[]
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentDateTime: new Date().toLocaleString(),
      });
    }, 1000);
this.getVaccineDueData();

  }

  getVaccineDueData=()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    axios
    .get(config.backEndURL + "/vaccinationDue?patientId="+user.mrn)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.setState({
          vaccineDueData: response.data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  

  componentWillMount = async () => {
    var maxDateSet = new Date();
    maxDateSet.setMonth(maxDateSet.getMonth() + 12);
    console.log(maxDateSet.toISOString().split("T")[0]);
    this.setState({
      maxDate: maxDateSet.toISOString().split("T")[0],
    });
  };

  vaccineidChangeHandler = (e) => {
    this.setState({
      vaccineid: e.target.value,
    });
  };

  currentDateChangeHandler = (e) => {
    this.setState({
      currentDate: e.target.value,
    });
  };

  renderTableHeader() {
    let columnnames=["Name","Shot_Due","Due_Date"]
   // let header = Object.keys(this.state.vaccineDue[0]);
    return columnnames.map((column, index) => {
      return (
        <th className="thead-dark" key={index}>
          {column.toUpperCase()}
        </th>
      );
    });
  }

  renderTableData() {
    return this.state.vaccineDueData.map((vaccine, index) => {
     // const { name, shot_Due, dueDate } = student;
      const name=vaccine[0];
    
      const clinicName=vaccine[1];
      const appointment_date=vaccine[2]
      const appointment_id=vaccine[3];
      const numShots=vaccine[4];
      return (
        <tr>
          <td>{name}</td>
          <td>{numShots}</td>
          {this.state.currentDate > appointment_date ? (
            <td className="bg-danger">{appointment_date}</td>
          ) : (
            <td>{appointment_date}</td>
          )}
        </tr>
      );
    });
  }

  render() {
    const user = Cookies.get("Role");
    if (!user) {
      window.location.replace("/");
    } else if (user === "Admin") {
      window.location.replace("/adminHome");
    }
    return (
      <div>
        <div>
          <Card className="p-3 mb-3 w-50">
            <form onSubmit={this.handleAddVaccine}>
              <label className="mb-3">Current Date: </label>
              {"  "}
              {this.state.currentDateTime}
              <p className="mb-1">
                Update Date: {"  "}
                {this.state.currentDate}
              </p>
              <input
                name="currentDate"
                type="date"
                value={this.state.currentDate}
                max={this.state.maxDate}
                onChange={this.currentDateChangeHandler}
                className="input-group mb-3"
              />
            </form>
          </Card>
          <h3>Vaccination Due</h3>
          <table className="table table-bordered">
            <tbody>
              <tr className="bg-dark text-white">{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
