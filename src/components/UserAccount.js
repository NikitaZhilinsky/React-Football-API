import React from 'react';
import './UserAccount.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  removeFromFavoriteTeams, 
  removeFromFavoritePlayers
} from '../redux/actions/index'

const UserAccount = () => {

  // const teams = useSelector((state) => state.teamsReducer.allTeams);
  // console.log(teams);

  const favTeamsIds = useSelector((state) => state.teamsReducer.favTeamsIds);
  // console.log(favTeamsIds);

  const localAllTeams = JSON.parse(localStorage.getItem("allTeams")) || [];
  // console.log(localAllTeams);

  const localFavTeamsIds = JSON.parse(localStorage.getItem("favTeamsIds")) || [];
  // console.log(localFavTeams);

  // const players = useSelector((state) => state.playersReducer.allPlayers);
  // console.log(players);

  const favPlayersIds = useSelector((state) => state.playersReducer.favPlayersIds);
  // console.log(favPlayersIds);

  const localAllPlayers = JSON.parse(localStorage.getItem("allPlayers")) || [];
  // console.log(localAllPlayers);

  const localFavPlayersIds = JSON.parse(localStorage.getItem("favPlayersIds")) || [];
  // console.log(localFavPlayers);

  const dispatch = useDispatch();
  
  const handleClickRemoveTeam = (id) => dispatch(removeFromFavoriteTeams(id, localFavTeamsIds));
  const handleClickRemovePlayer = (id) => dispatch(removeFromFavoritePlayers(id, localFavPlayersIds));
  
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
            {localFavTeamsIds.map((favId) => {
              const selTeam = localAllTeams.find(team => team.id === favId) 
              return (
                <div className="favorites__team_cell">
                  <img src={selTeam.crestUrl} alt={selTeam.name} className="favorites__team_icon"/>
                  <div key={selTeam.id} className="favorites__team_name">
                    {selTeam.name}
                  </div>
                  <button 
                    onClick={() => handleClickRemoveTeam(selTeam.id)}
                    className="trash_team">
                  </button>
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
            {localFavPlayersIds.map((favId) => {
              const selPlayer = localAllPlayers.find(player => player.id === favId) 
              return (
                <div className="favorites__player_cell">
                  <div key={selPlayer.id} className="favorites__player_name">
                    {selPlayer.name}
                  </div>
                  <button 
                    onClick={() => handleClickRemovePlayer(selPlayer.id)}
                    className="trash_player">
                  </button>
                </div>
              )              
            })}
          </div>}
        </div>
        {!!localFavTeamsIds.length && <div className="teamDetailedData">
          {localFavTeamsIds.map((favId) => {
              const selTeam = localAllTeams.find(team => team.id === favId)
              return (
                <div>
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
                    Website: <a href={selTeam.website} target="_blank" className="link">{selTeam.website}</a> 
                  </div>
                </div>
              )
          })}
        </div>}
        {!!localFavPlayersIds.length && <div className="playerDetailedData">
          {localFavPlayersIds.map((favId) => {
              const selPlayer = localAllPlayers.find(team => team.id === favId)
              return (
                <div>
                  <div>
                    Position: {selPlayer.position}
                  </div>
                  <div className="playerNationality">
                    Nationality: {selPlayer.nationality}
                  </div>
                </div>
              )
          })}
        </div>}
      </div>
    </div>
  )
}

export default UserAccount;


// teams.map((team) => {
//   if (favTeamsIds.incudes(team.id)) {
//     return (
//       <div key={team.id}>
//         {team.name}
//       </div>
//     )
//   }              
// })