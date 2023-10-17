// rootReducer.ts
import { useDispatch as useReduxDispatch } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './slices/noticationSlice';
import contactModalReducer from './slices/contactModalSlice';

const rootReducer = combineReducers({
  notifications: notificationsReducer,
  contactModal: contactModalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => useReduxDispatch<AppDispatch>();

export default rootReducer;
