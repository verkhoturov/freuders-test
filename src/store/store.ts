import { configureStore } from '@reduxjs/toolkit';
import specialistsReducer from './specialistsSlice';
import filterFormReducer from './filterFormSlice';
import { loadFilterFormState, saveFilterFormState } from './utils';

const preloadedState = {
    filterForm: loadFilterFormState(),
};

export const store = configureStore({
    reducer: {
        specialists: specialistsReducer,
        filterForm: filterFormReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    const state = store.getState();
    saveFilterFormState(state.filterForm);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
