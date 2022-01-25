import { NavLink, NavLinkProps } from "react-router-dom";
import React from 'react';
import { withLocation } from '../hocs';

class QueryNavLink extends React.Component<NavLinkProps & React.RefAttributes<HTMLAnchorElement>> {
    render() {
        return (
            <NavLink  {...this.props}></NavLink>
        );
    }
}
export default withLocation(QueryNavLink);