import { 
  GET_ALL_PLAYERS,
  ADD_TO_FAVORITE_PLAYERS,
  REMOVE_FROM_FAVORITE_PLAYERS 
} from '../actions/action';

const initialState = {
  allPlayers: [],
  visiblePlayers: [],
  favPlayersIds: [],
}

const playersReducer = (state = initialState, action) => {
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
        favPlayersIds: [...state.favPlayersIds, action.value]
      }
    case REMOVE_FROM_FAVORITE_PLAYERS:
      return {
        ...state, 
        favPlayersIds: action.value
      }
    default:
      return state;
  }
}

export default playersReducer
