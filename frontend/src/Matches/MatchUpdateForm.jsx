import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";

const MatchUpdateForm = () => {
    

    const INITIAL_STATE = {
        eventLocation: "",
        eventType: "",
        team1: "",
        team2: "",
        team1Score: "",
        team2Score: ""
    };

    const { leagueId, matchId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const match = await LeagueOneApi.getMatch(leagueId, matchId);
                setFormData({
                    eventLocation: match.eventLocation,
                    eventType: match.eventType,
                    team1: match.team1,
                    team2: match.team2,
                    team1Score: match.team1Score,
                    team2Score: match.team2Score
                });
            } catch (error) {
                console.error("Error fetching match data:", error);
                setError("Failed to fetch match data");
            }
        };

        const fetchTeams = async () => {
            try {
                const league = await LeagueOneApi.getLeagueById(leagueId);
                if (league && league.teams) {
                    setTeams(league.teams);
                }
            } catch (error) {
                console.error("Error fetching teams:", error);
                setError("Failed to fetch teams");
            }
        };

        fetchMatchData();
        fetchTeams();
    }, [leagueId, matchId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (["team1Score", "team2Score"].includes(name)) {
            updatedValue = value === "" ? "" : parseInt(value, 10);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const matchData = {
            ...formData,
            team1: parseInt(formData.team1, 10),
            team2: parseInt(formData.team2, 10),
            team1Score: parseInt(formData.team1Score, 10),
            team2Score: parseInt(formData.team2Score, 10)
        };

        try {
            const updatedMatch = await LeagueOneApi.updateMatch(leagueId, matchId, matchData);
            navigate(`/leagues/${leagueId}/matches/${matchId}`);
        } catch (error) {
            console.error("Error updating match:", error);
            setError("Failed to update match");
        }
    };

    return (
        <div className="container">
            <form 
                className="form-container"
                onSubmit={handleSubmit}>
                <label htmlFor="eventType">Event Type:</label>
                <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Event Type</option>
                    <option value="Friendly">Friendly</option>
                    <option value="League">League</option>
                    <option value="Tournament">Tournament</option>
                    <option value="Final">Final</option>
                </select>

                <label htmlFor="eventLocation">Event Location:</label>
                <input
                    type="text"
                    id="eventLocation"
                    name="eventLocation"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="team1">Home Team:</label>
                <select
                    id="team1"
                    name="team1"
                    value={formData.team1}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="team2">Away Team:</label>
                <select
                    id="team2"
                    name="team2"
                    value={formData.team2}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>
                            {team.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="team1Score">Home Score:</label>
                <input
                    type="number"
                    id="team1Score"
                    name="team1Score"
                    value={formData.team1Score}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="team2Score">Away Score:</label>
                <input
                    type="number"
                    id="team2Score"
                    name="team2Score"
                    value={formData.team2Score}
                    onChange={handleChange}
                    required
                />

                {error && <p>{error}</p>}

                <button className="button" type="submit">Update Match</button>
            </form>
        </div>
    );
};

export default MatchUpdateForm;
