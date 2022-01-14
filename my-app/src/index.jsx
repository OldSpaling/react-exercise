import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import App from './app.component';
import Expense from './pages/expense';
import Invoice from './pages/invoice';
import Invoices from './pages/invoices';
import './index.css';
//The "*" has special meaning here. It will match only when no other routes do.
reactDom.render(
    <BrowserRouter >
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="expenses" element={<Expense />}></Route>
                <Route path="invoices" element={<Invoices />}>
                    <Route index element={
                        <main style={{ padding: "1rem" }}>
                            <h5>index route shares the path of the parent.</h5>
                            <p>
                                Index routes render in the parent routes outlet at the parent route's path. <br />
                                Index routes match when a parent route matches but none of the other children match.<br />
                                Index routes are the default child route for a parent route.<br />
                                Index routes render when the user hasn't clicked one of the items in a navigation list yet.
                            </p>
                            <p>Select an invoice</p>
                        </main>
                    }>
                       
                    </Route>
                    <Route path=":invoiceId" element={<Invoice/>}></Route>
                </Route>
                <Route path="*" element={
                    <main style={{ padding: "1rem" }}>there is nothing here!</main>
                }></Route>
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root'));