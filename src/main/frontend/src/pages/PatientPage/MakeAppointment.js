import React, { Component } from "react";
import PatientHeader from "./PatientHeader";
import Cookies from "js-cookie";
import config from "../../config.json";
import { Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

export default class MakeAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clinics: [],
      selectedClinicId: 0,
      bookedAppt: [],
      clinicAppt: [],
      appointmentDate: "",
      selectedSlot: "",
      vaccines: [],
      selectedVaccines: [],
    };
  }
  componentDidMount() {
    this.getClinics();
    let date = new Date();
    // date.setDate(date.getDate() + 1);
    let date1 = moment(date).format("yyyy-MM-DD");
    console.log(date1);
    this.setState({
      appointmentDate: date1,
    });
    this.getVaccines();
  }
  getClinics = () => {
    axios
      .get(config.backEndURL + "/clinics")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            clinics: response.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  clinicSelected = (e) => {
    const clinicId = Number(e.target.value);
    const clinics = this.state.clinics;
    console.log("clinics:", clinics);
    const clinicIndex = clinics.findIndex((clinic) => clinic.id === clinicId);
    console.log(clinicIndex);
    //console.log(clinics[clinicIndex].id);
    if (clinicIndex > -1) {
      this.setState({
        selectedClinicId: clinics[clinicIndex].id,
      });
      //this.getAppointmentTimesForClinic();
    }
  };
  getAppointmentTimesForClinic = (apptDate) => {
    console.log("inside");
    const apptTimeReq = {
      clinicId: this.state.selectedClinicId,
      appointmentDate: apptDate,
    };
    console.log(this.state.appointmentDate);
    console.log(apptTimeReq);
    if (apptTimeReq.clinicId > 0) {
      axios
        .post(config.backEndURL + "/appointmentTimes", apptTimeReq)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            console.log(response);
            this.setState({
              bookedAppt: response.data.bookedAppt,
              clinicAppt: response.data.clinicAppt,
            });
          }
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  };
  getVaccines = () => {
    axios
      .get(config.backEndURL + "/vaccines")
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          this.setState({
            vaccines: response.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleDateChange = (e) => {
    console.log(e.target.value);
    const apptDate = e.target.value;
    //     let date=moment(value).format("yyyy-MM-DD");
    //
    //console.log(date);
    this.setState({
      appointmentDate: e.target.value,
    });
    this.getAppointmentTimesForClinic(apptDate);
  };
  bookSlotChanged = (e) => {
    this.setState({
      selectedSlot: e.target.value,
    });
  };
  vaccineChecked = (e, vaccine) => {
    // const name=e.target.name;
    console.log(e);
    console.log(vaccine);
    let selectedVaccines = this.state.selectedVaccines;
    if (e.target.checked) {
      selectedVaccines.push(vaccine.name);
    } else {
      const vaccIndex = selectedVaccines.findIndex(
        (vacc) => vacc === vaccine.name
      );
      if (vaccIndex > -1) selectedVaccines.splice(vaccIndex, 1);
    }
    this.setState({
      selectedVaccines: selectedVaccines,
    });
  };
  createAppointment = () => {
    const bookedAppt = this.state.bookedAppt;
    const selectedSlot = this.state.selectedSlot;
    const clinicId = this.state.selectedClinicId;
    const clinics = this.state.clinics;
    if (bookedAppt !== null) {
      if (bookedAppt.length > 0) {
        const filteredBookedAppt = bookedAppt.filter(
          (appt) => appt === selectedSlot
        );
        if (filteredBookedAppt !== null) {
          if (filteredBookedAppt.length > 0) {
            const clinicIndex = clinics.findIndex(
              (clinic) => clinic.id === clinicId
            );
            if (clinicIndex > -1) {
              if (
                filteredBookedAppt.length >=
                clinics[clinicIndex].numberOfPhysicians
              ) {
                alert("No Slots available.Please select different slot");
                return;
              }
            }
          }
        }
      }
    }

    if (this.state.selectedClinicId === 0) {
      alert("Please select clinic Name");
      return;
    }
    if (this.state.selectedVaccines.length === 0) {
      alert("Please select atleast one vaccine");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const apptTimeReq = {
      clinicId: this.state.selectedClinicId,
      appointmentDate: this.state.appointmentDate,
      appointmentTime: this.state.selectedSlot,
      patientId: user.mrn,
      vaccines: this.state.selectedVaccines,
    };

    axios
      .post(config.backEndURL + "/createAppointment", apptTimeReq)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const CustomToast = ({ closeToast }) => {
            return (
              <div style={{ textAlign: "center" }}>
                <h4>Successfully Created Appointment!</h4>
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
        console.log(err.response);
        alert(err.response.data.errorDesc);
      });
  };

  render() {
    let clinic;
    let bookSlots;
    let vaccines;
    let today = new Date();

    let currDate = moment(today).format("yyyy-MM-DD");
    let addmaxDate = moment(currDate).add(1, "years").calendar();
    let maxDate = moment(addmaxDate).format("yyyy-MM-DD");
    const user = Cookies.get("Role");
    if (!user) {
      window.location.replace("/");
    } else if (user === "Admin") {
      window.location.replace("/adminHome");
    }

    if (this.state.clinics.length > 0) {
      clinic = this.state.clinics.map((clinic, index) => {
        return <option value={clinic.id}>{clinic.name}</option>;
      });
    }
    if (this.state.clinicAppt !== null) {
      if (this.state.clinicAppt.length > 0) {
        bookSlots = this.state.clinicAppt.map((appt, index) => {
          return <option value={appt}>{appt}</option>;
        });
      }
    }
    if (this.state.vaccines.length > 0) {
      vaccines = this.state.vaccines.map((vaccine, index) => {
        return (
          <span>
            <input
              type="checkbox"
              onChange={(e) => this.vaccineChecked(e, vaccine)}
            />
            {vaccine.name}
            <br />
          </span>
        );
      });
    }

    return (
      <div>
        <div>
          <PatientHeader />
        </div>
        <div>
          <Row className="mt-5">
            <Col md={{ span: 7, offset: 1 }}>
              <Row>
                <h2>Make Appointment</h2>
                {/* {this.state.appState === true ? (
                  <button onClick={this.getPastAppointments()}>Past</button>
                ) : (
                  <button onClick={this.componentDidMount()}>Future</button>
                )} */}
              </Row>
            </Col>
          </Row>
        </div>
        <div className="makeAppt" style={{ marginLeft: "200px" }}>
          <label>Clinic</label>
          <br />
          <select
            name="clinic"
            value={this.state.selectedClinicId}
            onChange={this.clinicSelected}
          >
            <option value="0">Select Clinic</option>
            {clinic}
          </select>
          <br />
          <label className="mt-3">Select Date</label>
          <br />
          <input
            type="date"
            value={this.state.appointmentDate}
            min={currDate}
            max={maxDate}
            onChange={this.handleDateChange}
          />
          <br />
          <label>Book Slot</label>
          <br />
          <select
            name="bookSlot"
            value={this.state.selectedSlot}
            onChange={this.bookSlotChanged}
          >
            <option value="0">Select Slot</option>
            {bookSlots}
          </select>
          <br />
          {vaccines}
          <button
            className="btn btn-success"
            type="button"
            style={{ marginTop: "5px" }}
            onClick={this.createAppointment}
          >
            Create Appointment
          </button>

          {/* <DatePicker
  selected={this.state.appointmentDate}
  dateFormat="yyyy-MM-dd"

  onChange={this.handleDateChange} //only when value has changed
/> */}
        </div>
      </div>
    );
  }
}
