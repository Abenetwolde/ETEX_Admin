import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from '../users';
import adminSlice from '../states/admin-slice';

// Configure the Redux store with RTK Query
export const store = configureStore({
  reducer: {
    admin: adminSlice, // Use the imported adminSlice directly
    [usersApi.reducerPath]: usersApi.reducer, // Add the RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware), // Add RTK Query middleware
});

// Define RootState and AppDispatch types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;