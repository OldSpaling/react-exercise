import React from "react";
import { Link, Outlet } from "react-router-dom";
export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Book Keeper</h1>
                <nav style={{ borderBottom: 'solid 1px', paddingBottom: "1rem" }}>
                    <Link to="/invoices">Invoices</Link>|
                    <Link to="/expenses">Expense</Link>
                </nav>
                <main>
                    <Outlet></Outlet>
                </main>
            </div>
        )
    }
}