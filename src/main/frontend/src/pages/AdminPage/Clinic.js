import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Header from '../Header';
import { Card } from 'react-bootstrap';

export default class Clinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            streetNo: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
            businessStartTime: "",
            businessEndTime: "",
            numberOfPhysicians: ''
        };
    }

    handleAddClinic = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.post('/admin/addClinic', this.state)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Successfully added clinic details", { position: toast.POSITION.TOP_CENTER });
                    this.setState({
                        name: '',
                        streetNo: '',
                        city: '',
                        state: '',
                        country: '',
                        zipCode: '',
                        businessStartTime: "",
                        businessEndTime: "",
                        numberOfPhysicians: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Unable to add clinic details", { position: toast.POSITION.TOP_CENTER });

            })
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        });
    }
    streetChangeHandler = (e) => {
        this.setState({
            streetNo: e.target.value,
        });
    };

    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value,
        });
    };

    stateChangeHandler = (e) => {
        this.setState({
            state: e,
        });
    };

    countryChangeHandler = (e) => {
        this.setState({
            country: e,
        });
    };

    zipChangeHandler = (e) => {
        this.setState({
            zipCode: e.target.value,
        });
    };

    handleBusinessStart = (e) => {
        this.setState({
            businessStartTime: ((e.target.value)+":00")
        });
        console.log("handle start time :", this.state.businessStartTime)
    }

    handleBusinessEnd = (e) => {
        this.setState({
            businessEndTime: ((e.target.value)+":00")
        });
        console.log("handle end time :", this.state.businessEndTime)
    }

    noOfPhysiciansChangeHandler = (e) => {
        this.setState({
            numberOfPhysicians: e.target.value
        })
    }

    render() {
        console.log(this.state.businessStartTime, this.state.businessEndTime);
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
                    <h2 style={{ paddingLeft: 20 }}>Add Clinic :</h2>
                    <div style={{ padding: 20 }}>
                        <form onSubmit={this.handleAddClinic}>
                            <input type="text"
                                value={this.state.name}
                                placeholder="Please enter Clinic Name"
                                onChange={this.nameChangeHandler}
                                className="input-group mb-3"
                                required />
                            <input
                                onChange={this.streetChangeHandler}
                                type="text"
                                name="streetNo"
                                value={this.state.streetNo}
                                placeholder="Please enter Clinic Street number"
                                className="input-group mb-3"
                            />
                            <input
                                onChange={this.cityChangeHandler}
                                type="text"
                                value={this.state.city}
                                name="city"
                                placeholder="Please enter Clinic City"
                                className="input-group mb-3"
                                required
                            />
                            <CountryDropdown
                                className="input-group mb-3"
                                value={this.state.country}
                                onChange={(val) => this.countryChangeHandler(val)}
                                defaultOptionLabel="select country"                                
                                required />
                            <RegionDropdown
                                className="input-group mb-3"
                                country={this.state.country}
                                value={this.state.state}
                                defaultOptionLabel="select state"    
                                onChange={(val) => this.stateChangeHandler(val)}
                                required />
                            <input
                                onChange={this.zipChangeHandler}
                                type="text"
                                name="zipCode"
                                value={this.state.zipCode}
                                pattern="[0-9]{5}"
                                placeholder="Zip code"
                                className="input-group mb-3"
                                required
                            />
                            <input name="NumberOfPhysicians"
                                type="number"
                                value={this.state.numberOfPhysicians}
                                onChange={this.noOfPhysiciansChangeHandler}
                                placeholder="Number of Physicians"
                                className="input-group mb-3"
                                min="1"
                                style={{marginTop:10}}
                                required/>
                            <label>Business Hours : </label>
                            <input id="businessStart"
                                type="time"
                                name="businessStartTime"
                                value={this.state.businessStartTime}
                                onChange={this.handleBusinessStart} />
                            <label>AM</label>
                            <input id="businessEnd"
                                type="time"
                                name="businessEndTime"
                                value={this.state.businessEndTime}
                                onChange={this.handleBusinessEnd} />
                            <label>PM</label>
                            <label style={{marginTop:10}}/>
                            <button style={{ width: "100%", marginTop: 10 }} className="btn btn-primary btn-block" type="submit"> Add Clinic </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
