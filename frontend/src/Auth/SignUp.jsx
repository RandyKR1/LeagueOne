import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import Alert from "../Common/Alert";

const SignUp = () => {
    const INITIAL_STATE = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([]);
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError(""); // Reset password error before validation

        // Password validation
        if (formData.password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return;
        }

        try {
            const res = await LeagueOneApi.registerUser(formData);
            console.log(res);
            if (res.id && res.username && res.email) {
                navigate("/"); // Redirect to login page after successful signup
            } else {
                setErrors(["Failed to register user"]);
            }
        } catch (err) {
            setErrors([err.response?.data?.error || "Something went wrong"]);
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form className="form-container" onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
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
                {passwordError && <Alert messages={[passwordError]} />}
                {errors.length > 0 && !passwordError && <Alert messages={errors} />}
                <button className="button" type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
