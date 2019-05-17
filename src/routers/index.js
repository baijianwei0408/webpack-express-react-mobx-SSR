import Index from '../views/Index';
import About from '../views/About';
import React from "react";
import Other from "../views/other/Other";

const routers = [
    { path: '/', component: <Index/> },
    { path: '/about', component: <About/> },
    { path: '/other', component: <Other/> },
]

export default routers;