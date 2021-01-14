import { combineReducers } from 'redux';
import teamsReducer from './teamsReducer';
import playersReducer from './playersReducer';

const state = {
  teamsReducer,
  playersReducer
};

const rootReducer = combineReducers({
  ...state,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
