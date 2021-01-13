import React from 'react';
import './TeamsList.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getAllTeams, 
  getAllPlayers, 
  addToFavoriteTeams,
  addToFavoritePlayers,
  removeFromFavoriteTeams,
  removeFromFavoritePlayers
} from '../redux/actions/index'


const TeamsList = () => {
  const teams = useSelector((state) => state.teamsReducer.allTeams);
  // console.log(teams);
  
  const favTeamsIds = useSelector((state) => state.teamsReducer.favTeamsIds);
  // console.log(favTeamsIds);
  
  const players = useSelector((state) => state.playersReducer.allPlayers);
  // console.log(players);
  
  const visiblePlayers = useSelector((state) => state.playersReducer.visiblePlayers);
  // console.log(visiblePlayers);
  
  const favPlayersIds = useSelector((state) => state.playersReducer.favPlayersIds);
  // console.log(favPlayersIds);
  
  const dispatch = useDispatch();

  const getTeamsList = () => dispatch(getAllTeams());
  const getPlayersList = (id) => dispatch(getAllPlayers(id));
  const handleClickAddTeam = (id) => dispatch(addToFavoriteTeams(id));
  const handleClickRemoveTeam = (id) => dispatch(removeFromFavoriteTeams(id, favTeamsIds));
  const handleClickAddPlayer = (id) => dispatch(addToFavoritePlayers(id));
  const handleClickRemovePlayer = (id) => dispatch(removeFromFavoritePlayers(id, favPlayersIds));

  const favoriteTeamsControll = (id) => {
    favTeamsIds.includes(id) ? 
      handleClickRemoveTeam(id) : 
      handleClickAddTeam(id)
  };

  const classTeamActiveControll = (id) => {
    return (
      favTeamsIds.includes(id) ? 
        "active__favorites__icon_team" : 
        "favorites__icon_team"
    )
  }

  const favoritePlayersControll = (id) => {
    favPlayersIds.includes(id) ? 
      handleClickRemovePlayer(id) : 
      handleClickAddPlayer(id)
  };

  const classPlayerActiveControll = (id) => {
    return (
      favPlayersIds.includes(id) ?
        "active__favorites__icon_player" :
        "favorites__icon_player"
    )
  }

  return (
    <div className="clubs">
      <div className="buttons">
        <button onClick={getTeamsList} className="clubs__button">
          Teams
        </button>
        <Link to="/user">
          <button className="account__button">
            User Account
          </button>
        </Link>
      </div>
      {/* {errorTeams ? <div className="club__list_error">{errorTeams}</div> : null} */}
      {!!teams.length && <div className="club__list">
        {teams.map((team) => (
          <div key={team.id} onClick={() => getPlayersList(team.id)} className="club__list_cell">
            <img src={team.crestUrl} alt={team.name} className="club__list_icon"/>
            <div className="club__list_name">
              {team.name}
            </div>
            <button 
              onClick={() => favoriteTeamsControll(team.id)} 
              className={classTeamActiveControll(team.id)}>  
            </button>
          </div>
        ))}
      </div>}
      {!!visiblePlayers.length && <div className="players__list">
        {visiblePlayers.map((player) => (
          <div key={player.id} className="club__player">
            <div className="players__list_name">
              {player.name}
            </div>
            <div className="players__list_position">
              ({player.position})
            </div>
            <button 
              onClick={() => favoritePlayersControll(player.id)}
              className={classPlayerActiveControll(player.id)}>
            </button>
          </div>
        ))}
      </div>}
      {/* {errorPlayers ? <div className="club__player">Players not found</div> : null} */}
    </div>
  )
}

export default TeamsList;
