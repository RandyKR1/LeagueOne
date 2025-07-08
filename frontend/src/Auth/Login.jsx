import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Common/Alert";

const LoginForm = ({ login }) => {
    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation
        if (!formData.username || !formData.password) {
            setFormErrors(["Username and password are required."]);
            return;
        }

        try {
            let res = await login(formData);
            if (res.success) {
                navigate("/");
            } else {
                setFormErrors(res.errors || ["Login failed. Please check your credentials."]);
            }
        } catch (error) {
            setFormErrors(["An unexpected error occurred. Please try again later."]);
        }
    }

    return (
        <>
            <h2>Log In</h2>
            <form
                onSubmit={handleSubmit}
                className="form-container"
            >
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
                {formErrors.length ? <Alert messages={formErrors} /> : null}

                <button className="button">Submit</button>
            </form>
        </>
    );
}

export default LoginForm;
