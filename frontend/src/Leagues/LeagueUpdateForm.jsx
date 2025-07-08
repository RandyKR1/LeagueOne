import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";

const LeagueUpdateForm = () => {
    const INITIAL_STATE = {
        name: "",
        description: "",
        maxTeams: "",
        password: "",
        competition: "",
        firstPlacePoints: "",
        secondPlacePoints: "",
        drawPoints: ""
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [league, setLeague] = useState(null);
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeague = async () => {
            try {
                const fetchedLeague = await LeagueOneApi.getLeagueById(id);
                setLeague(fetchedLeague);
                setFormData({
                    name: fetchedLeague.name,
                    description: fetchedLeague.description || "",
                    maxTeams: fetchedLeague.maxTeams,
                    password: "", // Leave password field blank for security reasons
                    competition: fetchedLeague.competition,
                    firstPlacePoints: fetchedLeague.firstPlacePoints,
                    secondPlacePoints: fetchedLeague.secondPlacePoints,
                    drawPoints: fetchedLeague.drawPoints
                });
            } catch (error) {
                console.error("Error fetching league:", error);
                setError("Failed to fetch league data");
            }
        };
        fetchLeague();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        // Convert specific fields to integers, allowing 0 as a valid value
        if (["maxTeams", "firstPlacePoints", "secondPlacePoints", "drawPoints"].includes(name)) {
            updatedValue = value === "" ? "" : parseInt(value, 10);
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPassword = formData.password.trim() === "" ? league.password : formData.password;
        try {
            const updatedLeague = await LeagueOneApi.updateLeague(id, {
                ...formData,
                password: updatedPassword
            });
            navigate(`/leagues/${id}`);
        } catch (error) {
            console.error("Error updating league:", error);
            setError("Failed to update league");
        }
    };

    if (!league) {
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
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <label htmlFor="maxTeams">Max Teams:</label>
                <input
                    type="number"
                    id="maxTeams"
                    name="maxTeams"
                    value={formData.maxTeams}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="competition">Competition:</label>
                <select
                    id="competition"
                    name="competition"
                    value={formData.competition}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Competition</option>
                    <option value="Soccer">Soccer</option>
                    <option value="Football">Football</option>
                    <option value="Hockey">Hockey</option>
                    <option value="Basketball">Basketball</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Golf">Golf</option>
                    <option value="Baseball">Baseball</option>
                    <option value="Other">Other</option>
                </select>

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label htmlFor="firstPlacePoints">First Place Points:</label>
                <input
                    type="number"
                    id="firstPlacePoints"
                    name="firstPlacePoints"
                    value={formData.firstPlacePoints}
                    onChange={handleChange}
                />

                <label htmlFor="secondPlacePoints">Second Place Points:</label>
                <input
                    type="number"
                    id="secondPlacePoints"
                    name="secondPlacePoints"
                    value={formData.secondPlacePoints}
                    onChange={handleChange}
                />

                <label htmlFor="drawPoints">Draw Points:</label>
                <input
                    type="number"
                    id="drawPoints"
                    name="drawPoints"
                    value={formData.drawPoints}
                    onChange={handleChange}
                />

                {error && <p>{error}</p>}

                <button className="button" type="submit">Update League</button>
            </form>
        </div>
    );
};

export default LeagueUpdateForm;
