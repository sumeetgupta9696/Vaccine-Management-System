import { Component } from "react";
import styles from "../AdminPage/AdminHeader.module.css";
import Sidebar from "../AdminPage/Sidebar";

export default class PatientHeader extends Component {
  render() {
    return (
      <div>
        <Sidebar role={"Patient"} />
        <div className={styles.header}>
          <h2>VMS Patient</h2>
        </div>
      </div>
    );
  }
}
