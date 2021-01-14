import { 
  GET_ALL_PLAYERS,
  ADD_TO_FAVORITE_PLAYERS,
  REMOVE_FROM_FAVORITE_PLAYERS 
} from '../actions/consts';
import {
  getAllPlayersType,
  addToFavoritePlayersType,
  removeFromFavoritePlayersType
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
  favPlayersIds: number[]
}

const initialState: initialStateType = {
  allPlayers: [],
  visiblePlayers: [],
  favPlayersIds: []
}

export type ActionsTypes = getAllPlayersType | addToFavoritePlayersType | removeFromFavoritePlayersType

const playersReducer = (state = initialState, action: ActionsTypes): initialStateType => {
  switch (action.type) {
    case GET_ALL_PLAYERS:
      return {
        ...state, 
        allPlayers: [...state.allPlayers, ...action.players], 
        visiblePlayers: action.loaded,
        favPlayersIds: action.favPlayersIds
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
    default:
      return state;
  }
}

export default playersReducer
