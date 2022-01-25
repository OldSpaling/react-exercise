import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { fakeAuthProvider } from "../services/auth";

export interface AuthContextType {
    user: any,
    signin: (user: string, callback: VoidFunction) => void;
    signout: (callback: VoidFunction) => void;
}
//null+'!' 断言不为空
let AuthContext = React.createContext<AuthContextType>(null!);
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<any>(null);
    const signin = (newUser: string, callback: VoidFunction) => {
        return fakeAuthProvider.signin(() => {
            setUser(newUser);
            callback();
        });
    }
    const signout = (callback: VoidFunction) => {
        return fakeAuthProvider.signout(() => {
            setUser(null);
            callback();
        })
    }
    const value = { user, signin, signout };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() {
    return React.useContext(AuthContext);
}
export function AuthStatus() {
    const auth = useAuth();
    const navigate = useNavigate();
    if (!auth.user) {
        return <p>You are not logged in.</p>
    }
    return (
        <p>
            WelCom {auth.user}!{" "}
            <button onClick={() => {
                auth.signout(() => {
                    navigate("/");
                })
            }}>Sign out</button>
        </p>
    );
}
export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = useAuth();
    const location = useLocation();
    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }
    return children;
}
export function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const preLocation = location.state as { from: Location };
    const from = preLocation?.from.pathname || "/";
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const userName = formData.get("userName") as string;
        auth.signin(userName, () => {
            // Send them back to the page they tried to visit when they were
            // redirected to the login page. Use { replace: true } so we don't create
            // another entry in the history stack for the login page.  This means that
            // when they get to the protected page and click the back button, they
            // won't end up back on the login page, which is also really nice for the
            // user experience.
            navigate(from, { replace: true });
        });
      
    };
    return (
        <div>
            <p>You must log in to view the page at {from}</p>
            <form onSubmit={handleSubmit}>
                <label>UserName:<input name="userName" type="text" /></label>{" "}
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}