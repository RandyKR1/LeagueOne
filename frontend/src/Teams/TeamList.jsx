import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeagueOneApi from "../api";

const TeamList = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                let res = await LeagueOneApi.getTeams({});
                setTeams(res);
            } catch (e) {
                console.error(e);
            }
        };

        fetchTeams();
    }, []);

    console.log(teams);

    return (
        <>
        <div className="container">
            <div className="header-list">
                <div className="header-list-display">
                    <p>Teams</p> 
                </div>
                <div className="header-list-display">
                    <Link to={"/teams/create"}>Create Team</Link>
                </div>
            </div>
            <div className="list-container">
                <ul className="list">
                    {teams.length > 0 ? (
                        teams.map((team) => (
                            <li key={team.id}>
                                <Link to={`/teams/${team.id}`}>
                                    <div className="list-display-container">
                                        <div className="list-display">
                                            <h3>{team.name}</h3>
                                        </div>
                                        <div className="list-display">
                                            <p>Max Players: {team.maxPlayers}</p>
                                            {team.admin ? (
                                                <p>Admin: <Link to={`/users/${team.admin.username}`}>{team.admin.firstName} {" "} {team.admin.lastName}</Link></p>
                                            ) : (
                                                <p>No admin assigned</p>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No teams found.</p>
                    )}
                </ul>
            </div>
        </div>
        </>
    );
};

export default TeamList;
