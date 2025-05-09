import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the admin state interface
interface AdminState {
  token: string | null;
}

const initialState: AdminState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('adminToken', action.payload);
      }
    },
    clearToken: (state) => {
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('adminToken');
      }
    },
  },
});

export const { setToken, clearToken } = adminSlice.actions;
export default adminSlice.reducer;