import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";
import LeagueStandings from "./LeagueStandings" 

const LeagueDetail = () => {
    const { currentUser } = useContext(UserContext);
    const { id } = useParams();
    const [league, setLeague] = useState(null);
    const [selectedTeamId, setSelectedTeamId] = useState(null); // For handling team removal
    const navigate = useNavigate();

    useEffect(() => {
        const getLeague = async () => {
            try {
                let league = await LeagueOneApi.getLeagueById(id);
                setLeague(league);
            } catch (error) {
                console.error("Error fetching league:", error);
            }
        };

        getLeague();
    }, [id]);

    
    const handleDelete = async () => {
        try {
            await LeagueOneApi.deleteLeague(id);
            navigate(`/users/${currentUser.username}`);
        } catch (error) {
            console.error("Error deleting league:", error);
        }
    };

    const handleLeave = async () => {
        try {
            console.log("Current User Administered Teams:", JSON.stringify(currentUser.administeredTeams, null, 2));
            console.log("League Teams:", JSON.stringify(league.teams, null, 2));
    
            // Find the team ID in the league that matches the administered team ID
            const teamInLeague = league.teams.find(leagueTeam =>
                currentUser.administeredTeams.some(adminTeam => adminTeam.id === leagueTeam.id)
            );
    
            if (teamInLeague) {
                // Extract the team ID from the `TeamLeagues` object
                const teamId = teamInLeague.TeamLeagues ? teamInLeague.TeamLeagues.teamId : teamInLeague.id;
    
                // Make API call to leave the league with the found team ID
                await LeagueOneApi.leaveLeague(id, { teamId: teamId });
                navigate(`/`); // Navigate to home page
            } else {
                console.error("No administered team in the league to leave");
            }
        } catch (error) {
            console.error("Error leaving league:", error);
        }
    };
    

    const handleRemove = async (teamLeaguesId) => {
        try {
            await LeagueOneApi.removeTeamFromLeague(league.id, teamLeaguesId);
    
            // Log before updating state
            console.log("Removing team with TeamLeagues ID:", teamLeaguesId);
            console.log("Current teams in league before update:", league.teams);
    
            // Update the league state to remove the team
            setLeague((prevLeague) => {
                const updatedTeams = prevLeague.teams.filter(team => team.TeamLeagues.id !== teamLeaguesId);
    
                // Log after updating state
                console.log("Updated teams in league:", updatedTeams);
    
                return {
                    ...prevLeague,
                    teams: updatedTeams
                };
            });
    
            setSelectedTeamId(null); // Clear the selected team
        } catch (error) {
            console.error("Error removing team from league:", error);
        }
    };
    
    


    if (!league) return <div>Loading...</div>;

    console.log("League:", league)
    console.log("League Teams:", JSON.stringify(league.teams, null, 2));

    return (
        <div className="container">
            <h1>{league.name}</h1>
            <p>Competition: {league.competition}</p>
            <h2>Admin: <Link to={`/users/${league.admin.username}`}>{league.admin.firstName} {league.admin.lastName}</Link></h2>
            <h2>Teams:</h2>
            {league.teams && league.teams.length > 0 ? (
                <ul className="list">
                    {league.teams.map(team => (
                        <li key={team.id}>
                            {team.name}
                        {currentUser.isLeagueAdmin && currentUser.id === league.admin.id && (
                            <button className="button-remove" onClick={() => handleRemove(team.TeamLeagues.id)}>Remove Team</button>
                        )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No teams in this league.</p>
            )}

            <LeagueStandings />

            <div className="actions">
                <Link className="button" to={`/leagues/${id}/matches`}>View Matches</Link>
                <Link className="button" to={`/leagues/${id}/join`}>Join League</Link>
                {(currentUser.isLeagueAdmin && currentUser.id === league.admin.id) && (
                    <>
                        <Link className="button" to={`/leagues/${id}/update`}>Update League</Link>
                        <button className="button-delete" onClick={handleDelete}>Delete League</button>
                    </>
                )}
                {currentUser.isTeamAdmin && (
                    <button className="button-delete" onClick={handleLeave}>Leave League</button>
                )}
            </div>
        </div>
    );
};

export default LeagueDetail;
