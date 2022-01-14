import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { getInvoices } from '../data';
import "./invoices.css";
import { withSearchParams } from "../hocs";
import QueryNavLink from '../components/query-nav-link';
class Invoices extends React.Component {
    constructor(props) {
        super(props);
        this.activeLinkByStyle = this.activeLinkByStyle.bind(this);
        this.activeLinkByClass = this.activeLinkByClass.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.search = this.search.bind(this);
    }
    activeLinkByStyle({ isActive }) {
        return {
            display: "block",
            margin: "1rem 0",
            color: isActive ? "red" : ""
        };
    }
    activeLinkByClass({ isActive }) {
        return isActive ? "red" : "blue";
    }
    handleSearchChange(event) {
        const filter = event.target.value;
        if (filter) {
            this.props.setSearchParams({ filter });
        } else {
            this.props.setSearchParams({});
        }
    }
    search(invoice) {
        let filter = this.props.searchParams.get("filter");
        if (!filter) return true;
        let name = invoice.name.toLowerCase();

        return name.startsWith(filter.toLowerCase());
    }
    render() {
        const invoices = getInvoices();
        return (
            <div style={{ display: "flex" }}>
                <nav style={{
                    borderRight: "solid 1px",
                    padding: "1rem"
                }}>
                    <input type="text"
                        value={this.props.searchParams.get("filter") || ""}
                        onChange={this.handleSearchChange}
                    />
                    {
                        invoices.filter(this.search).map(invoice => (
                            <QueryNavLink className={this.activeLinkByClass} to={`/invoices/${invoice.number}`} key={invoice.number}>
                                {invoice.name}
                            </QueryNavLink>
                        ))
                    }
                </nav>
                <Outlet />
            </div>
        );
    }
}
export default withSearchParams(Invoices);