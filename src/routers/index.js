import Index from '../views/Index';
import About from '../views/About';
import React from "react";

const routers = [
    { path: '/', component: <Index/> },
    { path: '/about', component: <About/> },
]

export default routers;