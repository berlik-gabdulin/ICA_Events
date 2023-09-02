import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  message: '',
  type: 'success' as 'success' | 'error' | 'warning',
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification: (state, action) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    hideNotification: (state) => {
      state.isOpen = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
