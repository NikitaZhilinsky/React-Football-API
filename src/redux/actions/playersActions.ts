import { 
  GET_ALL_PLAYERS, 
  ADD_TO_FAVORITE_PLAYERS,
  REMOVE_FROM_FAVORITE_PLAYERS,
  PLAYERS_REQUEST_ERROR
} from './consts';
import { ActionsTypes, Player } from '../reducers/playersReducer';
import { Dispatch } from 'react';
import { RootState } from '../reducers/rootReducer';

export const getAllPlayers = (id: number) => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    const response = await fetch(`https://api.football-data.org/v2/teams/${id}`, {
      headers: {
        "X-Auth-Token": "9053d3414524438e9f1753cf3f3732cb",
      },
    })
    const data = await response.json();
    const favPlayersIds = JSON.parse(localStorage.getItem("favPlayersIds") || "[]") || [];
    const localAllPlayers = JSON.parse(localStorage.getItem("allPlayers") || "[]") || [];
    
    const dataTesting = (data: Player[], localAllPlayers: Player[]) => {
      const compareResult = data.filter((v) => {
          return localAllPlayers.every((v2) => {
            return JSON.stringify(v.id) !== JSON.stringify(v2.id);
          })
      })
      return compareResult;
    }

    const testedData = dataTesting(data.squad, localAllPlayers);
    localStorage.setItem("allPlayers", JSON.stringify([...localAllPlayers, ...testedData]));
  
    return dispatch({ 
      type: GET_ALL_PLAYERS, 
      players: testedData,
      loaded: data.squad,
      favPlayersIds,
    });
  } catch(err) {
    console.error(err);
    return dispatch ({
      type: PLAYERS_REQUEST_ERROR,
      error: err.stack
    })
  }
}

export type getAllPlayersType = {
  type: typeof GET_ALL_PLAYERS,
  players: Player[],
  loaded: Player[],
  favPlayersIds: number[]
}

export type playersRequesrErrorType = {
  type: typeof PLAYERS_REQUEST_ERROR,
  error: string
}

export const addToFavoritePlayers = (id: number) => (dispatch: Dispatch<ActionsTypes>, getState: () => RootState) => {
  const currentFavPlayersIds = getState().playersReducer.favPlayersIds;
  localStorage.setItem("favPlayersIds", JSON.stringify([...currentFavPlayersIds, id]))
  return dispatch({
    type: ADD_TO_FAVORITE_PLAYERS,
    favPlayersIds: id
  });
}

export type addToFavoritePlayersType = {
  type: typeof ADD_TO_FAVORITE_PLAYERS,
  favPlayersIds: number
}

export const removeFromFavoritePlayers = (id: number, favPlayersIds: number[]) => (dispatch: Dispatch<ActionsTypes>) => {
  const updatedFavPlayersIds = favPlayersIds.filter(elem => elem !== id);
  localStorage.setItem("favPlayersIds", JSON.stringify(updatedFavPlayersIds))
  return dispatch({
    type: REMOVE_FROM_FAVORITE_PLAYERS,
    favPlayersIds: updatedFavPlayersIds
  });
}

export type removeFromFavoritePlayersType = {
  type: typeof REMOVE_FROM_FAVORITE_PLAYERS,
  favPlayersIds: number[]
}