import React from "react";
import PatientHeader from "./PatientHeader";
import Cookies from "js-cookie";
import { Row, Col } from "react-bootstrap";
import VaccinationData from "./VaccinationData";

class VaccinationHistory extends React.Component {
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
          <PatientHeader />
        </div>
        <div>
          <Row className="mt-5">
            <Col md={{ span: 7, offset: 1 }}>
              <Row>
                <h2>Vaccination History</h2>
              </Row>
              <Row>
                <VaccinationData />
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default VaccinationHistory;
