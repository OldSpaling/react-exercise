import React from "react";
import { Link, Outlet, useRoutes } from "react-router-dom";
import Expense from './pages/expense';
import Invoice from './pages/invoice';
import Invoices from './pages/invoices';
import './index.css';
class Layout extends React.Component {
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
export default function App() {
    const routes = [{
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "expenses",
                element: <Expense />,
            },
            {
                path: "invoices",
                element: <Invoices />,
                children: [
                    {
                        index: true,
                        element: <main style={{ padding: "1rem" }}>
                            <h5>index route shares the path of the parent.</h5>
                            <p>
                                Index routes render in the parent routes outlet at the parent route's path. <br />
                                Index routes match when a parent route matches but none of the other children match.<br />
                                Index routes are the default child route for a parent route.<br />
                                Index routes render when the user hasn't clicked one of the items in a navigation list yet.
                            </p>
                            <p>Select an invoice</p>
                        </main>
                    },
                    {
                        path: ":invoiceId",
                        element: <Invoice />
                    }
                ]
            },
            {
                path: "*",
                element: <main style={{ padding: "1rem" }}>there is nothing here!</main>,
            },

        ]
    }];
    const routerEle = useRoutes(routes);
    return (
        <div>
            <h1>this a object router demo with layout</h1>
            {routerEle}
        </div>
    );
}