import React, { Component } from 'react';
import { Link } from "react-router-dom";
// import icon from "../images/icon.png";

class About extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return <div>
            <div>
                ABOUT
            </div>
            <Link to="/">
                click me!!!
            </Link>
            {/*<img src={icon}/>*/}
        </div>
    }

}

export default About;