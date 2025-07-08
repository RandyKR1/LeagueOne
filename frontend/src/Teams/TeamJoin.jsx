import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeagueOneApi from "../api";
import Alert from "../Common/Alert";

const TeamJoin = () => {
  const { teamId } = useParams();
  const INITIAL_STATE = { password: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const team = await LeagueOneApi.getTeamById(teamId);
        setTeam(team);
      } catch (err) {
        setErrors([err.message || "Failed to fetch team."]);
      }
    };
    fetchTeam();
  }, [teamId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess("");
    console.log("Submitting form data:", formData);

    try {
      let res = await LeagueOneApi.joinTeam(teamId, formData);
      console.log("API Response:", res);
      if (res && res.message) {
        setSuccess(res.message);
        setTeam(res.team.players); // Update team members
        navigate(`/teams/${teamId}`); // Redirect to the team page
      } else {
        setErrors(["Failed to join team"]);
      }
    } catch (err) {
      console.error("API Error:", err);
      setErrors([err.message || "Something went wrong"]);
    }
  };

  return (
    <div className="container">
      <h2>Join Team</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button className="button" type="submit">Join Team</button>
      </form>
      {success && <Alert messages={[success]} type="success" />}
      {errors.length > 0 && <Alert messages={errors} />}
    </div>
  );
};

export default TeamJoin;
