import React, { Component } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
// import AdminHeader from './AdminHeader';
// import Cookies from 'js-cookie'
// import { Card } from 'react-bootstrap';
import Header from '../Header';

export default class addVaccine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            manufacturer: '',
            //diseasesCheckboxes: [],
            diseasesCheckboxes: [
                // { name: "Measles", description: "disease" },
                // { name: "Malaria", description: "disease" }
            ],
            diseaseMap: new Map(),
            diseases: [],
            numberOfShots: '',
            shotInternalVal: '',
            duration: ''
        };
    }

    componentDidMount = async () => {
        await axios
            .get('/admin/getAllDiseases')
            .then((response) => {
                if (response.status === 200) {
                    // console.log("disease" + response)
                    this.setState({
                        diseasesCheckboxes: response.data
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
        this.state.diseasesCheckboxes.map((item) => {
            const arrEle = item;
            arrEle['checked'] = false;
        }, console.log(this.state.diseasesCheckboxes));
    }

    handleAddVaccine = (e) => {
        e.preventDefault();
        console.log(this.state)
        axios.post('/admin/addVaccine', this.state)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Successfully added vaccine details", { position: toast.POSITION.TOP_CENTER });
                    this.setState({
                        name: '',
                        manufacturer: '',
                        numberOfShots: '',
                        shotInternalVal: '',
                        duration: '',
                        diseases: ''

                    })
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Unable to add vaccine details", { position: toast.POSITION.TOP_CENTER });

            })
    }


    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    };

    manufacturerChangeHandler = (e) => {
        this.setState({
            manufacturer: e.target.value
        })
    };

    noOfShotsChangeHandler = (e) => {
        this.setState({
            numberOfShots: e.target.value
        })
    };

    shotInternalValChangeHandler = (e) => {
        this.setState({
            shotInternalVal: e.target.value
        })
    };

    durationHandler = (e) => {
        this.setState({
            duration: e.target.value
        })
    }

    handleDiseaseCheckbox = (e) => {
        console.log(e);
        console.log(e.target.value);
        console.log(e.target.checked);
        const item = e.target.value;
        const isChecked = e.target.checked;
        this.setState(
            (prevState) => ({
                diseaseMap: prevState.diseaseMap.set(item, isChecked),
            }),
            function () {
                console.log(this.state.diseaseMap);
                const map1 = new Map(
                    [...this.state.diseaseMap].filter(([k, v]) => v === true)
                );
                this.setState({
                    diseases: Array.from(map1.keys()),
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
                    <h3 style={{ paddingLeft: 20 }}>Add vaccine :</h3>
                    <div style={{ padding: 20 }}>
                        <form onSubmit={this.handleAddVaccine}>
                            <label>Name</label>
                            <input type="text" value={this.state.name} onChange={this.nameChangeHandler} className="input-group mb-3" required />
                            <label>Manufacturer</label>
                            <input type="text" value={this.state.manufacturer} onChange={this.manufacturerChangeHandler} className="input-group mb-3" required minLength="3" />
                            <label>Diseases: </label><br />
                            {this.state.diseasesCheckboxes.map((item) => (
                                <label>
                                    <input
                                        id="edit1"
                                        type="checkbox"
                                        value={item.name}
                                        checked={this.state.diseases.includes(item.name) ? true : false}
                                        onChange={this.handleDiseaseCheckbox}
                                    //disabled
                                    />
                                    {item.name}
                                </label>
                            ))}
                            <br />
                            <label style={{ marginTop: 5 }}>NumberOfShots</label>
                            <input name="NumberOfShots" type="number" value={this.state.numberOfShots} onChange={this.noOfShotsChangeHandler} className="input-group mb-3" required min="1" />
                            <label>ShotInternalVal</label>
                            <input name="ShotInternalVal" type="number" value={this.state.shotInternalVal} onChange={this.shotInternalValChangeHandler} className="input-group mb-3" />
                            <label>Duration(*Enter 0 for Lifetime)</label>
                            <input name="Duration" type="number" value={this.state.duration} onChange={this.durationHandler} className="input-group mb-3" required min="0" />
                            <button style={{ width: "100%", marginTop: 5 }} className="btn btn-primary btn-block" type="submit"> Add Vaccine </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}