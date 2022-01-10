import React from "react";
import {  Route, Routes } from 'react-router-dom'
import Index from './index.component';
import About from "./about.component";
export default class AppComponent extends React.Component {
    render() {
        return (
            <div className="App">
                <h1>Welcome to react router!</h1>
                <Routes>
                    <Route path="/" element={<Index />}></Route>
                    <Route path="about" element={<About/>}></Route>
                </Routes>
            </div>
        )
    }
}