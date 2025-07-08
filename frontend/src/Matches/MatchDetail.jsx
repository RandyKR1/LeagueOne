import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const MatchDetail = () => {
    const { leagueId, matchId } = useParams();
    const [match, setMatch] = useState(null);
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const match = await LeagueOneApi.getMatch(leagueId, matchId);
                setMatch(match);
            } catch (error) {
                console.error("Error fetching match:", error);
            }
        };

        fetchMatch();
    }, [leagueId, matchId]);

    const handleDelete = async () => {
        try {
            await LeagueOneApi.deleteMatch(leagueId, matchId);
            navigate(`/leagues/${leagueId}`);
        } catch (error) {
            console.error("Error deleting match:", error);
        }
    };

    if (!match) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="header-match">
                <div className="header-match-display">
                    <p>Match Detail</p> 
                </div>
            <div className="header-match-display">
                <Link to={`/leagues/${leagueId}`}>Back to League Details</Link>
            </div>
        </div>
            <div className="container-match">
                <p>Location: {match.eventLocation}</p>
            </div>
            <div className="result-container">
                <h2>Event Results</h2>
                <div className="result-container-display">
                <p>{match.homeTeam.name}: {match.team1Score}</p>
                </div>
                <div className="result-container-display">
                <p>{match.awayTeam.name}: {match.team2Score}</p>
                </div>
            </div>
        

            {(currentUser.isLeagueAdmin && currentUser.id === match.league.adminId) && (
                <div className="actions">
                    <Link className="button" to={`/leagues/${leagueId}/matches/${matchId}/update`}>Update</Link>
                    <Link className="button" to={`/leagues/${leagueId}/matches/create`}>Create A Match</Link>
                    <button className="button-delete" onClick={handleDelete}>Delete Match</button>
                </div>
            )}
        </div>
    );
};

export default MatchDetail;
