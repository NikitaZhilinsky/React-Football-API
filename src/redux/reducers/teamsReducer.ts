import { 
  GET_ALL_TEAMS,
  ADD_TO_FAVORITE_TEAMS,
  REMOVE_FROM_FAVORITE_TEAMS
} from '../actions/consts';
import {
  getAllTeamsType,
  addToFavoriteTeamsType,
  removeFromFavoriteTeamsType
} from '../actions/teamsActions';

export type Team = {
  address: string,
  area: { 
    id: number,
    name: string
  },
  clubColors: string,
  crestUrl: string,
  email: string,
  founded: number,
  id: number,
  lastUpdated: string,
  name: string,
  phone: string,
  shortName: string,
  tla: string,
  venua: string,
  website: string
}

type initialStateType = {
  allTeams: Team[],
  favTeamsIds: number[]
}

const initialState: initialStateType = {
  allTeams: [],
  favTeamsIds: []
}

export type ActionsTypes = getAllTeamsType | addToFavoriteTeamsType | removeFromFavoriteTeamsType

const teamsReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case GET_ALL_TEAMS:
      return {
        ...state, 
        allTeams: action.teams, 
        favTeamsIds: action.favTeamsIds
      }
    case ADD_TO_FAVORITE_TEAMS:
      return {
        ...state, 
        favTeamsIds: [...state.favTeamsIds, action.favTeamsIds]
      }
    case REMOVE_FROM_FAVORITE_TEAMS:
      return {
        ...state, 
        favTeamsIds: action.favTeamsIds
      }
    default:
      return state;
  }
}

export default teamsReducer
