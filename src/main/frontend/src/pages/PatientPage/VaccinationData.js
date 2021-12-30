import React, { Component } from "react";
import Cookies from "js-cookie";
import axios from 'axios';
import config from "../../config.json";
export default class VaccinationData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vaccineHistory:[],
      vaccineDue: [
        {
          name: "Pfizer",
          no_of_shots: 1,
          clinic: "clinic1",
          dueDate: "2021-12-20",
        },
        {
          name: "Moderna",
          no_of_shots: 2,
          clinic: "clinic2",
          dueDate: "2021-01-14",
        },
        {
          name: "Booster",
          no_of_shots: 1,
          clinic: "clinic3",
          dueDate: "2022-01-30",
        },
        {
          name: "Other",
          no_of_shots: 3,
          clinic: "clinic4",
          dueDate: "2022-12-10",
        },
      ],
    };
  }
componentDidMount(){
this.getVaccineHistData();
}

getVaccineHistData=()=>{
  const user = JSON.parse(localStorage.getItem("user"));
  axios
  .get(config.backEndURL + "/vaccinationHistory?patientId="+user.mrn)
  .then((response) => {
    console.log(response);
    if (response.status === 200) {
      this.setState({
        vaccineHistory: response.data,
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
}

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
    let columnnames=["Appointment_Id","Vaccine","Number_Of_Shots","clinic_name","appointment_date"]
    
    return columnnames.map((column, index) => {
      return (
        <th className="thead-dark" key={index}>
          {column}
        </th>
      );
    });
  }

  renderTableData() {
    if(this.state.vaccineHistory.length>0){
    return this.state.vaccineHistory.map((vaccine, index) => {
      const name=vaccine[0];
    
      const clinicName=vaccine[1];
      const appointment_date=vaccine[2]
      const appointment_id=vaccine[3];
      const numShots=vaccine[4];
      //const { name, number_of_shorts, clinicName, appointment_date } = vaccine;
      return (
        <tr>
            <td>{appointment_id}</td>
          <td>{name}</td>
          <td>{numShots}</td>
          <td>{clinicName}</td>
          <td>{appointment_date}</td>
        </tr>
      );
    });
  }
  else
  return (<span>No Vaccination History</span>)
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
