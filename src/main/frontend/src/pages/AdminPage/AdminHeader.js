import { Component } from "react";
import styles from "./AdminHeader.module.css";
import Sidebar from '../AdminPage/Sidebar'

export default class AdminHeader extends Component {

    render() {
        return (
            <div>
                <Sidebar role={"Admin"} />
                <div className={styles.header}>
                    <h2>Admin Home</h2>
                </div>
            </div>
        );
    }
}