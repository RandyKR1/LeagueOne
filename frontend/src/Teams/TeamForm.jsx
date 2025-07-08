import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import Alert from "../Common/Alert";

const TeamForm = () => {
    const INITIAL_STATE = {
        name: "",
        password: "",
        maxPlayers: 20,
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === "maxPlayers") {
            updatedValue = parseInt(value, 10) || ""; // Ensure integer conversion, fallback to empty string if NaN
        }

        setFormData((f) => ({
            ...f,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = [];
        if (formData.password.length < 8) validationErrors.push("Password must be at least 8 characters long.");

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            let res = await LeagueOneApi.createTeam(formData);
            if (res && res.team && res.team.id) {
                navigate(`/teams/${res.team.id}`);
            } else {
                setErrors(["Failed to create team"]);
            }
        } catch (err) {
            setErrors([err.message || "Something went wrong"]);
        }
    };

    return (
        <div className="container">
            <h2>Team Creation</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="maxPlayers">Max Players:</label>
                <input
                    type="number"
                    id="maxPlayers"
                    name="maxPlayers"
                    value={formData.maxPlayers}
                    onChange={handleChange}
                />
                {errors.length > 0 && <Alert messages={errors} />}
                <button className="button" type="submit">Create Team</button>
            </form>
        </div>
    );
};

export default TeamForm;
