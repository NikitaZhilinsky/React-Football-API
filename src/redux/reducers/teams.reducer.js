import { 
  GET_ALL_TEAMS,
  ADD_TO_FAVORITE_TEAMS,
  REMOVE_FROM_FAVORITE_TEAMS
} from '../actions/action';

const initialState = {
  allTeams: [],
  favTeamsIds: []
}

const teamsReducer = (state = initialState, action) => {
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
        favTeamsIds: [...state.favTeamsIds, action.value]
      }
    case REMOVE_FROM_FAVORITE_TEAMS:
      return {
        ...state, 
        favTeamsIds: action.value
      }
    default:
      return state;
  }
}

export default teamsReducer
