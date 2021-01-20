import { 
  GET_ALL_TEAMS, 
  ADD_TO_FAVORITE_TEAMS,
  REMOVE_FROM_FAVORITE_TEAMS,
  TEAMS_REQUEST_ERROR
} from './consts';
import { ActionsTypes, Team } from '../reducers/teamsReducer';
import { Dispatch } from 'react';
import { RootState } from '../reducers/rootReducer';

export const getAllTeams = () => async (dispatch: Dispatch<ActionsTypes>) => {
  try {
    const response = await fetch(`https://api.football-data.org/v2/teams`, {
      headers: {
        "X-Auth-Token": "9053d3414524438e9f1753cf3f3732cb",
      },
    })
    
    const data = await response.json();
    const favTeamsIds = JSON.parse(localStorage.getItem("favTeamsIds") || "[]") || [];
    localStorage.setItem("allTeams", JSON.stringify(data.teams));

    return dispatch({
      type: GET_ALL_TEAMS,
      teams: data.teams,
      favTeamsIds
    });
  } catch (err) {
    console.error(err);
    return dispatch ({
      type: TEAMS_REQUEST_ERROR,
      error: err.stack
    })
  }
};

export type getAllTeamsType = {
  type: typeof GET_ALL_TEAMS,
  teams: Team[],
  favTeamsIds: number[]
}

export type teamsRequesrErrorType = {
  type: typeof TEAMS_REQUEST_ERROR,
  error: string
}

export const addToFavoriteTeams = (id: number) => (dispatch: Dispatch<ActionsTypes>, getState: () => RootState) => { 
  const currentFavTeamsIds = getState().teamsReducer.favTeamsIds;
  localStorage.setItem("favTeamsIds", JSON.stringify([...currentFavTeamsIds, id]))
  return dispatch({
    type: ADD_TO_FAVORITE_TEAMS,
    favTeamsIds: id
  });
}

export type addToFavoriteTeamsType = {
  type: typeof ADD_TO_FAVORITE_TEAMS,
  favTeamsIds: number
}

export const removeFromFavoriteTeams = (id: number, favTeamsIds: number[]) => (dispatch: Dispatch<ActionsTypes>) => {
  const updatedFavTeamsIds = favTeamsIds.filter(elem => elem !== id);
  localStorage.setItem("favTeamsIds", JSON.stringify(updatedFavTeamsIds))
  return dispatch({
    type: REMOVE_FROM_FAVORITE_TEAMS,
    favTeamsIds: updatedFavTeamsIds
  });
}

export type removeFromFavoriteTeamsType = {
  type: typeof REMOVE_FROM_FAVORITE_TEAMS,
  favTeamsIds: number[]
}
