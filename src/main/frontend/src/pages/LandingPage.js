import React, { Component } from 'react'
import './LandingPage.css'
import Header from "./Header";

export default class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

    login = (e) => {
        e.preventDefault();
        window.location.replace('/login')
    }

    render() {
        return (
        <div className="landing" style={{backgroundImage:"url(/image.jpg)"}}>
          <Header/>
        </div>
        );
      }
}