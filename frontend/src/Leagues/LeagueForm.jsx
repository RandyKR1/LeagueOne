import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import Alert from "../Common/Alert";

const LeagueForm = () => {
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

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (["maxTeams", "firstPlacePoints", "secondPlacePoints", "drawPoints"].includes(name)) {
            updatedValue = value === "" ? "" : parseInt(value, 10);
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
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
            let res = await LeagueOneApi.createLeague(formData);
            if (res && res.id) {
                navigate(`/leagues`);
            } else {
                setErrors(["Failed to create league"]);
            }
        } catch (err) {
            setErrors([err.message || "Something went wrong"]);
        }
    };

    return (
        <div className="container">
            <h2>League Creation</h2>
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
                <input
                    type="text"
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

                {errors.length > 0 && <Alert messages={errors} />}

                <button className="button" type="submit">Create League</button>
            </form>
        </div>
    );
};

export default LeagueForm;
