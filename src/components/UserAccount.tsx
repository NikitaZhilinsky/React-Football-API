import React from 'react';
import './UserAccount.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavoriteTeams } from '../redux/actions/teamsActions';
import { removeFromFavoritePlayers } from '../redux/actions/playersActions';
import { Team } from '../redux/reducers/teamsReducer';
import { Player } from '../redux/reducers/playersReducer';
import { RootState } from '../redux/reducers/rootReducer';

const UserAccount = () => {

  const favTeamsIds = useSelector((state: RootState) => state.teamsReducer.favTeamsIds);
  const localAllTeams = JSON.parse(localStorage.getItem("allTeams") || "[]") || [];
  const localFavTeamsIds = JSON.parse(localStorage.getItem("favTeamsIds") || "[]") || [];
  const favPlayersIds = useSelector((state: RootState) => state.playersReducer.favPlayersIds);
  const localAllPlayers = JSON.parse(localStorage.getItem("allPlayers") || "[]") || [];
  const localFavPlayersIds = JSON.parse(localStorage.getItem("favPlayersIds") || "[]") || [];

  const dispatch = useDispatch();
  
  const handleClickRemoveTeam = (id: number) => dispatch(removeFromFavoriteTeams(id, localFavTeamsIds));
  const handleClickRemovePlayer = (id: number) => dispatch(removeFromFavoritePlayers(id, localFavPlayersIds));
  
  return (
    <div className="account__wraper">
      <div className="buttons">
        <Link to="/">
          <button className="clubs__button">
            Teams
          </button>
        </Link>
        <Link to="/user">
          <button className="account__button">
            User Account
          </button>
        </Link>
      </div>
      <div className="favorites__wrapper">
        <div className="favorites__teams">
          <div className="favorites__title">
            Selected Teams:
          </div>
          {!!localFavTeamsIds.length && <div className="favorites__teams_area">
            {localFavTeamsIds.map((favId: number) => {
              const selTeam = localAllTeams.find((team: Team) => team.id === favId) 
              return (
                <div key={selTeam.id} className="favorites__team_cell">
                  <div className="teamMainInfo">
                    <img src={selTeam.crestUrl} alt={selTeam.name} className="favorites__team_icon"/>
                    <div className="favorites__team_name">
                      {selTeam.name}
                    </div>
                    <button 
                      onClick={() => handleClickRemoveTeam(selTeam.id)}
                      className="trash_team">
                    </button>
                  </div>
                  <div className="teamDetailedData">
                  <div>
                    Address: {selTeam.address}
                  </div>
                  <div>
                    Founded: {selTeam.founded}
                  </div>
                  <div>
                    Venue: {selTeam.venue}
                  </div>
                  <div className="teamWebsite">
                    Website: <a 
                              href={selTeam.website} 
                              target="_blank"
                              rel="noreferrer" 
                              className="link">{selTeam.website}</a> 
                  </div>
                </div>
                </div>
              )              
            })}
          </div>}
        </div>
        <div className="favorites__players">
          <div className="favorites__title">
            Selected Players:
          </div>
          {!!localFavPlayersIds.length && <div className="favorites__players_area">
            {localFavPlayersIds.map((favId: number) => {
              const selPlayer = localAllPlayers.find((player: Player) => player.id === favId) 
              return (
                <div key={selPlayer.id} className="favorites__player_cell">
                  <div className="playerMainInfo">
                    <div className="favorites__player_name">
                      {selPlayer.name}
                    </div>
                    <button 
                      onClick={() => handleClickRemovePlayer(selPlayer.id)}
                      className="trash_player">
                    </button>
                  </div>
                  <div className="playerDetailedData">
                    <div>
                      Position: {selPlayer.position}
                    </div>
                    <div className="playerNationality">
                      Nationality: {selPlayer.nationality}
                    </div>
                  </div>
                </div>
              )              
            })}
          </div>}
        </div>
      </div>
    </div>
  )
}

export default UserAccount;