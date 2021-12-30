import "./App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/LoginPage/Login";
import Signup from "./pages/SignupPage/Signup";
import Disease from "./pages/AdminPage/Disease";
import Vaccine from "./pages/AdminPage/Vaccine";
import Clinic from "./pages/AdminPage/Clinic";
import AdminHome from "./pages/AdminPage/AdminHome";
import PatientHome from "./pages/PatientPage/PatientHome";
import UpdateVaccine from "./pages/AdminPage/UpdateVaccine";
import SearchPatient from "./pages/AdminPage/SearchPatient";
import VaccinationHistory from "./pages/PatientPage/VaccinationHistory";
import ViewAppointments from "./pages/PatientPage/ViewAppointments";
import MakeAppointment from "./pages/PatientPage/MakeAppointment";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Routing() {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/adminHome" component={AdminHome} />
      <Route path="/addDisease" component={Disease} />
      <Route path="/addVaccine" component={Vaccine} />
      <Route path="/addClinic" component={Clinic} />
      <Route path="/patientHome" component={PatientHome} />
      <Route path="/updateVaccine" component={UpdateVaccine} />
      <Route path="/searchpatient" component={SearchPatient} />
      <Route path="/vaccinationHistory" component={VaccinationHistory} />
      <Route path="/viewAppointments" component={ViewAppointments} />
      <Route path="/makeAppointment" component={MakeAppointment} />
    </Switch>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
}

export default App;
