import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";

const TeamUpdateForm = () => {
    const INITIAL_STATE = {
        name: "",
        password: "",
        maxPlayers: 20,
    };

    const { teamId } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const fetchedTeam = await LeagueOneApi.getTeamById(teamId);
                setTeam(fetchedTeam);
                setFormData({
                    name: fetchedTeam.name,
                    password: "", // Leave password field blank for security reasons
                    maxPlayers: fetchedTeam.maxPlayers,
                });
            } catch (error) {
                console.error("Error fetching team:", error);
                setError("Failed to fetch team data");
            }
        };
        fetchTeam();
    }, [teamId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === "maxPlayers") {
            updatedValue = value === "" ? "" : parseInt(value, 10);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPassword = formData.password.trim() === "" ? team.password : formData.password;
        try {
            const updatedTeam = await LeagueOneApi.updateTeam(teamId, {
                ...formData,
                password: updatedPassword
            });
            navigate(`/teams/${teamId}`);
        } catch (error) {
            console.error("Error updating team:", error);
            setError("Failed to update team");
        }
    };

    if (!team) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <form 
                className="form-container"
                onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label htmlFor="maxPlayers">Max Players:</label>
                <input
                    type="number"
                    id="maxPlayers"
                    name="maxPlayers"
                    value={formData.maxPlayers}
                    onChange={handleChange}
                />
                {error && <p>{error}</p>}
                <button className="button" type="submit">Update Team</button>
            </form>
        </div>
    );
};

export default TeamUpdateForm;
