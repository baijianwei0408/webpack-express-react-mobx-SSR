import React, { Component } from 'react';
import BaseComponent from '../base/BaseComponent';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import './index.css';
// import icon from '../images/icon.png';
import Title from '../components/Title';

const requireImg = require('../utils/requireImg');
const icon = requireImg('../images/icon.png');


@inject('testStore')
@observer
class Index extends BaseComponent {

    constructor(props) {
        super(props)

        console.log("process.env.NODE_ENV: " + process.env.NODE_ENV)

    }

    clickMe() {
        console.log('clickMe');
    }


    render() {
        let { testStore } = this.props

        return <div className='index'>
            <Title/>
            <div className='font'>
                Main Content
            </div>

            <img src={icon} className='img'/>
            <Link to="/about">
                <button onClick={this.clickMe}>
                    Nav To About Page
                </button>
            </Link>
            <Link to="/other">
                <button onClick={this.clickMe}>
                    Nav To Other Page
                </button>
            </Link>
            <div>{testStore.number}</div>
            <button onClick={() => testStore.addNumber()}>
                add num
            </button>

        </div>
    }

}

export default Index;