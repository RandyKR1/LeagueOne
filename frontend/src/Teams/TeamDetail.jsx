import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const TeamDetail = () => {
    const { currentUser } = useContext(UserContext);
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const [isPlayer, setIsPlayer] = useState(false); // Track if the current user is a player
    const navigate = useNavigate();
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [newAdminId, setNewAdminId] = useState("");

    useEffect(() => {
        const getTeam = async () => {
            try {
                let team = await LeagueOneApi.getTeamById(teamId);
                setTeam(team);

                // Check if the current user is a player of the team
                const player = team.players.find(player => player.id === currentUser.id);
                setIsPlayer(!!player);
            } catch (error) {
                console.error("Error fetching team:", error);
            }
        };

        getTeam();
    }, [teamId, currentUser.id]);

    const handleDelete = async () => {
        try {
            await LeagueOneApi.deleteTeam(teamId);
            navigate('/');
        } catch (error) {
            console.error("Error deleting team:", error);
        }
    };

    const handleLeave = async () => {
        try {
            await LeagueOneApi.leaveTeam(teamId);
            navigate("/");
        } catch (error) {
            console.error("Error leaving team:", error);
        }
    };

    const handleRemovePlayer = async (playerId) => {
        try {
            await LeagueOneApi.removePlayerFromTeam(teamId, playerId);
            // Optionally, refetch the team data or update state
            setTeam((prevTeam) => ({
                ...prevTeam,
                players: prevTeam.players.filter(player => player.id !== playerId)
            }));
        } catch (error) {
            console.error("Error removing player:", error);
        }
    };

    // Admin-specific leave logic
    const handleAdminLeaveClick = () => {
        setShowAdminModal(true);
    };

    const handleConfirmLeave = async () => {
        try {
            await LeagueOneApi.leaveTeam(teamId, newAdminId);  // Make sure your API accepts newAdminId
            setShowAdminModal(false);
            navigate("/");
        } catch (error) {
            console.error("Error leaving team as admin:", error);
        }
    };

    const handleCancel = () => {
        setShowAdminModal(false);
        setNewAdminId("");
    };

    if (!team) return <div>Loading...</div>;

    console.log("Team Details:", team);

    return (
        <div className="container">
            <h1>{team.name}</h1>
            <h2>Admin: <Link to={`/users/${team.admin.username}`}>{team.admin.firstName} {team.admin.lastName}</Link></h2>

            <p>Max Players: {team.maxPlayers}</p>
            <h2>Members:</h2>
            {team.players && team.players.length > 0 ? (
                <ul className="list">
                    {team.players.map(member => (
                        <li key={member.id}>
                            {member.firstName} {member.lastName}
                            {currentUser.isTeamAdmin && currentUser.id === team.admin.id && (
                                <button className="button-remove" onClick={() => handleRemovePlayer(member.id)}>
                                    Remove
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No members in this team.</p>
            )}

            <h2>Leagues Joined:</h2>
            {team.leagues && team.leagues.length > 0 ? (
                <ul className="list">
                    {team.leagues.map(league => (
                        <li key={league.id}>{league.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No leagues found</p>
            )}

            <div className="actions">
                <Link className="button" to={`/teams/${teamId}/join`}>Join Team</Link>

                {isPlayer && (
                    <>
                        {currentUser.id === team.admin.id ? (
                            <button className="button-delete" onClick={handleAdminLeaveClick}>
                                Leave Team
                            </button>
                        ) : (
                            <button className="button-delete" onClick={handleLeave}>
                                Leave Team
                            </button>
                        )}
                    </>
                )}

                {(currentUser.isTeamAdmin && currentUser.id === team.admin.id) && (
                    <>
                        <Link className="button" to={`/teams/${teamId}/update`}>Update Team</Link>
                        <button className="button-delete" onClick={handleDelete}>Delete Team</button>
                    </>
                )}
            </div>

            {showAdminModal && (
                <div className="modal-backdrop">
                    <div className="modal">
                        <h2>Select a New Team Admin</h2>
                        <select value={newAdminId} onChange={(e) => setNewAdminId(e.target.value)}>
                            <option value="">-- Select Member --</option>
                            {team.players
                                .filter(player => player.id !== currentUser.id)
                                .map(player => (
                                    <option key={player.id} value={player.id}>
                                        {player.firstName} {player.lastName}
                                    </option>
                                ))}
                        </select>

                        <div className="modal-actions">
                            <button onClick={handleConfirmLeave} disabled={!newAdminId}>
                                Confirm Leave
                            </button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamDetail;
