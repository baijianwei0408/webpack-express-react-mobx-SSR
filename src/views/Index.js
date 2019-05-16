import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import './index.css';
// import icon from '../images/icon.png';
import Title from '../components/Title';

// const icon = require('../images/icon.png');


@inject('testStore')
@observer
class Index extends Component {

    constructor(props) {
        super(props)

        console.log("process.env.NODE_ENV: " + process.env.NODE_ENV)

    }

    clickMe() {
        console.log('clickMe');
    }


    render() {
        let { testStore } = this.props
        // var icon = require('../images/icon.png');

        return <div className='index'>
            <Title/>
            <div className='font'>
                Main Content
            </div>

            <img src={require('../images/icon.png')} className='img'/>
            <Link to="/about">
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