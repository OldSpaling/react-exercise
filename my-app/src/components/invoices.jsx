import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { getInvoices } from '../data';
import "./invoices.css";
export default class Invoices extends React.Component {
    constructor(props) {
        super(props);
        this.activeLinkByStyle = this.activeLinkByStyle.bind(this);
        this.activeLinkByClass = this.activeLinkByClass.bind(this);
    }
    activeLinkByStyle({ isActive }) {
        return {
            display: "block",
            margin: "1rem 0",
            color: isActive ? "red" : ""
        };
    }
    activeLinkByClass({isActive}) {
        return isActive ? "red" : "blue";
    }
    render() {
        const invoices = getInvoices();
        return (
            <div style={{ display: "flex" }}>
                <nav style={{
                    borderRight: "solid 1px",
                    padding: "1rem"
                }}>
                    {
                        invoices.map(invoice => (
                            <NavLink className={this.activeLinkByClass} to={`/invoices/${invoice.number}`} key={invoice.number}>
                                {invoice.name}
                            </NavLink>
                        ))
                    }
                </nav>
                <Outlet />
            </div>
        );
    }
}