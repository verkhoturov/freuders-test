import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterFormState } from '../types';

const initialState: FilterFormState = {
    sex: '',
    topic: '',
    level: '',
    rating: '',
    ageFrom: '18',
    ageTo: '99',
};

export const filterFormSlice = createSlice({
    name: 'filterForm',
    initialState,
    reducers: {
        setFormState: (state, action: PayloadAction<FilterFormState>) => {
            state.sex = action.payload.sex;
            state.topic = action.payload.topic;
            state.level = action.payload.level;
            state.rating = action.payload.rating;
            state.ageFrom = action.payload.ageFrom;
            state.ageTo = action.payload.ageTo;
        },
    },
});

export const { setFormState } = filterFormSlice.actions;

export default filterFormSlice.reducer;
