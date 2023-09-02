// rootReducer.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './slices/noticationSlice';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default rootReducer;
