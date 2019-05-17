import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import stores from './src/store'
import NotFound404 from './src/components/NotFound404'

import routers from "./src/routers";



class App extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return <Provider {...stores}>
            <BrowserRouter>
                <Switch>
                    {
                        routers.map((router,index) => {
                            // return <Route exact path={router.path} component={router.component}/>
                            return <Route exact path={router.path} render={() => router.component} key={'router-'+index}/>
                        })
                    }
                    <Route component={NotFound404}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    }

}

export default App;
