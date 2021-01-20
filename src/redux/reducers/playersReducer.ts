import { 
  GET_ALL_PLAYERS,
  ADD_TO_FAVORITE_PLAYERS,
  REMOVE_FROM_FAVORITE_PLAYERS,
  PLAYERS_REQUEST_ERROR 
} from '../actions/consts';
import {
  getAllPlayersType,
  addToFavoritePlayersType,
  removeFromFavoritePlayersType,
  playersRequesrErrorType
} from '../actions/playersActions';

export type Player = {
  countryOfBirth: string,
  dateOfBirth: string,
  id: number,
  name: string,
  nationality: string,
  position: string,
  role: string,
  shirtNumber?: number
}

type initialStateType = {
  allPlayers: Player[],
  visiblePlayers: Player[],
  favPlayersIds: number[],
  error: string
}

const initialState: initialStateType = {
  allPlayers: [],
  visiblePlayers: [],
  favPlayersIds: [],
  error: ""
}

export type ActionsTypes = getAllPlayersType | 
                           addToFavoritePlayersType | 
                           removeFromFavoritePlayersType |
                           playersRequesrErrorType

const playersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case GET_ALL_PLAYERS:
      return {
        ...state, 
        allPlayers: [...state.allPlayers, ...action.players], 
        visiblePlayers: action.loaded,
        favPlayersIds: action.favPlayersIds,
        error: ""
      }
    case ADD_TO_FAVORITE_PLAYERS:
      return {
        ...state, 
        favPlayersIds: [...state.favPlayersIds, action.favPlayersIds]
      }
    case REMOVE_FROM_FAVORITE_PLAYERS:
      return {
        ...state, 
        favPlayersIds: action.favPlayersIds
      }
    case PLAYERS_REQUEST_ERROR:
      return {
        ...state,
        visiblePlayers: [],
        error: action.error
      }
    default:
      return state;
  }
}

export default playersReducer
