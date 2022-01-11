import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import App from './app.component';
import Expense from './components/expense';
import Invoice from './components/invoice';
import Invoices from './components/invoices';
import './index.css';
//The "*" has special meaning here. It will match only when no other routes do.
reactDom.render(
    <BrowserRouter >
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="expenses" element={<Expense />}></Route>
                <Route path="invoices" element={<Invoices />}>
                    <Route path=":invoiceId" element={<Invoice/>}></Route>
                </Route>
                <Route path="*" element={
                    <main style={{ padding: "1rem" }}>there is nothing here!</main>
                }></Route>
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root'));