import React, { Component } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import AdminHeader from './AdminHeader';
import Cookies from 'js-cookie'
import { Card } from 'react-bootstrap';
import Header from '../Header';

export default class addDisease extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        };
    }

    handleAddDisease = (e) => {
        e.preventDefault();
        console.log(this.state);
        axios.post('/admin/addDisease', this.state)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Successfully added disease details", { position: toast.POSITION.TOP_CENTER });
                    this.setState({
                        name: '',
                        description: ''
                    })
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Unable to add disease details", { position: toast.POSITION.TOP_CENTER });

            })
    }


    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    };

    descChangeHandler = (e) => {
        this.setState({
            description: e.target.value
        })
    };

    render() {
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
                    <h2 style={{ paddingLeft: 20 }}>Add Disease :</h2>
                    <div style={{ padding: 20 }}>
                        <form onSubmit={this.handleAddDisease}>
                            <label>Name</label>
                            <input type="text" value={this.state.name} onChange={this.nameChangeHandler} className="input-group mb-3" required />
                            <label>Description</label>
                            <input type="text" value={this.state.description} onChange={this.descChangeHandler} className="input-group mb-3" />
                            <button style={{ width: "100%", marginTop: 5 }} className="btn btn-primary btn-block" type="submit"> Add disease </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}