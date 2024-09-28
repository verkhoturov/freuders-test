import { configureStore } from '@reduxjs/toolkit';
import specialistsReducer from './specialistsSlice';
import filterFormReducer from './filterFormSlice';

export const store = configureStore({
  reducer: {
    specialists: specialistsReducer,
    filterForm: filterFormReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
