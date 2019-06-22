import {combineReducers} from 'redux';
import {reducer as data, initialState as initialDataState} from './data/data.js';
import {reducer as cities, initialState as initialCitiesState} from './cities/cities.js';
import {reducer as auth, initialState as initialAuthState} from './auth/auth.js';
import NameSpace from './name-spaces.js';

const initialState = {
  [NameSpace.CITIES]: initialCitiesState,
  [NameSpace.DATA]: initialDataState,
  [NameSpace.AUTH]: initialAuthState,
};

export {initialState};
export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.CITIES]: cities,
  [NameSpace.AUTH]: auth,
});
