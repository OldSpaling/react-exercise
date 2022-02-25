import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { selectAllUsers } from "./user-slice";
export const UserList=()=>{
    const users=useAppSelector(selectAllUsers);
    const renderedUsers=users.map(user=>(
        <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>
    ));
    return (
        <section>
            <h2>Users</h2>
            <ul>{renderedUsers}</ul>
        </section>
    );
}