import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeagueOneApi from "../api";

const LeagueList = () => {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                let res = await LeagueOneApi.getLeagues({});
                setLeagues(res);
            } catch (e) {
                console.error(e);
            }
        };
        fetchLeagues();
    }, []);

    console.log(leagues)
    return (
        <>
        <div className="container">
            <div className="header-list">
                <div className="header-list-display">
                    <p>Leagues</p> 
                </div>
                <div className="header-list-display">
                    <Link to={"/leagues/create"}>Create League</Link>
                </div>
            </div>
        <div className="list-container">
            <ul className="list">
                {leagues.length > 0 ? (
                    leagues.map((league) => (
                        <li key={league.id}>
                            <Link to={`/leagues/${league.id}`}>
                                <div className="list-display-container">
                                    <div className="list-display">
                                        <h3>{league.name}</h3>
                                        <p>{league.description}</p>
                                    </div>
                                    <div className="list-display">
                                    <p>Max Teams: {league.maxTeams}</p>
                                    <p>Admin: <Link to={`/users/${league.admin.username}`}>{league.admin.firstName} {" "} {league.admin.lastName}</Link></p>
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
        </>
    );
};

export default LeagueList;
