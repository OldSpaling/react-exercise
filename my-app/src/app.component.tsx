import React from "react";
import { Link, Outlet, RouteObject, useLocation, useRoutes } from "react-router-dom";
import Expense from './pages/expense';
import Invoice from './pages/invoice';
// import Invoices from './pages/invoices';
import './index.css';
import { AuthProvider, AuthStatus, LoginPage, RequireAuth } from "./components/auth";
import Gallery from "./pages/gallery";
import { Model } from "./components/modal";
import ImageView from "./pages/image-view";
//lazy loading
const Invoices = React.lazy(() => import("./pages/invoices"));
function CommonLayout() {
    return (
        <nav style={{ borderBottom: 'solid 1px', paddingBottom: "1rem" }}>
            <Link to="/invoices">Invoices</Link>|
            <Link to="/expenses">Expense</Link>|
            <Link to="privacy">Privacy</Link>|
            <Link to="tos">Tos</Link>|
            <Link to="/signout">Sign Out</Link>|
            <Link to="/gallery">Gallery</Link>
        </nav>
    );
}
class Layout extends React.Component {
    render() {
        return (
            <div>
                <h1>Book Keeper</h1>
                <CommonLayout />
                <main>
                    <RequireAuth>
                        <Outlet></Outlet>
                    </RequireAuth>
                </main>
            </div>
        )
    }
}
function PageLayout() {
    return (
        <main style={{ border: "1px solid red" }}>
            <p>this is a page layout</p>
            <CommonLayout />
            <Outlet />
        </main>
    )
}
function Privacy() {
    return (
        <div style={{ border: "1px solid blue", margin: "1rem" }}>this is a privacy</div>
    );
}
function Tos() {
    return (
        <p style={{ border: "1px solid blue", margin: "1rem" }}>this is a tos page</p>
    );
}
export default function App() {
    let location = useLocation();
    let state = location.state as { backgroundLocation?: Location };
    const routes: RouteObject[] = [{
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "expenses",
                element: <Expense />,
            },
            {
                path: "invoices",
                element: (
                    <React.Suspense fallback={<>...</>}>
                        <Invoices />
                    </React.Suspense>
                ),
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
    }, {
        element: <PageLayout />,//模板页面 不配置路由 /privacy 和/tos都会自动匹配
        children: [
            {
                path: "signout",
                element: <AuthStatus />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "privacy",
                element: <Privacy />
            },
            {
                path: "tos",
                element: <Tos />
            },
            {
                path: "gallery",
                element: <Gallery />,
            }

        ]
    }
    ];
    if(state?.backgroundLocation){
        routes.push({
            path: "gallery/img/:id",
            element: <Model><ImageView /></Model>
        })
    }
    const routerEle = useRoutes(routes, state?.backgroundLocation || location);
    return (
        <div>
            <h1>this a object router demo with layout</h1>
            <AuthProvider>{routerEle}</AuthProvider>
        </div>
    );
}