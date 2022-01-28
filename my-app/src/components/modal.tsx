import Dialog from "@reach/dialog";
import React from "react";
import { useNavigate } from "react-router";
import  "@reach/dialog/styles.css";
export function Model({ children }: { children: JSX.Element }) {
    const navigate = useNavigate();
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const onDismiss = () => navigate(-1);
    // const image=
    return (
        <Dialog
            aria-labelledby="label"
            onDismiss={onDismiss}
            initialFocusRef={buttonRef}
        >
            <div style={{
                display: "grid",
                justifyContent: "center",
                padding: "8px 8px"
            }}>
                {children}
                <button
                    style={{ display: "block" }}
                    ref={buttonRef}
                    onClick={onDismiss}
                >
                    Close
                </button>
            </div>
        </Dialog>
    );
}