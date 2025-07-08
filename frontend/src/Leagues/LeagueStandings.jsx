import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LeagueOneApi from '../api';

const LeagueStandings = () => {
  const { id } = useParams();
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchStandings = async () => {
      try {
        const standingsData = await LeagueOneApi.getStandingsByLeagueId(id);
        standingsData.sort((a, b) => b.points - a.points);
        if (isMounted) {
          setStandings(standingsData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching standings:', error);
        if (isMounted) {
          setError('Failed to fetch standings');
          setLoading(false);
        }
      }
    };

    fetchStandings();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return <div>Loading standings...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='standings'>
      <h2>Standings</h2>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Points</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing) => (
            <tr key={standing.id}>
              <td>{standing.team.name}</td>
              <td>{standing.points}</td>
              <td>{standing.wins}</td>
              <td>{standing.losses}</td>
              <td>{standing.draws}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueStandings;