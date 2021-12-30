import React, { Component } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import AdminHeader from './AdminHeader';
import Cookies from 'js-cookie'
import { Card } from 'react-bootstrap';
import Header from '../Header';

export default class updateVaccine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patientname: '',
            vaccineid: '',
            vaccineDrop: [],
            vaccinestatus: [
                { name: "Partial ", description: "status"},
                { name: "Completed ", description: "status"},
            ],
            vaccineMap: new Map(),
            status:[],
            dosageNumber: '',
            dosageDate: ''
        };
    }

    componentDidMount = async () => {
        await axios
            .get('/admin/getAllVaccine')
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        vaccineDrop: response.data
                    })
                    console.log("Vaccine state :", this.state.vaccineDrop);
                }
            })
            .catch((err) => {
                console.log(err);
            })
         this.state.vaccinestatus.map((item) => {
             const arrEle = item;
             arrEle['checked'] = false;
         }, console.log(this.state.vaccinestatus));
    }

    handleUpdateVaccine = (e) => {
        e.preventDefault();
        axios.post('/admin/updateVaccine', this.state)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Successfully updates vaccine details", { position: toast.POSITION.TOP_CENTER });
                    this.setState({
                        name: '',
                        desc: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Unable to updated vaccine details", { position: toast.POSITION.TOP_CENTER });

            })
    }


    patientnameChangeHandler = (e) => {
        this.setState({
            patientname: e.target.value
        })
    };

    vaccineidChangeHandler = (e) => {
        this.setState({
            vaccineid: e.target.value
        })
    };

    dosageNumberChangeHandler = (e) => {
        this.setState({
            dosageNumber: e.target.value
        })
    };

    dosageDateChangeHandler = (e) => {
        this.setState({
            dosageDate: e.target.value
        })
    };
    
    handleVaccineStatusCheckbox = (e) => {
        console.log(e);
        console.log(e.target.value);
        console.log(e.target.checked);
        const item = e.target.value;
        const isChecked = e.target.checked;
        this.setState(
            (prevState) => ({
                vaccineMap: prevState.vaccineMap.set(item, isChecked),
            }),
            function () {
                   console.log(this.state.vaccineMap);
                  const map1 = new Map(
                    [...this.state.vaccineMap].filter(([k, v]) => v === true)
                  );
                  this.setState({
                    status: Array.from(map1.keys()),
                  });
            })
    }

    render() {
        console.log(this.state.diseases)
        // const user = Cookies.get('Role');
        // if (!user) {
        //     window.location.replace('/')
        // }
        // else if (user === "Patient") {
        //     window.location.replace('/patientHome')
        // }
        return (
            <div>
                <Header />
                <div style={{ paddingLeft: "30%", paddingTop: 50, width: "70%" }}>
                    <h3 style={{ paddingLeft: 20 }}>Update vaccine status:</h3>
                    <div style={{ padding: 20 }}>
                        <form onSubmit={this.handleUpdateVaccine}>
                            <label>Patient Name</label>
                            <input type="text" value={this.state.patientname} onChange={this.patientnameChangeHandler} className="input-group mb-3" required />
                            <label>Vaccine Name :</label>
                            <br/>
                            {this.state.vaccineDrop.map((item) => (
                                <label>
                                    <div
                                        id="edit1"
                                        type="dropdown"
                                        class="dropdown"
                                        value={item.name}
                                        checked={this.state.vaccineDrop.includes(item.name) ? true : false}
                                        onChange={this.handleVaccineStatusCheckbox}
                                        required min="1"
                                        //disabled
                                    >
                                    {item.name}
                                    </div>
                                </label>
                            ))}
                            <br/>
                            <label>Vaccine Status: </label><br/>
                            {this.state.vaccinestatus.map((item) => (
                                <label>
                                    <input
                                        id="edit1"
                                        name="status"
                                        type="radio"
                                        value={item.name}
                                        checked={this.state.status.includes(item.name) ? true : false}
                                        onChange={this.handleVaccineStatusCheckbox}
                                        required limit="1"
                                        //disabled
                                    />
                                    {item.name}
                                </label>
                            ))}
                            <br/>
                            <label style={{marginTop:5}}>Dosage Number</label>
                            <input name="dosageNumber" type="number" value={this.state.dosageNumber} onChange={this.dosageNumberChangeHandler} className="input-group mb-3" required min="1" />
                            <label>Dosage Date</label>
                            <input name="dosageDate" type="date" value={this.state.dosageDate} onChange={this.dosageDateChangeHandler} className="input-group mb-3"/>
                            <label>Due Date</label>
                            <input name="Duration" type="date" value={this.state.duration} onChange={this.durationHandler} className="input-group mb-3" required min="0" />
                            <button style={{ width: "100%", marginTop: 5 }} className="btn btn-primary btn-block" type="submit"> Update Vaccine </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}