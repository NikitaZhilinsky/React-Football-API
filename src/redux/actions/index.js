import { 
  GET_ALL_TEAMS, 
  GET_ALL_PLAYERS, 
  ADD_TO_FAVORITE_TEAMS,
  ADD_TO_FAVORITE_PLAYERS,
  REMOVE_FROM_FAVORITE_TEAMS,
  REMOVE_FROM_FAVORITE_PLAYERS
} from './action';

export const getAllTeams = () => async (dispatch) => {
  try {
    const response = await fetch(`https://api.football-data.org/v2/teams`, {
      headers: {
        "X-Auth-Token": "9053d3414524438e9f1753cf3f3732cb",
      },
    })
    const data = await response.json();
    const favTeamsIds = JSON.parse(localStorage.getItem("favTeamsIds")) || [];
    localStorage.setItem("allTeams", JSON.stringify(data.teams));
    return dispatch({
      type: GET_ALL_TEAMS,
      teams: data.teams,
      favTeamsIds,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAllPlayers = (id) => async (dispatch, getState) => {
  try {
    const response = await fetch(`https://api.football-data.org/v2/teams/${id}`, {
      headers: {
        "X-Auth-Token": "9053d3414524438e9f1753cf3f3732cb",
      },
    })
    const data = await response.json();
    const favPlayersIds = JSON.parse(localStorage.getItem("favPlayersIds")) || [];
    const localAllPlayers = JSON.parse(localStorage.getItem("allPlayers")) || [];
    // console.log(localAllPlayers);
    // const currentAllPlayers = getState().playersReducer.allPlayers;
    // console.log(data.squad);
    // console.log(currentAllPlayers);
    
    const dataTesting = (data, localAllPlayers) => {
      const compareResult = data.filter((v) => {
          return localAllPlayers.every((v2) => {
            return JSON.stringify(v.id) !== JSON.stringify(v2.id);
          })
      })
      return compareResult;
    }
    const testedData = dataTesting(data.squad, localAllPlayers);
    // console.log(testedData);
    localStorage.setItem("allPlayers", JSON.stringify([...localAllPlayers, ...testedData]));
  
    return dispatch({ 
      type: GET_ALL_PLAYERS, 
      players: testedData,
      loaded: data.squad,
      favPlayersIds,
    });
  } catch(err) {
    console.error(err);
  }
};

export const addToFavoriteTeams = (id) => (dispatch, getState) => { 
  const currentFavTeamsIds = getState().teamsReducer.favTeamsIds;
  localStorage.setItem("favTeamsIds", JSON.stringify([...currentFavTeamsIds, id]))
  return dispatch({
    type: ADD_TO_FAVORITE_TEAMS,
    value: id
  });
}

export const addToFavoritePlayers = (id) => (dispatch, getState) => {
  const currentFavPlayersIds = getState().playersReducer.favPlayersIds;
  localStorage.setItem("favPlayersIds", JSON.stringify([...currentFavPlayersIds, id]))
  return dispatch({
    type: ADD_TO_FAVORITE_PLAYERS,
    value: id
  });
}

export const removeFromFavoriteTeams = (id, favTeamsIds) => (dispatch) => {
  const updatedFavTeamsIds = favTeamsIds.filter(elem => elem !== id);
  localStorage.setItem("favTeamsIds", JSON.stringify(updatedFavTeamsIds))
  return dispatch({
    type: REMOVE_FROM_FAVORITE_TEAMS,
    value: updatedFavTeamsIds
  });
}

export const removeFromFavoritePlayers = (id, favPlayersIds) => (dispatch) => {
  const updatedFavPlayersIds = favPlayersIds.filter(elem => elem !== id);
  localStorage.setItem("favPlayersIds", JSON.stringify(updatedFavPlayersIds))
  return dispatch({
    type: REMOVE_FROM_FAVORITE_PLAYERS,
    value: updatedFavPlayersIds
  });
}
