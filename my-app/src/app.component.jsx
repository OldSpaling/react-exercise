import React from "react";
import { Link } from "react-router-dom";
export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Book Keeper</h1>
                <nav style={{ borderBottom: 'solid 1px', paddingBottom: "1rem" }}>
                    <Link to="/invoicess">Invoices</Link>|
                    <Link to="/expenses">Expense</Link>
                </nav>
            </div>
        )
    }
}