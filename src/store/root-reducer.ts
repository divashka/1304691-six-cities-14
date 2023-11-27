import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { dataProcess } from './data-process/data-process';
import { userProcess } from './user-process/user-process';
import { appProcess } from './app-process/app-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataProcess.reducer,
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
