import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const UserDetail = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext); // assuming setCurrentUser is available in context
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            let user = await LeagueOneApi.getUserByUsername(username);
            setUser(user);
        };

        getUser();
    }, [username]);

    const handleDelete = async () => {
        try {
            await LeagueOneApi.deleteUser(username);
            setCurrentUser(null);
            navigate('/');
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>{user.firstName} {user.lastName}</h2>
            <div className="details">
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{user.bio}</p>
            </div>

            {currentUser.id === user.id && (
                <div className="actions">
                    <Link className="button" to={`/users/${currentUser.username}/update`}>Update User</Link>
                    <button className="button-delete" onClick={handleDelete}>Delete User</button>
                </div>
            )}
        </div>
    );
};

export default UserDetail;
