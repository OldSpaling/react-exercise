import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter, Router } from "react-router-dom";
import AppComponent from './components/app.component';
import './index.css';
import routeConfig from './router.config';

reactDom.render(
    <BrowserRouter >
        <AppComponent />
    </BrowserRouter>, document.getElementById('root'));