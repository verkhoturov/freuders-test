import { configureStore } from '@reduxjs/toolkit';
import specialistsReducer from './specialistsSlice';
import filterFormReducer from './filterFormSlice';
import subjectsReducer from './subjectsSlice';
import {
    loadFilterFormState,
    saveFilterFormState,
    loadSubjectsState,
    saveSubjectsState,
} from './utils';

const preloadedState = {
    filterForm: loadFilterFormState(),
    subjects: loadSubjectsState(),
};

export const store = configureStore({
    reducer: {
        specialists: specialistsReducer,
        filterForm: filterFormReducer,
        subjects: subjectsReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    const state = store.getState();
    saveFilterFormState(state.filterForm);
    saveSubjectsState(state.subjects);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
