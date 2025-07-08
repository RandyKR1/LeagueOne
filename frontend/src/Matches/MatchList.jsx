import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { leagueId } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        let res = await LeagueOneApi.getMatches(leagueId);
        setMatches(res);
      } catch (e) {
        console.error(e);
      }
    };

    fetchMatches();
  }, [leagueId]);

  return (
    <div className="container">
       <div className="header-list">
          <div className="header-list-display">
            <p>Matches</p> 
          </div>
          <div className="header-list-display">
            {currentUser?.isLeagueAdmin && (
              <Link to={`/leagues/${leagueId}/matches/create`}>Create A Match</Link>
            )}
          </div>
            </div>
      <div className="list-container">
      {matches.length > 0 ? (
        <ul className="list">
          {matches.map((match) => (
            <li 
              className="match-list-display"
              key={match.id}>
              <Link to={`/leagues/${leagueId}/matches/${match.id}`}>
                <p>{match.eventLocation}</p>
                <p>{match.homeTeam.name}: {match.team1Score} vs {match.awayTeam.name}: {match.team2Score}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches yet!</p>
      )}
    </div>
    </div>
  );
};

export default MatchList;
