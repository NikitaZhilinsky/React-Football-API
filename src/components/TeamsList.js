import React, { useState } from 'react';
import './TeamsList.css'

const TeamsList = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [error1, setError1] = useState('');
  const [error, setError] = useState('');

  const getTeamsList = async () => {
    try {
      const response = await fetch(`https://api.football-data.org/v2/teams`, {
        headers: {
          "X-Auth-Token": "9053d3414524438e9f1753cf3f3732cb",
        },
      })
      const data = await response.json();
      setTeams(data.teams);
    } catch(error) {
      setError(`${error}`);
    }
  };

  const getPlayersList = async (id) => {
    try {
      const response = await fetch(`https://api.football-data.org/v2/teams/${id}`, {
        headers: {
          "X-Auth-Token": "9053d3414524438e9f1753cf3f3732cb",
        },
      })
      const data = await response.json();
      setPlayers(data.squad);
    } catch(error) {
      setPlayers([]);
      setError1(`${error}`);
    }
  };

  return (
    <div className="clubs">
      <button onClick={getTeamsList} className="clubs__button">
        Teams
      </button>
      {error ? <div className="club__list_error">{error}</div> : null}
      <div className="club__list">
        {teams.map((team) => {
          return (
            <div key={team.id} onClick={() => getPlayersList(team.id)} className="club__list_name">
              {team.name}
            </div>
          );
        })}
      </div>
      <div className="players__list">
        {players.map((player) => {
          return (
            <div key={player.id} className="club__player">
              <div className="players__list_name">
                {player.name}
              </div>
              <div className="players__list_position">
              ({player.position})
              </div>
            </div>
          );
        })}
      </div>
      {error1 ? <div className="club__player">Players not found</div> : null}
    </div>
  )
}

export default TeamsList;
