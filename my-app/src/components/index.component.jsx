import React from "react";
import { Link } from 'react-router-dom';
export default class Index extends React.Component {
    render() {
        return (
            <>
                <main>
                    <h2>Who are we?</h2>
                    <p>The feels like an existential question,don't you think?</p>
                </main>
                <nav>
                    <Link to="/about">About</Link>
                </nav>
            </>
        )
    }
}