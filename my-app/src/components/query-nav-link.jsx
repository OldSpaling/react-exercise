import { NavLink } from "react-router-dom";
import React from 'react';
import { withLocation } from '../hocs';

class QueryNavLink extends React.Component{
    render() {
        return (
            <NavLink {...this.props}></NavLink>
        );
    }
}
export default withLocation(QueryNavLink);