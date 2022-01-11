import AppComponent from "./app.component";
import DashboardComponent from "./components/dashboard.component";
import AboutComponent from "./components/about.component";
import IndexComponent from "./components/index.component";
import MessageComponent from "./components/message.component";
const routeConfig = [
    {
        path: "/",
        component: AppComponent,
        indexRoute: {
            component: DashboardComponent
        },
        childRoutes: [
            {
                path: "about",
                component: AboutComponent
            },
            {
                path: "index",
                component: IndexComponent,
                childRoutes: [
                    { path: "/messages/:id", component: MessageComponent },
                    {
                        path: "messages/:id",
                        onEnter: (nextState, replaceState) => {
                            replaceState(null, '/messages/' + nextState.params.id);
                        }
                    }
                ]
            }
        ]
    }
];
export default routeConfig;