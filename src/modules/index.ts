import { combineReducers } from 'redux';
import call from './call';

const rootReducer = combineReducers({ call });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
