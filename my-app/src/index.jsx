import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import App from './app.component';
import Expense from './components/expense';
import Invoices from './components/invoices';
import './index.css';

reactDom.render(
    <BrowserRouter >
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="expenses" element={<Expense />}></Route>
                <Route path="invoices" element={<Invoices />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root'));