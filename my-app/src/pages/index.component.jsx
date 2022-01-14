import React from "react";
import { Link } from 'react-router-dom';
export default class Index extends React.Component {
    render() {
        return (
            <div>
                <h1>Book Keeper</h1>
                <nav style={{ borderBottom: 'solid 1px', paddingBottom: "1rem" }}>
                    <Link to="/invoices">Invoices</Link>|{" "}
                    <Link to="/expense">Expense</Link>
                </nav>
            </div>
        )
    }
}