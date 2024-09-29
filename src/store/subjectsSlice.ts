import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SubjectsState } from '../types';

const initialState: SubjectsState = {
    list: [
        {
            id: 0,
            name: 'Любая тема',
        },
    ],
};

export const subjectsSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {
        setSubjectsState: (state, action: PayloadAction<SubjectsState>) => {
            state.list = [...state.list, ...action.payload.list];
        },
    },
});

export const { setSubjectsState } = subjectsSlice.actions;

export default subjectsSlice.reducer;
