import React from "react";
import { useState } from "react";
import { NavLink, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { getInvoices, InvoiceModel } from "../data";
import "./invoices.css";
type StateModel = {
    invoices: InvoiceModel[]
}
export default function Invoices() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [state, setState] = useState<StateModel>({ invoices: [] })
    const activeLinkByStyle=({ isActive }) =>{
        return {
            display: "block",
            margin: "1rem 0",
            color: isActive ? "red" : ""
        };
    }
    const activeLinkByClass = ({ isActive })=>{
        return isActive ? "red" : "blue";
    };
    const handleSearchChange = (event) => {
        const filter = event.target.value;
        if (filter) {
            setSearchParams({ filter });
        } else {
            setSearchParams({});
        }
    };
    const search = (invoice) => {
        let filter = searchParams.get("filter");
        if (!filter) return true;
        let name = invoice.name.toLowerCase();

        return name.startsWith(filter.toLowerCase());
    }
    React.useEffect(() => {
        const load = async () => {
            const invoices = await getInvoices();
            setState({ invoices });
        };
        load();
    })
    const location = useLocation();
    return (
        <div style={{ display: "flex" }}>
            <nav style={{
                borderRight: "solid 1px",
                padding: "1rem"
            }}>
                <input type="text"
                    value={searchParams.get("filter") || ""}
                    onChange={handleSearchChange}
                />
                {
                    state.invoices.filter(search).map(invoice => (
                        <NavLink
                            className={activeLinkByClass}
                            key={invoice.number}
                            to={`/invoices/${invoice.number}${location.search}`}>
                            {invoice.name}|
                        </NavLink>

                    ))
                }
            </nav>
            <Outlet />
        </div>
    );
}