import React from 'react';
import './TeamsList.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getAllTeams, 
  addToFavoriteTeams,
  removeFromFavoriteTeams
} from '../redux/actions/teamsActions';
import {
  getAllPlayers,
  addToFavoritePlayers,
  removeFromFavoritePlayers
} from '../redux/actions/playersActions';
import { Team } from '../redux/reducers/teamsReducer';
import { Player } from '../redux/reducers/playersReducer';
import { RootState } from '../redux/reducers/rootReducer';

const TeamsList = () => {
  const teams = useSelector((state: RootState) => state.teamsReducer.allTeams);
  const favTeamsIds = useSelector((state: RootState) => state.teamsReducer.favTeamsIds);
  const errorTeams = useSelector((state: RootState) => state.teamsReducer.error);
  
  const visiblePlayers = useSelector((state: RootState) => state.playersReducer.visiblePlayers);
  const favPlayersIds = useSelector((state: RootState) => state.playersReducer.favPlayersIds);
  const errorPlayers = useSelector((state: RootState) => state.playersReducer.error);
  
  const dispatch = useDispatch();

  const getTeamsList = () => dispatch(getAllTeams());
  const getPlayersList = (id: number) => dispatch(getAllPlayers(id));
  const handleClickAddTeam = (id: number) => dispatch(addToFavoriteTeams(id));
  const handleClickRemoveTeam = (id: number) => dispatch(removeFromFavoriteTeams(id, favTeamsIds));
  const handleClickAddPlayer = (id: number) => dispatch(addToFavoritePlayers(id));
  const handleClickRemovePlayer = (id: number) => dispatch(removeFromFavoritePlayers(id, favPlayersIds));

  const favoriteTeamsControll = (id: number) => {
    favTeamsIds.includes(id) ? 
      handleClickRemoveTeam(id) : 
      handleClickAddTeam(id)
  };

  const classTeamActiveControll = (id: number) => {
    return (
      favTeamsIds.includes(id) ? 
        "active__favorites__icon_team" : 
        "favorites__icon_team"
    )
  }

  const favoritePlayersControll = (id: number) => {
    favPlayersIds.includes(id) ? 
      handleClickRemovePlayer(id) : 
      handleClickAddPlayer(id)
  };

  const classPlayerActiveControll = (id: number) => {
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
      {!!errorTeams.length && <div className="club__list_error">
        "{errorTeams}". Please try again later.
      </div>}
      {!!teams.length && <div className="club__list">
        {teams.map((team: Team) => (
          <div key={team.id} className="club__list_cell">
            <img 
              src={team.crestUrl} 
              onClick={() => getPlayersList(team.id)} 
              alt={team.name} 
              className="club__list_icon"
            />
            <div onClick={() => getPlayersList(team.id)} className="club__list_name">
              {team.name}
            </div>
            <button 
              onClick={() => favoriteTeamsControll(team.id)} 
              className={classTeamActiveControll(team.id)}>  
            </button>
          </div>
        ))}
      </div>}
      {!!errorPlayers.length && <div className="players__list_error">
        "{errorPlayers}". Please try again later.
      </div>}
      {!!visiblePlayers.length && <div className="players__list">
        <div className="players__list_title">
          Players:
        </div>
        {visiblePlayers.map((player: Player) => (
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
    </div>
  )
}

export default TeamsList;
