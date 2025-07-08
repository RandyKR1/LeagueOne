import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeagueOneApi from "../api";
import Alert from "../Common/Alert";

const MatchForm = () => {
  const INITIAL_STATE = {
    eventLocation: "",
    eventType: "",
    team1: "",
    team2: "",
    team1Score: "",
    team2Score: ""
  };

  const { leagueId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const league = await LeagueOneApi.getLeagueById(leagueId);
        if (league && league.teams) {
          setTeams(league.teams);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        setErrors(["Failed to fetch teams"]);
      }
    };

    fetchTeams();
  }, [leagueId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { team1, team2, team1Score, team2Score, eventLocation, eventType } = formData;

    // Validate scores
    if (team1 === team2) {
      setErrors(["Teams cannot be the same"]);
      return;
    }

    const matchData = {
      leagueId: parseInt(leagueId, 10),
      eventLocation,
      eventType,
      team1: parseInt(team1, 10),
      team2: parseInt(team2, 10),
      team1Score: parseInt(team1Score, 10),
      team2Score: parseInt(team2Score, 10)
    };

    try {
      let res = await LeagueOneApi.createMatch(leagueId, matchData);
      if (res.match && res.match.id) {
        navigate(`/leagues/${leagueId}/matches/${res.match.id}`);
      } else {
        setErrors(["Failed to create match"]);
      }
    } catch (err) {
      setErrors([err.response?.data?.error || "Something went wrong"]);
    }
  };

  return (
    <div className="container">
      <h2>Match Creation</h2>
      <form className="form-container" onSubmit={handleSubmit}>
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

        {errors.length > 0 && <Alert messages={errors} />}

        <button className="button" type="submit">Create Match</button>
      </form>
    </div>
  );
};

export default MatchForm;
