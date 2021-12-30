import React, { Component } from "react";
import PatientHeader from "./PatientHeader";
import { Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import config from "../../config.json";
import axios from "axios";
import moment from "moment";
import Modal from "@material-ui/core/Modal";
import ClearIcon from "@material-ui/icons/Clear";
import "./ViewAppointments.css";
import { toast } from "react-toastify";

export default class ViewAppointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      appState: true,
      changeApptFlag: false,
      clinics: [],
      appointmentDate: "",
      clinicAppt: [],
      selectedClinicId: 0,
      bookedAppt: [],
      clinicAppt: [],
      changedApptId: 0,
    };
  }

  async componentDidMount() {
    let date = new Date();
    let date1 = moment(date).format("yyyy-MM-DD");
    let currentDate = date1;
    let currentTime = date.toISOString().split("T")[1].split(".")[0];
    const user = JSON.parse(localStorage.getItem("user"));
    let patientId = user.mrn;
    console.log("date and time", currentDate, currentTime);
    await axios
      .get(config.backEndURL + "/getFutureAppointments", {
        params: {
          currentDate,
          currentTime,
          patientId,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            appointments: response.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getFutureAppointments = () => {
    let date = new Date();
    let date1 = moment(date).format("yyyy-MM-DD");
    let currentDate = date1;
    let currentTime = date.toISOString().split("T")[1].split(".")[0];
    const user = JSON.parse(localStorage.getItem("user"));
    let patientId = user.mrn;
    axios
      .get(config.backEndURL + "/getFutureAppointments", {
        params: {
          currentDate,
          currentTime,
          patientId,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            appointments: response.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
    if (this.state.appointments[0] != null) {
      let header = Object.keys(this.state.appointments[0]);
      return header.map((key, index) => {
        if (key !== "patientId") {
          if (key !== "clinicId")
            return (
              <th className="thead-dark" key={index}>
                {key.toUpperCase()}
              </th>
            );
        }
      });
    }
  }

  cancelAppointment(appointmentId, clinicId) {
    console.log("dummy", JSON.parse(localStorage.getItem("user"))["mrn"]);
    let cancelAppointment = {
      appointmentId: appointmentId,
      clinicId: clinicId,
      mrn: JSON.parse(localStorage.getItem("user"))["mrn"],
    };
    console.log("btn data", cancelAppointment);
    axios
      .put(config.backEndURL + "/cancelAppointment", cancelAppointment)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  }

  changeAppt = (e) => {
    let date = new Date();
    console.log(e.target.value);
    let date1 = moment(date).format("yyyy-MM-DD");
    this.setState({
      changeApptFlag: true,
      appointmentDate: date1,
      changedApptId: e.target.value,
    });

    this.getClinics();
  };
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
    console.log(clinics[clinicIndex].id);
    if (clinicIndex > -1) {
      this.setState({
        selectedClinicId: clinics[clinicIndex].id,
      });
      //this.getAppointmentTimesForClinic();
    }
  };
  getAppointmentTimesForClinic = () => {
    console.log("inside");
    const apptTimeReq = {
      clinicId: this.state.selectedClinicId,
      appointmentDate: this.state.appointmentDate,
    };
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
  handleDateChange = (e) => {
    console.log(e.target.value);
    //     let date=moment(value).format("yyyy-MM-DD");
    //
    //console.log(date);
    this.setState({
      appointmentDate: e.target.value,
    });
    this.getAppointmentTimesForClinic();
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
    //     let date=moment(value).format("yyyy-MM-DD");
    //
    //console.log(date);
    this.setState({
      appointmentDate: e.target.value,
    });
    this.getAppointmentTimesForClinic();
  };
  bookSlotChanged = (e) => {
    this.setState({
      selectedSlot: e.target.value,
    });
  };
  updateAppointment = () => {
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
      alert("Please select  clinic Id");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const apptTimeReq = {
      clinicId: this.state.selectedClinicId,
      appointmentDate: this.state.appointmentDate,
      appointmentTime: this.state.selectedSlot,
      patientId: user.mrn,
      apptId: this.state.changedApptId,
    };

    axios
      .put(config.backEndURL + "/updateAppointment", apptTimeReq)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            changeApptFlag: false,
          });
          const CustomToast = ({ closeToast }) => {
            return (
              <div style={{ textAlign: "center" }}>
                <h4>Successfully Updated Appointment!</h4>
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
  checkInAppt = (e) => {
    const apptId = Number(e.target.value);
    console.log(e.target.value);
    const appointments = this.state.appointments;
    let checkinflag = false;
    console.log(appointments);
    const apptIndex = appointments.findIndex(
      (appt) => appt.appointmentId === apptId
    );
    console.log(apptIndex);
    if (apptIndex > -1) {
      const apptdate = appointments[apptIndex].appointmentDate;
      const appttime = appointments[apptIndex].appointmentTime;
      var date_time = apptdate + "T" + appttime + "Z";

      var currDate = new Date();
      var duration = moment.duration(moment(date_time).diff(moment(currDate)));
      const durationcheck = duration.asHours();
      if (durationcheck <= 24) checkinflag = true;
      console.log(duration.asHours());
    }
    if (checkinflag) {
      axios
        .put(config.backEndURL + "/checkin?appointmentId=" + apptId)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const CustomToast = ({ closeToast }) => {
              return (
                <div style={{ textAlign: "center" }}>
                  <h4>Successfully Checked-in to Appointment!</h4>
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
    } else {
      const CustomToast = ({ closeToast }) => {
        return (
          <div style={{ textAlign: "center" }}>
            <h4>Check in can be done only 24 hours before</h4>
          </div>
        );
      };
      toast.warning(<CustomToast />, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
    }
  };

  ////////////////
  renderTableData() {
    // this.state.appointments.sort((a, b) =>
    //   a.appointmentDate.localeCompare(b.appointmentDate)
    // );
    if (this.state.appointments.length > 0) {
      return this.state.appointments.map((student, index) => {
        const {
          appointmentId,
          clinicId,
          vaccines,
          appointmentDate,
          appointmentTime,
          appointmentStatus,
        } = student;
        let buttonDisplay;
        if (
          appointmentStatus === "Check-In" &&
          moment(appointmentDate).isAfter(
            moment(new Date()).format("YYYY-MM-DD")
          )
        ) {
          buttonDisplay = null;
        } else if (
          appointmentStatus === "Confirmed" &&
          moment(appointmentDate).isAfter(
            moment(new Date()).format("YYYY-MM-DD")
          )
        ) {
          buttonDisplay = (
            <td>
              <td>
                <button
                  value={appointmentId}
                  className="btn btn-primary"
                  onClick={this.checkInAppt}
                >
                  Check-in
                </button>
              </td>
              <td>
                <button
                  value={appointmentId}
                  className="btn btn-warning"
                  onClick={this.changeAppt}
                >
                  Change
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    this.cancelAppointment(appointmentId, clinicId)
                  }
                  className="btn btn-danger"
                >
                  Cancel
                </button>
              </td>
            </td>
          );
        }
        return (
          <tr>
            <td>{appointmentId}</td>
            <td>{appointmentDate}</td>
            <td>{appointmentStatus}</td>
            <td>{vaccines.join(", ")}</td>
            <td>{appointmentTime}</td>
            {buttonDisplay}
            {/* {appointmentStatus === "Check-In" ? (
            <td>
              
              <td>
                <button
                  value={appointmentId}
                  className="btn btn-warning"
                  onClick={this.changeAppt}
                >
                  Change
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    this.cancelAppointment(appointmentId, clinicId)
                  }
                  className="btn btn-danger"
                >
                  Cancel
                </button>
              </td>
            </td>
          )
          :(
            <td></td>
          ) 
        } */}
          </tr>
        );
      });
    } else return <span>No Appointment to show</span>;
  }

  getPastAppointments = (e) => {
    //  e.preventDefault();
    let date = new Date();
    let date1 = moment(date).format("yyyy-MM-DD");
    let currentDate = date1;
    let currentTime = date.toISOString().split("T")[1].split(".")[0];
    console.log("date and time", currentDate, currentTime);
    const user = JSON.parse(localStorage.getItem("user"));
    const patientId = user.mrn;
    axios
      .get(config.backEndURL + "/getPastAppointments", {
        params: {
          currentDate,
          currentTime,
          patientId,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            appointments: response.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  closeChangeAppt = () => {
    this.setState({
      changeApptFlag: false,
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

    if (this.state.clinics !== null) {
      if (this.state.clinics.length > 0) {
        clinic = this.state.clinics.map((clinic, index) => {
          return <option value={clinic.id}>{clinic.name}</option>;
        });
      }
    }
    if (this.state.clinicAppt !== null) {
      if (this.state.clinicAppt.length > 0) {
        bookSlots = this.state.clinicAppt.map((appt, index) => {
          return <option value={appt}>{appt}</option>;
        });
      }
    }
    let changeApptModal;
    if (this.state.changeApptFlag) {
      changeApptModal = (
        <div className="makeAppt">
          <Modal
            open={this.state.changeApptFlag}
            onClose={this.closeChangeAppt}
          >
            <div className="content1">
              <div className="popupHeader">
                Change Appointment
                <ClearIcon
                  className="closePopup"
                  onClick={this.closeChangeAppt}
                />
              </div>
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
              <label>Select Date</label>
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

              <button
                type="button"
                style={{ marginTop: "5px" }}
                onClick={this.updateAppointment}
              >
                Update Appointment
              </button>
            </div>
          </Modal>
        </div>
      );
    }
    const user = Cookies.get("Role");
    if (!user) {
      window.location.replace("/");
    } else if (user === "Admin") {
      window.location.replace("/adminHome");
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
                <h2>View Appointments</h2>

                <button
                  style={{ width: "40%" }}
                  onClick={this.getPastAppointments}
                >
                  Past
                </button>

                <button
                  style={{ width: "40%" }}
                  onClick={this.getFutureAppointments}
                >
                  Future
                </button>
              </Row>
              <Row>
                <div>
                  <div>
                    <table className="table table-bordered">
                      <tbody>
                        <tr className="bg-dark text-white">
                          {this.renderTableHeader()}
                        </tr>
                        {this.renderTableData()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </div>
        {changeApptModal}
      </div>
    );
  }
}
