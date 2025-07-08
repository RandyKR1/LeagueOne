import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeagueOneApi from "../api";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let res = await LeagueOneApi.getUsers({});
                setUsers(res);
            } catch (e) {
                console.error(e);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="container">
        <h1>Users</h1>
        <div className="list-container">
            <ul className="list">
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.id}>
                            <Link to={`/users/${user.username}`}>
                                <div className="list-display-container">
                                    <div className="list-display">
                                        <h3>{user.firstName} {user.lastName}</h3>
                                    </div>
                                    <div className="list-display">
                                    <p>{user.bio}</p>
                                    </div>
                                </div>
                            </Link>
                            
                        </li>
                    ))
                ) : (
                    <p>No leagues found.</p>
                )}
            </ul>
        </div>
        </div>
    );
};

export default UserList;
