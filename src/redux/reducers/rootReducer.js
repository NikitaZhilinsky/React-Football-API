import { combineReducers } from 'redux';
import teamsReducer from './teams.reducer';
import playersReducer from './players.reducer';



const state = {
  teamsReducer,
  playersReducer,
};

const rootReducer = combineReducers({
  ...state,
});

export default rootReducer
